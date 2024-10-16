import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Panda } from './panda';

enum Sprite {
  Idle = 'idle.gif',
  Run = 'run.gif',
  Jump = 'jump.gif',
}

@Component({
  selector: 'app-red-panda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './red-panda.component.html',
})
export class RedPandaComponent {
  @HostBinding('class') hostClasses = 'absolute w-full select-none';
  cursorX = 0;
  panda = new Panda(0, 0, window.innerWidth / 2 - 75, 9999, 150);
  sprite$ = new BehaviorSubject<string>(Sprite.Idle);
  jump$ = new BehaviorSubject<boolean>(false);

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (event.clientY > window.innerHeight - this.panda.size * 2 && Math.abs(this.cursorX - event.clientX) > 50) {
      this.cursorX = event.clientX;
    }
  }

  constructor() {
    this.updateSprite();
    this.animate();
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

  mouseover(value: boolean) {
    this.jump$.next(value);
  }

  private jump() {
    const { deltaX$, deltaY$, isflipped$, isJumping$, jumpHeight, speed } = this.panda;
    if (this.jump$.value && !isJumping$.value) {
      isJumping$.next(true);
      deltaX$.next(isflipped$.value ? -speed / 2 : speed / 2);
      deltaY$.next(-jumpHeight);
    }
  }

  private updateSprite() {
    combineLatest([this.panda.deltaX$, this.panda.deltaY$, this.panda.isJumping$]).subscribe(([x, y, jumping]) => {
      this.sprite$.next(jumping ? Sprite.Jump : x !== 0 ? Sprite.Run : Sprite.Idle);
    });
  }

  private animate() {
    const animateFrame = () => {
      this.updateX();
      this.updateY();
      this.jump();
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
    const windowWidth = window.innerWidth;
    const pandaX = x + size / 2;
    const cursorDiff = this.cursorX - pandaX;
    const negativeDiff = cursorDiff < 0;
    const tooFarLeft = windowWidth - pandaX > windowWidth - size;
    const tooFarRight = windowWidth - pandaX < size;

    if (!isJumping$.value) {
      const canMove = Math.abs(cursorDiff) < windowWidth / 3;
      const fixed = !canMove || (tooFarLeft && !negativeDiff) || (tooFarRight && negativeDiff);

      deltaX$.next(fixed ? 0 : negativeDiff ? speed : -speed);
    }

    isflipped$.next(tooFarLeft ? false : tooFarRight ? true : !negativeDiff);
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
    const gravity = 0.25;
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
