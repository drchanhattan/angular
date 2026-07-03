import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  score = 0;
  comboMultiplier = 0;

  levelIncrease() {
    this.score += 1000;
  }

  peaCollected() {
    this.score += this.comboMultiplier || 1;
    this.comboMultiplier += 1;
  }

  resetCombo() {
    this.comboMultiplier = 0;
  }

  resetScore() {
    this.score = 0;
  }
}
