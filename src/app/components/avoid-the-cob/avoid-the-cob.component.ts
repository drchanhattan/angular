import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GameTextService } from './components/game-text/game-text-service';
import { GameTextComponent } from './components/game-text/game-text.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MainMenuService } from './components/main-menu/main-menu-service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { PlayerNameService } from './components/player-name/player-name-service';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { AvoidTheCobService } from './services/avoid-the-cob-service';
import { CanvasService } from './services/canvas-service';
import { DifficultyService } from './services/difficulty.service';
import { GameStateService } from './services/game-state-service';
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
    LeaderboardComponent,
  ],
  templateUrl: './avoid-the-cob.component.html',
})
export class AvoidTheCobComponent implements AfterViewInit {
  @HostBinding('class') hostClasses =
    'flex size-full justify-center items-center text-nowrap font-ink bg-game-black select-none';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public avoidTheCob: AvoidTheCobService,
    public canvasService: CanvasService,
    public difficultyService: DifficultyService,
    public gameStateService: GameStateService,
    public mainMenuService: MainMenuService,
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
    this.mainMenuService.show();
    this.animate();
  }

  animate() {
    const context = this.canvasService.context;
    const canvas = this.canvasService.canvasEle.nativeElement;

    const animateFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.avoidTheCob.draw();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }
}
