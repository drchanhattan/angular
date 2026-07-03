import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
  computed,
} from '@angular/core';
import { Panda } from './panda';

enum Sprite {
  Idle = 'panda/idle.gif',
  Run = 'panda/run.gif',
  Jump = 'panda/jump.gif',
}

@Component({
  selector: 'app-red-panda',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './red-panda.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class RedPandaComponent {
  protected readonly hostClasses = computed(() => [
    // Layout
    'absolute',
    'w-full',

    // Select
    'select-none',
  ]);

  @ViewChild('pandaDiv') private readonly pandaDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('imgJump') private readonly imgJump!: ElementRef<HTMLImageElement>;
  @ViewChild('imgIdle') private readonly imgIdle!: ElementRef<HTMLImageElement>;
  @ViewChild('imgRun') private readonly imgRun!: ElementRef<HTMLImageElement>;

  private cursorX = 0;
  private readonly panda = new Panda(0, 0, window.innerWidth / 2 - 75, 9999, 150);
  private jumping = false;

  @HostListener('document:mousemove', ['$event'])
  protected handleMouseMove(event: MouseEvent) {
    if (event.clientY > window.innerHeight - this.panda.size * 2 && Math.abs(this.cursorX - event.clientX) > 50) {
      this.cursorX = event.clientX;
    }
  }

  constructor(private readonly ngZone: NgZone) {}

  public ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  protected mouseover(value: boolean) {
    this.jumping = value;
  }

  private jump() {
    const { isflipped, isJumping, jumpHeight, speed } = this.panda;
    if (this.jumping && !isJumping) {
      this.panda.isJumping = true;
      this.panda.deltaX = isflipped ? -speed / 2 : speed / 2;
      this.panda.deltaY = -jumpHeight;
    }
  }

  private animate() {
    const animateFrame = () => {
      this.updateX();
      this.updateY();
      this.jump();
      this.render();
      requestAnimationFrame(animateFrame);
    };
    requestAnimationFrame(animateFrame);
  }

  private render() {
    const { isflipped, size, x, y, isJumping, deltaX } = this.panda;
    this.pandaDiv.nativeElement.style.cssText = `width:${size}px;height:${size}px;top:${y - size}px;left:${x}px;transform:scaleX(${isflipped ? -1 : 1});`;
    const sprite = isJumping ? Sprite.Jump : deltaX !== 0 ? Sprite.Run : Sprite.Idle;
    this.imgJump.nativeElement.classList.toggle('hidden', sprite !== Sprite.Jump);
    this.imgIdle.nativeElement.classList.toggle('hidden', sprite !== Sprite.Idle);
    this.imgRun.nativeElement.classList.toggle('hidden', sprite !== Sprite.Run);
  }

  private updateX() {
    this.updateDirection();
    this.moveX();
  }

  private updateDirection() {
    const { isJumping, speed, size, x } = this.panda;
    const windowWidth = window.innerWidth;
    const pandaX = x + size / 2;
    const cursorDiff = this.cursorX - pandaX;
    const negativeDiff = cursorDiff < 0;
    const tooFarLeft = windowWidth - pandaX > windowWidth - size;
    const tooFarRight = windowWidth - pandaX < size;

    if (!isJumping) {
      const canMove = Math.abs(cursorDiff) < windowWidth / 3;
      const fixed = !canMove || (tooFarLeft && !negativeDiff) || (tooFarRight && negativeDiff);
      this.panda.deltaX = fixed ? 0 : negativeDiff ? speed : -speed;
    }

    this.panda.isflipped = tooFarLeft ? false : tooFarRight ? true : !negativeDiff;
  }

  private moveX() {
    const moveLeft = this.panda.deltaX < 0;
    const canMoveLeft = moveLeft && this.panda.x > this.panda.size / 2;
    const canMoveRight = !moveLeft && window.innerWidth - this.panda.size > this.panda.x + this.panda.size / 2;
    if (this.panda.deltaX && (canMoveLeft || canMoveRight)) {
      this.panda.x += this.panda.deltaX;
    }
  }

  private updateY() {
    this.moveY();
    this.floorCollision();
  }

  private moveY() {
    const gravity = 0.25;
    this.panda.deltaY += gravity;
    this.panda.y += this.panda.deltaY;
  }

  private floorCollision() {
    const { size, y } = this.panda;
    const parentHeight = document.querySelector('app-red-panda')?.clientHeight || 0;
    const floor = parentHeight / 2 + size / 2;

    if (y > floor) {
      this.panda.y = floor;
      this.panda.deltaY = 0;
      this.panda.isJumping = false;
    }
  }
}
