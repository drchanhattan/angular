import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameCursor } from './models/game-object/game-cursor';
import { GameObject } from './models/game-object/game-object';
import { GameObjectBehaviour } from './models/game-object/game-object-behaviour';
import { CanvasService } from './services/canvas-service';
import { GameService } from './services/game-service';
import { TextService } from './services/text-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'fixed w-full h-full flex justify-center items-center bg-black text-nowrap';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public gameService: GameService,
    public canvasService: CanvasService,
    public cursor: GameCursor,
    public textService: TextService,
  ) {}

  ngAfterViewInit() {
    this.canvasService.setup(this.canvasEle);
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.location.reload();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent) {
    const keyActions: { [key: string]: () => void } = {
      '1': () => this.gameService.toggleInvincibility(),
      '2': () => this.gameService.peas.setBehaviour(GameObjectBehaviour.Attract),
      '3': () => this.gameService.corn.setBehaviour(GameObjectBehaviour.Repel),
    };

    const action = keyActions[event.key];
    if (action) {
      action();
    }
  }

  animate() {
    const animateFrame = () => {
      this.canvasService.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.draw();
      requestAnimationFrame(animateFrame);
    };
    animateFrame();
  }

  draw() {
    this.drawCursor();
    this.drawGameObjects(this.gameService.peas.objects, this.detectPeaCollision.bind(this));
    this.drawGameObjects(this.gameService.corn.objects, this.detectCornCollision.bind(this));
    this.canvasService.drawParticles(this.canvasService.context);
    this.canvasService.particleDecay();
  }

  drawCursor() {
    if (!this.gameService.showMenu) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }

  drawGameObjects(objects: GameObject[], detectCollision: (obj: GameObject) => void) {
    objects.forEach((obj: GameObject) => {
      if (!obj.destroyed) {
        this.canvasService.drawObject(this.canvasService.context, obj);

        if (!this.gameService.paused) {
          obj.detectWallCollision();
          detectCollision(obj);
        } else {
          obj.applyForce(false, 8);
        }

        this.applyBehaviour(obj);
        obj.move();
      }
    });
  }

  applyBehaviour(obj: GameObject) {
    if (obj.behaviourEquals(GameObjectBehaviour.Attract)) {
      this.cursor.magnetise(obj, 30, 4, false);
    } else if (obj.behaviourEquals(GameObjectBehaviour.Repel)) {
      this.cursor.magnetise(obj, 20, 5, true);
    }
  }

  detectPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
      this.gameService.peas.count--;

      if (this.gameService.peas.count === 0) {
        this.gameService.levelUp();
      }
    }
  }

  detectCornCollision(corn: GameObject) {
    if (!this.gameService.ghost && corn.detectCollision(this.cursor.object)) {
      corn.destroyed = true;
      this.canvasService.createParticles(corn);

      if (!this.gameService.invincible) {
        this.gameService.lives--;
        this.canvasService.flash('bg-red-900', 500);
        this.gameService.immune(500);
      }

      if (this.gameService.lives === 0) {
        this.gameService.gameOver();
      }
    }
  }
}
