import { inject, Injectable } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CheatService } from '../../services/cheat.service';
import { CursorService } from '../../services/cursor.service';
import { ParticleService } from '../../services/particle.service';
import { OverlayStore } from '../../store/overlay.store';
import { MainMenuService } from '../main-menu/main-menu.service';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  private readonly audioService = inject(AudioService);
  private readonly cheatService = inject(CheatService);
  private readonly cursorService = inject(CursorService);
  private readonly mainMenuService = inject(MainMenuService);
  private readonly overlay = inject(OverlayStore);
  private readonly particleService = inject(ParticleService);

  public get settingsChanged() {
    return (
      this.audioService.changed() ||
      this.cheatService.cheatsEnabled ||
      this.particleService.maxCountChanged ||
      !!this.cursorService.donut.value
    );
  }

  public show() {
    this.mainMenuService.hide();
    this.overlay.show('settings');
  }

  public hide() {
    this.overlay.hide('settings');
    this.mainMenuService.show();
  }
}
