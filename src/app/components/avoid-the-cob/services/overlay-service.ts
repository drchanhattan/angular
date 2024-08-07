import { Injectable } from '@angular/core';

export enum OverlayItem {
  GameText = 1,
  Leaderboard = 2,
  MainMenu = 3,
  NewPlayer = 4,
  ModeSelector = 5,
  Settings = 6,
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  gameText = false;
  leaderboard = false;
  mainMenu = false;
  playerName = false;
  modeSelector = false;
  settings = false;

  toggle(item: OverlayItem, hide: boolean) {
    switch (item) {
      case OverlayItem.GameText: {
        this.gameText = !hide;
        break;
      }
      case OverlayItem.Leaderboard: {
        this.leaderboard = !hide;
        break;
      }
      case OverlayItem.MainMenu: {
        this.mainMenu = !hide;
        break;
      }
      case OverlayItem.NewPlayer: {
        this.playerName = !hide;
        break;
      }
      case OverlayItem.ModeSelector: {
        this.modeSelector = !hide;
        break;
      }
      case OverlayItem.Settings: {
        this.settings = !hide;
        break;
      }
    }
  }
}
