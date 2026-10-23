import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type GameState = {
  browserResized: boolean;
  level: number;
  lives: number;
  mobMode: boolean;
  paused: boolean;
  timer: number | null;
};

const initialState: GameState = {
  browserResized: false,
  level: 0,
  lives: 0,
  mobMode: false,
  paused: true,
  timer: null,
};

export const GameStateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    inGame: computed(() => store.lives() > 0),
  })),
  withMethods((store) => {
    let timerInterval: ReturnType<typeof setInterval> | undefined;

    const clearTimer = (): void => {
      clearInterval(timerInterval);
      patchState(store, { timer: null });
    };

    return {
      clearTimer,
      startTimer(seconds: number): void {
        clearTimer();
        patchState(store, { timer: seconds });

        timerInterval = setInterval(() => {
          const timeLeft = (store.timer() ?? 0) - 1;
          if (timeLeft <= 0) {
            clearTimer();
          } else {
            patchState(store, { timer: timeLeft });
          }
        }, 1000);
      },
      reset(mobMode: boolean): void {
        patchState(store, { mobMode, lives: mobMode ? 10 : 3, browserResized: false, level: 1 });
      },
      pause(): void {
        patchState(store, { paused: true });
      },
      resume(): void {
        patchState(store, { paused: false });
      },
      end(): void {
        patchState(store, { lives: 0, paused: true });
      },
      nextLevel(): void {
        patchState(store, (s) => ({ level: s.level + 1 }));
      },
      resetLevel(): void {
        patchState(store, { level: 0 });
      },
      markBrowserResized(): void {
        patchState(store, { browserResized: true });
      },
      loseLife(): void {
        patchState(store, (s) => ({ lives: s.lives - 1 }));
      },
      gainLife(): void {
        patchState(store, (s) => ({ lives: s.lives + 1 }));
      },
    };
  }),
);
