import { Injectable } from '@angular/core';
import { OverlayItem, OverlayService } from '../../services/overlay-service';

@Injectable({
  providedIn: 'root',
})
export class ModeSelectorService {
  constructor(private overlayService: OverlayService) {}

  show() {
    this.overlayService.toggle(OverlayItem.ModeSelector, false);
  }

  hide() {
    this.overlayService.toggle(OverlayItem.ModeSelector, true);
  }
}
