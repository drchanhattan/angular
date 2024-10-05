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
  @HostBinding('class') hostClasses = 'absolute size-full select-none overflow-hidden';
  cursorX = 200;
  cursorY = 0;
  panda = new Panda(0, 0, window.innerWidth / 2, 9999, 150);
  sprite$ = new BehaviorSubject<string>(Sprite.Idle);

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (Math.abs(this.cursorX - event.clientX) > 75) {
      this.cursorX = event.clientX;
    }
    this.cursorY = event.pageY;
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

  private preloadSprites$() {
    return forkJoin(
      Object.values(Sprite).map((gif) =>
        this.http
          .get(gif, { responseType: 'blob' })
          .pipe(map((blob) => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))),
      ),
    );
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
    const cursorDiff = this.cursorX - (x + size);

    if (!isJumping$.value) {
      const withinRange = Math.abs(cursorDiff + size / 2) < 5;
      const moveRight = cursorDiff + size / 2 > 0;

      deltaX$.next(withinRange ? 0 : moveRight ? speed : -speed);
      isflipped$.next(!moveRight);
    }

    if (Math.abs(cursorDiff) < size) {
      this.jump();
    }
  }

  private moveX() {
    if (this.panda.deltaX$.value) {
      this.panda.x += this.panda.deltaX$.value;
    }
  }

  private jump() {
    const { deltaX$, deltaY$, isflipped$, isJumping$, jumpHeight, size, speed } = this.panda;
    const bottomOffset = document.body.scrollHeight - this.cursorY;
    if (!isJumping$.value && bottomOffset > 0 && bottomOffset < size) {
      isJumping$.next(true);
      deltaX$.next(isflipped$.value ? -speed : speed);
      deltaY$.next(-jumpHeight);
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
    const isfalling = deltaY$.value > 0;
    const height = document.querySelector('app-red-panda')?.parentElement?.clientHeight;

    if (height && y + size / 2 > height && isfalling) {
      this.panda.y = height;
      deltaY$.next(0);
      isJumping$.next(false);
    }
  }
}
