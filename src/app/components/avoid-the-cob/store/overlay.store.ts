import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type OverlayState = {
  gameText: boolean;
  help: boolean;
  leaderboard: boolean;
  mainMenu: boolean;
  playerName: boolean;
  settings: boolean;
};

export type OverlayItem = keyof OverlayState;

const initialState: OverlayState = {
  gameText: false,
  help: false,
  leaderboard: false,
  mainMenu: false,
  playerName: false,
  settings: false,
};

export const OverlayStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    show(item: OverlayItem): void {
      patchState(store, { [item]: true });
    },
    hide(item: OverlayItem): void {
      patchState(store, { [item]: false });
    },
  })),
);
