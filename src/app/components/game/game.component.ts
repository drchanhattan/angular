import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GameColors } from './models/game-colors/game-colors';
import { CanvasService } from './services/canvas-service';
import { GameService } from './services/game-service';
import { ParticleService } from './services/particle-service';
import { TextService } from './services/text-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'fixed w-full h-full flex justify-center items-center text-nowrap';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  yellow = GameColors.Yellow;
  white = GameColors.White;
  black = GameColors.Black;

  constructor(
    public canvasService: CanvasService,
    public gameService: GameService,
    public textService: TextService,
    public particleService: ParticleService,
  ) {}

  ngAfterViewInit() {
    this.canvasService.setup(this.canvasEle);
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    location.reload();
  }

  animate() {
    const context = this.canvasService.context;
    const canvas = this.canvasService.canvasEle.nativeElement;

    const animateFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.draw();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }

  draw() {
    this.gameService.draw();
    this.particleService.draw(this.canvasService.context);
    this.particleService.decay();
  }
}
