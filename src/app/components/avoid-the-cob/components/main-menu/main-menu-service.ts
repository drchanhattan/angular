import { Injectable } from '@angular/core';
import { GameObjectDefaults } from '../../models/game-object/game-object-defaults';
import { OverlayItem, OverlayService } from '../../services/overlay-service';
import { ParticleService } from '../../services/particle-service';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  constructor(
    private overlayService: OverlayService,
    private particleService: ParticleService,
  ) {}

  show() {
    this.overlayService.toggle(OverlayItem.MainMenu, false);
    this.particleService.menuParticles('cornSvg', GameObjectDefaults.corn().settings, 30);
  }

  hide() {
    this.overlayService.toggle(OverlayItem.MainMenu, true);
  }
}
