import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const ScoreStore = signalStore(
  { providedIn: 'root' },
  withState({ score: 0, comboMultiplier: 0 }),
  withMethods((store) => ({
    levelIncrease(): void {
      patchState(store, (s) => ({ score: s.score + 1000 }));
    },
    peaCollected(): void {
      patchState(store, (s) => ({
        score: s.score + (s.comboMultiplier || 1),
        comboMultiplier: s.comboMultiplier + 1,
      }));
    },
    resetCombo(): void {
      patchState(store, { comboMultiplier: 0 });
    },
    resetScore(): void {
      patchState(store, { score: 0 });
    },
  })),
);
