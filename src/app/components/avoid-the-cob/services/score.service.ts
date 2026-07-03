import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  public readonly score = signal(0);
  public readonly comboMultiplier = signal(0);

  public levelIncrease() {
    this.score.update((v) => v + 1000);
  }

  public peaCollected() {
    this.score.update((v) => v + (this.comboMultiplier() || 1));
    this.comboMultiplier.update((v) => v + 1);
  }

  public resetCombo() {
    this.comboMultiplier.set(0);
  }

  public resetScore() {
    this.score.set(0);
  }
}
