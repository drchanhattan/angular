import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from './game-service';
import { CanvasService } from './game/canvas-service';
import { GameCursor } from './game/game-cursor';
import { GameObject, GameObjectBehaviour } from './game/game-object';
import { TextService } from './game/text-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'fixed w-full h-full flex justify-center items-center bg-black text-nowrap';
  @ViewChild('canvas', { static: true })
  canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public gameService: GameService,
    public canvasService: CanvasService,
    public cursor: GameCursor,
    public textService: TextService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.location.reload();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent) {
    switch (event.key) {
      case '1':
        this.invincible();
        break;
      case '2':
        this.gameService.peas.magnetise();
        break;
      case '3':
        this.gameService.corn.repel();
        break;
    }
  }

  ngAfterViewInit() {
    this.canvasService.setup(this.canvasEle);
    this.animate();
  }

  animate() {
    const animateFrame = () => {
      this.canvasService.context.clearRect(0, 0, this.canvasService.screenW, this.canvasService.screenH);
      this.draw();
      requestAnimationFrame(animateFrame);
    };
    animateFrame();
  }

  draw() {
    this.drawCursor();
    this.drawPeas();
    this.drawCorn();
    this.drawParticles();
  }

  drawCursor() {
    if (!this.gameService.showMenu) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }

  drawPeas() {
    this.gameService.peas.objects.forEach((pea: GameObject) => {
      if (!pea.destroyed) {
        this.canvasService.drawObject(this.canvasService.context, pea);

        // Check for collision
        if (!this.gameService.paused) {
          this.canvasService.wallCollision(pea);
          this.detectPeaCollision(pea);
        } else {
          // Apply Gravity if objects are not alive
          pea.applyForce(false, 8);
        }

        // Magnetise
        if (pea.behaviourEquals(GameObjectBehaviour.Magnetise)) {
          this.cursor.magnetise(pea, 30, 4, false);
        }

        pea.move();
      }
    });
  }

  drawCorn() {
    this.gameService.corn.objects.forEach((corn: GameObject) => {
      if (!corn.destroyed) {
        // Draw a single Corn
        this.canvasService.drawObject(this.canvasService.context, corn);

        // Check for collision
        if (!this.gameService.paused) {
          this.canvasService.wallCollision(corn);
          this.detectCornCollision(corn);
        } else {
          // Apply Gravity if objects are not alive
          corn.applyForce(false, 8);
        }

        // Repel
        if (corn.behaviourEquals(GameObjectBehaviour.Repel)) {
          this.cursor.magnetise(corn, 20, 5, true);
        }

        corn.move();
      }
    });
  }

  drawParticles() {
    this.canvasService.drawParticles(this.canvasService.context);
    this.canvasService.particleDecay();
  }

  detectPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
      this.gameService.peas.count = this.gameService.peas.count - 1;

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
        this.gameService.lives = this.gameService.lives - 1;
        this.canvasService.flash('bg-red-900', 500);
        this.gameService.immune(500);
      }

      if (this.gameService.lives === 0) {
        this.gameService.gameOver();
      }
    }
  }

  invincible() {
    this.cursor.resetHistory();
    this.cursor.toggleTrail();
    this.gameService.toggleInvincible();
  }
}
