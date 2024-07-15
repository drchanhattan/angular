import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { GameCursor } from './models/game-object/game-cursor';
import { CanvasService } from './services/canvas-service';
import { GameService } from './services/game-service';
import { TextService } from './services/text-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'fixed w-full h-full flex justify-center items-center bg-black text-nowrap';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public canvasService: CanvasService,
    public cursor: GameCursor,
    public gameService: GameService,
    public textService: TextService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['reload']) {
        this.router.navigate(['/game']);
      }
    });
  }

  ngAfterViewInit() {
    this.canvasService.setup(this.canvasEle);
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.location.reload();
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
    this.gameService.drawPowerUps();
    this.canvasService.drawParticles(this.canvasService.context);
    this.canvasService.particleDecay();
  }
}
