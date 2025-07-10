import { Injectable } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CheatService } from '../../services/cheat.service';
import { CursorService } from '../../services/cursor.service';
import { OverlayItem, OverlayService } from '../../services/overlay.service';
import { ParticleService } from '../../services/particle.service';
import { MainMenuService } from '../main-menu/main-menu.service';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  constructor(
    private audioService: AudioService,
    private cheatService: CheatService,
    public cursorService: CursorService,
    private mainMenuService: MainMenuService,
    private overlayService: OverlayService,
    private particleService: ParticleService,
  ) {}

  get settingsChanged() {
    return (
      this.audioService.changed() ||
      this.cheatService.cheatsEnabled ||
      this.particleService.maxCountChanged ||
      !!this.cursorService.donut.value
    );
  }

  show() {
    this.mainMenuService.hide();
    this.overlayService.toggle(OverlayItem.Settings, false);
  }

  hide() {
    this.overlayService.toggle(OverlayItem.Settings, true);
    this.mainMenuService.show();
  }
}
