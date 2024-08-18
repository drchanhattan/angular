import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  score = 0;
  peasCollected = 0;
  comboMultiplier = 1;

  levelIncrease() {
    this.score += 1000;
  }

  peaCollected() {
    this.score += this.comboMultiplier * 3;
    this.comboMultiplier = Math.round(this.peasCollected / 3) + 1;
    this.peasCollected += 1;
  }

  resetCombo() {
    this.peasCollected = 0;
    this.comboMultiplier = 1;
  }

  resetScore() {
    this.score = 0;
  }
}
