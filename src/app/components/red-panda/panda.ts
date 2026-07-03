import { BehaviorSubject } from 'rxjs';

export class Panda {
  deltaX$: BehaviorSubject<number>;
  deltaY$: BehaviorSubject<number>;
  isflipped$ = new BehaviorSubject<boolean>(false);
  isJumping$ = new BehaviorSubject<boolean>(false);
  jumpHeight = 10;
  x: number;
  y: number;
  size: number;
  speed = 5;

  constructor(deltaX: number, deltaY: number, posX: number, posY: number, size: number) {
    this.deltaX$ = new BehaviorSubject<number>(deltaX);
    this.deltaY$ = new BehaviorSubject<number>(deltaY);
    this.x = posX;
    this.y = posY;
    this.size = size;
  }
}
