import { Injectable } from '@angular/core';
import { ShowHideService } from '../../services/show-hide-service';

@Injectable({
  providedIn: 'root',
})
export class GameTextService {
  text: string = '';
  subtext: string = '';
  constructor(private showHideService: ShowHideService) {}

  show(text: string, subtext: string, duration: number) {
    this.text = text;
    this.subtext = subtext;

    this.showHideService.show('app-game-text');
    setTimeout(() => {
      this.showHideService.hide('app-game-text');
    }, duration);
  }
}
