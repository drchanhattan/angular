import { inject, Injectable, signal } from '@angular/core';
import { GameScore } from '../../models/game-score/game-score';
import { FirebaseService } from '../../services/firebase.service';
import { OverlayStore } from '../../store/overlay.store';
import { MainMenuService } from '../main-menu/main-menu.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  public readonly scores = signal<GameScore[]>([]);
  private readonly firebaseService = inject(FirebaseService);
  private readonly mainMenuService = inject(MainMenuService);
  private readonly overlay = inject(OverlayStore);

  public async show() {
    this.mainMenuService.hide();
    this.overlay.show('leaderboard');
    this.scores.set(await this.firebaseService.get());
  }

  public hide() {
    this.overlay.hide('leaderboard');
    this.mainMenuService.show();
  }
}
