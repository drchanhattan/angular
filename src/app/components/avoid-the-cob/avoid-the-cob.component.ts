import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GameTextService } from './components/game-text/game-text-service';
import { GameTextComponent } from './components/game-text/game-text.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MainMenuService } from './components/main-menu/main-menu-service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NewPlayerService } from './components/new-player/new-player-service';
import { NewPlayerComponent } from './components/new-player/new-player.component';
import { AvoidTheCobService } from './services/avoid-the-cob-service';
import { CanvasService } from './services/canvas-service';
import { DeviceService } from './services/device-service';
import { DifficultyService } from './services/difficulty.service';
import { GameStateService } from './services/game-state-service';
import { OverlayService } from './services/overlay-service';
import { ParticleService } from './services/particle-service';

@Component({
  selector: 'app-avoid-the-cob',
  standalone: true,
  imports: [
    CommonModule,
    GameTextComponent,
    LeaderboardComponent,
    MainMenuComponent,
    MatIconModule,
    NewPlayerComponent,
    RouterLink,
  ],
  templateUrl: './avoid-the-cob.component.html',
  animations: [
    trigger('opacityAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AvoidTheCobComponent implements AfterViewInit {
  @HostBinding('class') hostClasses =
    'flex size-full justify-center items-center text-nowrap font-ink bg-game-black select-none';
  // @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public avoidTheCob: AvoidTheCobService,
    public canvasService: CanvasService,
    public deviceService: DeviceService,
    public difficultyService: DifficultyService,
    public gameStateService: GameStateService,
    public mainMenuService: MainMenuService,
    public nameService: NewPlayerService,
    public overlayService: OverlayService,
    public particleService: ParticleService,
    public textService: GameTextService,
  ) {}

  @HostListener('window:resize') onResize() {
    if (!this.deviceService.isTouchScreen) {
      this.gameStateService.browserResized = true;
      this.canvasService.setup();
    }
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler() {
    location.reload();
  }

  ngAfterViewInit() {
    this.canvasService.setup();
    this.mainMenuService.show();
    this.animate();
  }

  animate() {
    const context = this.canvasService.context;
    const canvas = this.canvasService.canvasEle;

    const animateFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.avoidTheCob.draw();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }
}
