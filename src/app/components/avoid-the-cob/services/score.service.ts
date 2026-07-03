import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  score = signal(0);
  comboMultiplier = signal(0);

  levelIncrease() {
    this.score.update((v) => v + 1000);
  }

  peaCollected() {
    this.score.update((v) => v + (this.comboMultiplier() || 1));
    this.comboMultiplier.update((v) => v + 1);
  }

  resetCombo() {
    this.comboMultiplier.set(0);
  }

  resetScore() {
    this.score.set(0);
  }
}
