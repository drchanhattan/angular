import { Injectable } from '@angular/core';

export enum OverlayItem {
  MainMenu = 1,
  Leaderboard = 2,
  NewPlayer = 3,
  GameText = 4,
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  mainMenu = true;
  leaderboard = false;
  newPlayer = false;
  gameText = false;

  toggle(item: OverlayItem, hide: boolean) {
    switch (item) {
      case OverlayItem.MainMenu: {
        this.mainMenu = !hide;
        break;
      }
      case OverlayItem.Leaderboard: {
        this.leaderboard = !hide;
        break;
      }
      case OverlayItem.NewPlayer: {
        this.newPlayer = !hide;
        break;
      }
      case OverlayItem.GameText: {
        this.gameText = !hide;
        break;
      }
    }
  }
}
