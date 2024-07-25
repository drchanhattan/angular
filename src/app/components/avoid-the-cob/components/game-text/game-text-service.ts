import { Injectable } from '@angular/core';
import { OpacityService } from '../../services/opacity-service';

@Injectable({
  providedIn: 'root',
})
export class GameTextService {
  text: string = '';
  subtext: string = '';
  constructor(private opacityService: OpacityService) {}

  show(text: string, subtext: string, duration: number) {
    this.text = text;
    this.subtext = subtext;

    this.opacityService.show('app-game-text');
    setTimeout(() => {
      this.opacityService.hide('app-game-text');
    }, duration);
  }
}
