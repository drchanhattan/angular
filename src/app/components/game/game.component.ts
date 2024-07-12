import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameCursor } from './models/game-object/game-cursor';
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
      '4': () => this.gameService.corn.setBehaviour(GameObjectBehaviour.ConvertToPea),
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
    this.gameService.drawCursor();
    this.gameService.drawPeas();
    this.gameService.drawCorn();
    this.canvasService.drawParticles(this.canvasService.context);
    this.canvasService.particleDecay();
  }
}
