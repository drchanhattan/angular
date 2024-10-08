import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, forkJoin, map } from 'rxjs';
import { Panda } from './panda';

enum Sprite {
  Idle = 'idle.gif',
  Run = 'run.gif',
  Jump = 'jump.gif',
}

@Component({
  selector: 'app-red-panda',
  standalone: true,
  templateUrl: './red-panda.component.html',
})
export class RedPandaComponent {
  @HostBinding('class') hostClasses = 'absolute w-full select-none';
  cursorX = 0;
  panda = new Panda(0, 0, window.innerWidth / 2 - 75, 9999, 150);
  sprite$ = new BehaviorSubject<string>(Sprite.Idle);

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (Math.abs(this.cursorX - event.clientX) > 50) {
      this.cursorX = event.clientX;
    }
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.preloadSprites$().subscribe(() => {
      this.updateSprite();
      this.animate();
    });
  }

  get pandaStyle() {
    const { isflipped$, size, x, y } = this.panda;
    const top = `top: ${y - size}px;`;
    const left = `left: ${x}px;`;
    const width = `width: ${size}px;`;
    const height = `height: ${size}px;`;
    const direction = `transform: scaleX(${isflipped$.value ? -1 : 1});`;
    return `${width} ${height} ${top} ${left} ${direction}`;
  }

  jump() {
    const { deltaX$, deltaY$, isflipped$, isJumping$, jumpHeight, speed } = this.panda;
    if (!isJumping$.value) {
      isJumping$.next(true);
      deltaX$.next(isflipped$.value ? -speed : speed);
      deltaY$.next(-jumpHeight);
    }
  }

  private preloadSprites$() {
    return forkJoin(
      Object.values(Sprite).map((gif) =>
        this.http
          .get(gif, { responseType: 'blob' })
          .pipe(map((blob) => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))),
      ),
    );
  }

  private updateSprite() {
    combineLatest([this.panda.deltaX$, this.panda.deltaY$, this.panda.isJumping$]).subscribe(([x, y, jumping]) => {
      if (jumping) {
        this.setGif(Sprite.Jump);
      } else if (x !== 0) {
        this.setGif(Sprite.Run);
      } else {
        this.setGif(Sprite.Idle);
      }
    });
  }

  private setGif(gif: Sprite) {
    if (this.sprite$.value !== gif) {
      this.sprite$.next(gif);
    }
  }

  private animate() {
    const animateFrame = () => {
      this.updateX();
      this.updateY();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }

  private updateX() {
    this.updateDirection();
    this.moveX();
  }

  private updateDirection() {
    const { deltaX$, isflipped$, isJumping$, speed, size, x } = this.panda;
    const pandaX = x + size / 2;
    const cursorDiff = this.cursorX - pandaX;
    const tooFarLeft = window.innerWidth - pandaX > window.innerWidth - size;
    const tooFarRight = window.innerWidth - pandaX < size;

    if (!isJumping$.value) {
      const move = Math.abs(cursorDiff) < 500;
      const negativeDiff = cursorDiff < 0;
      const fixed = !move || (tooFarLeft && !negativeDiff) || (tooFarRight && negativeDiff);

      deltaX$.next(fixed ? 0 : negativeDiff ? speed : -speed);
      isflipped$.next(tooFarLeft ? false : tooFarRight ? true : !negativeDiff);
    }
  }

  private moveX() {
    const moveLeft = this.panda.deltaX$.value < 0;
    const canMoveLeft = moveLeft && this.panda.x > this.panda.size / 2;
    const canMoveRight = !moveLeft && window.innerWidth - this.panda.size > this.panda.x + this.panda.size / 2;
    if (this.panda.deltaX$.value && (canMoveLeft || canMoveRight)) {
      this.panda.x += this.panda.deltaX$.value;
    }
  }

  private updateY() {
    this.moveY();
    this.floorCollision();
  }

  private moveY() {
    const gravity = 0.2;
    this.panda.deltaY$.next(this.panda.deltaY$.value + gravity);
    this.panda.y += this.panda.deltaY$.value;
  }

  private floorCollision() {
    const { deltaY$, isJumping$, size, y } = this.panda;
    const parentHeight = document.querySelector('app-red-panda')?.clientHeight || 0;
    const floor = parentHeight / 2 + size / 2;

    if (y > floor) {
      this.panda.y = floor;
      deltaY$.next(0);
      isJumping$.next(false);
    }
  }
}
