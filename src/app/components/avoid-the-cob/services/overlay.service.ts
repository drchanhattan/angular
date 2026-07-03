import { Injectable, signal } from '@angular/core';

export enum OverlayItem {
  GameText = 1,
  Help = 2,
  Leaderboard = 3,
  MainMenu = 4,
  NewPlayer = 5,
  Settings = 6,
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  public readonly gameText = signal(false);
  public readonly help = signal(false);
  public readonly leaderboard = signal(false);
  public readonly mainMenu = signal(false);
  public readonly playerName = signal(false);
  public readonly settings = signal(false);

  public toggle(item: OverlayItem, hide: boolean) {
    switch (item) {
      case OverlayItem.GameText: {
        this.gameText.set(!hide);
        break;
      }
      case OverlayItem.Help: {
        this.help.set(!hide);
        break;
      }
      case OverlayItem.Leaderboard: {
        this.leaderboard.set(!hide);
        break;
      }
      case OverlayItem.MainMenu: {
        this.mainMenu.set(!hide);
        break;
      }
      case OverlayItem.NewPlayer: {
        this.playerName.set(!hide);
        break;
      }
      case OverlayItem.Settings: {
        this.settings.set(!hide);
        break;
      }
    }
  }
}
