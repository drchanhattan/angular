import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { OverlayStore } from '../../store/overlay.store';

export const GameTextStore = signalStore(
  { providedIn: 'root' },
  withState({ text: '', subtext: '' }),
  withMethods((store, overlay = inject(OverlayStore)) => ({
    async show(text: string, subtext: string, duration: number): Promise<void> {
      patchState(store, { text, subtext });
      overlay.show('gameText');
      await new Promise((resolve) => setTimeout(resolve, duration));
      overlay.hide('gameText');
    },
  })),
);
