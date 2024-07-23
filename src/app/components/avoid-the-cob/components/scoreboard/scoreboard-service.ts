import { Injectable } from '@angular/core';
import { GameScore } from '../../models/game-score/game-score';
import { ShowHideService } from '../../services/show-hide-service';
import { MainMenuService } from '../main-menu/main-menu-service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  scores: GameScore[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private mainMenuService: MainMenuService,
    private showHideService: ShowHideService,
  ) {}

  hide() {
    this.showHideService.hide('app-scoreboard');
    this.mainMenuService.show();
  }

  async show() {
    this.showHideService.show('app-scoreboard');
    this.scores = await this.firebaseService.getAllScores();
  }
}
