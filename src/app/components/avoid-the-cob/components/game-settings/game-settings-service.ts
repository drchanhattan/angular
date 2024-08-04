import { Injectable } from '@angular/core';
import { AudioService } from '../../services/audio-service';
import { CheatService } from '../../services/cheat-service';
import { OverlayItem, OverlayService } from '../../services/overlay-service';
import { ParticleService } from '../../services/particle-service';
import { MainMenuService } from '../main-menu/main-menu-service';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  constructor(
    private audioService: AudioService,
    private cheatService: CheatService,
    private mainMenuService: MainMenuService,
    private overlayService: OverlayService,
    private particleService: ParticleService,
  ) {}

  get settingsChanged() {
    return !this.audioService.enabled.value || this.cheatService.cheatsEnabled || this.particleService.maxCountChanged;
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
