import { Injectable } from '@angular/core';
import { GameScore } from '../../models/game-score/game-score';
import { FirebaseService } from '../../services/firebase.service';
import { OpacityService } from '../../services/opacity-service';
import { MainMenuService } from '../main-menu/main-menu-service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  scores: GameScore[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private mainMenuService: MainMenuService,
    private opacityService: OpacityService,
  ) {}

  async show() {
    this.opacityService.show('app-leaderboard');
    this.scores = await this.firebaseService.get();
  }

  hide() {
    this.opacityService.hide('app-leaderboard');
    this.mainMenuService.show();
  }
}
