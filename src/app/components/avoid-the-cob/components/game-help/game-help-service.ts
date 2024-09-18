import { Injectable } from '@angular/core';
import { OverlayItem, OverlayService } from '../../services/overlay-service';
import { MainMenuService } from '../main-menu/main-menu-service';

@Injectable({
  providedIn: 'root',
})
export class GameHelpService {
  constructor(
    private mainMenuService: MainMenuService,
    private overlayService: OverlayService,
  ) {}

  show() {
    this.mainMenuService.hide();
    this.overlayService.toggle(OverlayItem.Help, false);
  }

  hide() {
    this.overlayService.toggle(OverlayItem.Help, true);
    this.mainMenuService.show();
  }
}
