import { Injectable } from '@angular/core';

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
  gameText = false;
  help = false;
  leaderboard = false;
  mainMenu = false;
  playerName = false;
  settings = false;

  toggle(item: OverlayItem, hide: boolean) {
    switch (item) {
      case OverlayItem.GameText: {
        this.gameText = !hide;
        break;
      }
      case OverlayItem.Help: {
        this.help = !hide;
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
      case OverlayItem.Settings: {
        this.settings = !hide;
        break;
      }
    }
  }
}
