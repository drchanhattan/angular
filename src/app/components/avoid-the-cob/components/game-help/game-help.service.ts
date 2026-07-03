import { Injectable } from '@angular/core';
import { OverlayItem, OverlayService } from '../../services/overlay.service';
import { MainMenuService } from '../main-menu/main-menu.service';

@Injectable({
  providedIn: 'root',
})
export class GameHelpService {
  constructor(
    private readonly mainMenuService: MainMenuService,
    private readonly overlayService: OverlayService,
  ) {}

  public show() {
    this.mainMenuService.hide();
    this.overlayService.toggle(OverlayItem.Help, false);
  }

  public hide() {
    this.overlayService.toggle(OverlayItem.Help, true);
    this.mainMenuService.show();
  }
}
