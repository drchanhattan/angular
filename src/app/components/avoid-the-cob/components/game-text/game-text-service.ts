import { Injectable } from '@angular/core';
import { OverlayItem, OverlayService } from '../../services/overlay-service';

@Injectable({
  providedIn: 'root',
})
export class GameTextService {
  text: string = '';
  subtext: string = '';
  constructor(private overlayService: OverlayService) {}

  async show(text: string, subtext: string, duration: number) {
    this.text = text;
    this.subtext = subtext;

    this.overlayService.toggle(OverlayItem.GameText, false);
    await new Promise((resolve) => setTimeout(resolve, duration));
    this.overlayService.toggle(OverlayItem.GameText, true);

    return;
  }
}
