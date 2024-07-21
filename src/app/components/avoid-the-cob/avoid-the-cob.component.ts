import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GameTextService } from './components/game-text/game-text-service';
import { GameTextComponent } from './components/game-text/game-text.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { PlayerNameService } from './components/player-name/player-name-service';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { CanvasService } from './services/canvas-service';
import { GameService } from './services/game-service';
import { ParticleService } from './services/particle-service';

@Component({
  selector: 'app-avoid-the-cob',
  standalone: true,
  imports: [
    CommonModule,
    GameTextComponent,
    MainMenuComponent,
    MatIconModule,
    PlayerNameComponent,
    RouterLink,
    ScoreboardComponent,
  ],
  templateUrl: './avoid-the-cob.component.html',
})
export class AvoidTheCobComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'flex size-full justify-center items-center text-nowrap font-ink bg-game-black';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public canvasService: CanvasService,
    public gameService: GameService,
    public nameService: PlayerNameService,
    public particleService: ParticleService,
    public textService: GameTextService,
  ) {}

  @HostListener('window:resize') onResize() {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouchDevice) {
      location.reload();
    }
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler() {
    location.reload();
  }

  ngAfterViewInit() {
    this.canvasService.setup(this.canvasEle);
    this.animate();
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
