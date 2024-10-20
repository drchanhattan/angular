import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { GameHelpComponent } from './components/game-help/game-help.component';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';
import { GameTextComponent } from './components/game-text/game-text.component';
import { GameTextService } from './components/game-text/game-text.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainMenuService } from './components/main-menu/main-menu.service';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { PlayerNameService } from './components/player-name/player-name.service';
import { AssetService } from './services/asset.service';
import { AudioService } from './services/audio.service';
import { AvoidTheCobService } from './services/avoid-the-cob.service';
import { CanvasService } from './services/canvas.service';
import { DeviceService } from './services/device.service';
import { DifficultyService } from './services/difficulty.service';
import { GameStateService } from './services/game-state.service';
import { OverlayService } from './services/overlay.service';
import { ParticleService } from './services/particle.service';
import { ScoreService } from './services/score.service';

@Component({
  selector: 'app-avoid-the-cob',
  standalone: true,
  imports: [
    GameHelpComponent,
    GameSettingsComponent,
    GameTextComponent,
    IconButtonComponent,
    LeaderboardComponent,
    MainMenuComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    PlayerNameComponent,
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
export class AvoidTheCobComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClasses =
    'flex size-full select-none items-center justify-center overflow-hidden bg-mat-black bg-cover bg-center bg-blend-darken';
  @HostBinding('style') background = `background-image: url('background.svg');`;

  constructor(
    public assetService: AssetService,
    public audioService: AudioService,
    public avoidTheCob: AvoidTheCobService,
    public canvasService: CanvasService,
    public deviceService: DeviceService,
    public difficultyService: DifficultyService,
    public gameStateService: GameStateService,
    public mainMenuService: MainMenuService,
    public nameService: PlayerNameService,
    public overlayService: OverlayService,
    public particleService: ParticleService,
    public scoreService: ScoreService,
    public textService: GameTextService,
  ) {}

  @HostListener('window:resize') onResize() {
    this.canvasService.init();
    if (!this.deviceService.isTouch) {
      this.gameStateService.browserResized = true;
    }
  }

  ngOnInit() {
    this.canvasService.init();
    this.mainMenuService.show();
    this.animate();
  }

  ngOnDestroy() {
    window.location.reload();
  }

  animate() {
    const context = this.canvasService.context;

    const animateFrame = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      this.avoidTheCob.draw();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }
}
