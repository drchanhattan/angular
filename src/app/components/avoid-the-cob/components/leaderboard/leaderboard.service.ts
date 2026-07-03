import { Injectable, signal } from '@angular/core';
import { GameScore } from '../../models/game-score/game-score';
import { FirebaseService } from '../../services/firebase.service';
import { OverlayItem, OverlayService } from '../../services/overlay.service';
import { MainMenuService } from '../main-menu/main-menu.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  scores = signal<GameScore[]>([]);

  constructor(
    private firebaseService: FirebaseService,
    private mainMenuService: MainMenuService,
    private overlayService: OverlayService,
  ) {}

  async show() {
    this.mainMenuService.hide();
    this.overlayService.toggle(OverlayItem.Leaderboard, false);
    this.scores.set(await this.firebaseService.get());
  }

  hide() {
    this.overlayService.toggle(OverlayItem.Leaderboard, true);
    this.mainMenuService.show();
  }
}
