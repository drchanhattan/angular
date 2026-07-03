import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameButtonComponent } from '../game-button/game-button.component';
import { PlayerNameService } from '../player-name/player-name.service';
import { LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, GameButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leaderboard.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class LeaderboardComponent {
  protected hostClasses = computed(() => [
    // Layout
    'absolute',
    'flex',
    'size-full',
    'flex-col',
    'items-center',
    'justify-center',
  ]);

  leaderboardService = inject(LeaderboardService);
  nameService = inject(PlayerNameService);
  playerName = toSignal(this.nameService.name.valueChanges, { initialValue: this.nameService.name.value ?? '' });
}
