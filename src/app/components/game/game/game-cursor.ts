import { CanvasService } from './canvas-service';
import { GameObject, GameObjectShape } from './game-object';

export class GameCursor extends GameObject {
  scale = devicePixelRatio * (window.outerWidth / window.innerWidth);
  override colour = '#F5F5F5';
  canvasService!: CanvasService;
  history: { x: number; y: number }[] = [];
  trail!: boolean;

  init(service: CanvasService): void {
    this.canvasService = service;

    const updatePosition = (x: number, y: number) => {
      const rect = this.canvasService.context.canvas.getBoundingClientRect();
      const newX = ((x - rect.left) / (rect.right - rect.left)) * this.canvasService.screenW;
      const newY = ((y - rect.top) / (rect.bottom - rect.top)) * this.canvasService.screenH;
      this.x = Math.min(Math.max(0, newX), this.canvasService.screenW);
      this.y = Math.min(Math.max(0, newY), this.canvasService.screenH);
    };

    document.addEventListener('mousemove', (event) => {
      updatePosition(event.clientX, event.clientY);
    });

    const touchHandler = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
        if (event.target === this.canvasService.context.canvas) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener('touchmove', touchHandler, { passive: false });
    document.addEventListener('touchstart', touchHandler, { passive: false });

    // Only keep the last 20 elements in history
    setInterval(() => {
      this.history = this.history.slice(-20);
    }, 150);
  }

  draw(context: CanvasRenderingContext2D, canvas: CanvasService): void {
    if (this.trail) {
      this.#drawTrail(context, canvas);
    }

    canvas.drawObject(context, {
      x: this.x,
      y: this.y,
      size: this.size,
      colour: this.colour,
      shape: GameObjectShape.Arc,
    } as GameObject);
  }

  toggle() {
    const canvasClass = this.canvasService.canvasEle.nativeElement.classList;
    canvasClass.toggle('cursor-none');
  }

  magnetise(vegetable: GameObject, radiusMultiplier: number, speed: number, repel: boolean): void {
    const obj = Object.assign({}, this);
    obj.size = obj.size * radiusMultiplier;

    if (vegetable.detectCollision(obj)) {
      let dx = this.x - vegetable.x;
      let dy = this.y - vegetable.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dx /= distance;
      dy /= distance;
      dx *= speed;
      dy *= speed;

      if (!vegetable.detectWallCollisionX(this.canvasService.screenW)) {
        repel ? vegetable.applyForce(true, -dx) : vegetable.applyForce(true, dx);
      }

      if (!vegetable.detectWallCollisionY(this.canvasService.screenH)) {
        repel ? vegetable.applyForce(false, -dy) : vegetable.applyForce(false, dy);
      }
    }
  }

  levelUp() {
    this.size = this.size * 0.99;
  }

  reset() {
    this.size = Math.round((this.scale ^ 50) * 0.3);
  }

  resetHistory() {
    this.history = [];
  }

  toggleTrail() {
    this.trail = !this.trail;
  }

  #drawTrail(context: CanvasRenderingContext2D, canvas: CanvasService) {
    // Draw Trail
    this.history.forEach((old) => {
      context.globalAlpha = 0.1;
      canvas.drawObject(context, {
        x: old.x,
        y: old.y,
        size: this.size,
        colour: this.colour,
        shape: GameObjectShape.Arc,
      } as GameObject);
      context.globalAlpha = 1;
    });
    this.history.push({ x: this.x, y: this.y });
  }
}
