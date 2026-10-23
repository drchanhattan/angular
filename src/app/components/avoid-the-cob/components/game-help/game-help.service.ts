import { inject, Injectable } from '@angular/core';
import { OverlayStore } from '../../store/overlay.store';
import { MainMenuService } from '../main-menu/main-menu.service';

@Injectable({
  providedIn: 'root',
})
export class GameHelpService {
  private readonly mainMenuService = inject(MainMenuService);
  private readonly overlay = inject(OverlayStore);

  public show() {
    this.mainMenuService.hide();
    this.overlay.show('help');
  }

  public hide() {
    this.overlay.hide('help');
    this.mainMenuService.show();
  }
}
