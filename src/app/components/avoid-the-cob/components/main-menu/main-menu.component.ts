import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { IconDirective } from '../../../../utils/icon/icon.directive';
import { AssetService } from '../../services/asset.service';
import { AvoidTheCobService } from '../../services/avoid-the-cob.service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { GameHelpService } from '../game-help/game-help.service';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Component({
  selector: 'app-main-menu',
  imports: [GameButtonComponent, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-menu.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class MainMenuComponent {
  private readonly assetService = inject(AssetService);
  protected readonly avoidTheCob = inject(AvoidTheCobService);
  protected readonly gameHelpService = inject(GameHelpService);
  protected readonly gameSettingsService = inject(GameSettingsService);
  protected readonly leaderboardService = inject(LeaderboardService);

  protected readonly hostClasses = computed(() => [
    // Layout
    'absolute',
    'flex',
    'size-full',
    'flex-col',
    'items-center',
    'justify-center',
    'lg:flex-row',
  ]);

  protected readonly corn: SafeUrl = this.assetService.images()[0];
  protected readonly title: SafeUrl = this.assetService.images()[2];
}
