import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, computed } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconDirective } from '../../utils/icon/icon.directive';
import { GameHelpComponent } from './components/game-help/game-help.component';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';
import { GameTextComponent } from './components/game-text/game-text.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainMenuService } from './components/main-menu/main-menu.service';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { PlayerNameService } from './components/player-name/player-name.service';
import { AssetService } from './services/asset.service';
import { AvoidTheCobService } from './services/avoid-the-cob.service';
import { CanvasService } from './services/canvas.service';
import { DeviceService } from './services/device.service';
import { GameStateService } from './services/game-state.service';
import { OverlayService } from './services/overlay.service';
import { ScoreService } from './services/score.service';

@Component({
  selector: 'app-avoid-the-cob',
  imports: [
    GameHelpComponent,
    GameSettingsComponent,
    GameTextComponent,
    IconDirective,
    LeaderboardComponent,
    MainMenuComponent,
    MatProgressSpinnerModule,
    PlayerNameComponent,
  ],
  templateUrl: './avoid-the-cob.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    style: "background-image: url('game/background.svg')",
  },
  animations: [
    trigger('opacityAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AvoidTheCobComponent implements OnInit, OnDestroy {
  protected readonly hostClasses = computed(() => [
    //Layout
    'flex',
    'size-full',
    'items-center',
    'justify-center',
    'overflow-hidden',

    // Background
    'bg-mat-black',
    'bg-cover',
    'bg-center',
    'bg-blend-darken',

    // Select
    'select-none',
  ]);

  constructor(
    protected assetService: AssetService,
    private readonly avoidTheCob: AvoidTheCobService,
    private readonly canvasService: CanvasService,
    private readonly deviceService: DeviceService,
    protected gameStateService: GameStateService,
    private readonly mainMenuService: MainMenuService,
    protected nameService: PlayerNameService,
    protected overlayService: OverlayService,
    protected scoreService: ScoreService,
  ) {}

  @HostListener('window:resize') protected onResize() {
    this.canvasService.init();
    if (!this.deviceService.isTouch) {
      this.gameStateService.browserResized = true;
    }
  }

  public ngOnInit() {
    this.canvasService.init();
    this.mainMenuService.show();
    this.animate();
  }

  public ngOnDestroy() {
    window.location.reload();
  }

  private animate() {
    const context = this.canvasService.context;

    const animateFrame = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      this.avoidTheCob.draw();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }
}
