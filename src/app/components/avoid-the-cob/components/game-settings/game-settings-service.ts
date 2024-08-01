import { Injectable } from '@angular/core';
import { OverlayItem, OverlayService } from '../../services/overlay-service';
import { MainMenuService } from '../main-menu/main-menu-service';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  constructor(
    private overlayService: OverlayService,
    private mainMenuService: MainMenuService,
  ) {}

  show() {
    this.mainMenuService.hide();
    this.overlayService.toggle(OverlayItem.Settings, false);
  }

  hide() {
    this.overlayService.toggle(OverlayItem.Settings, true);
    this.mainMenuService.show();
  }
}
