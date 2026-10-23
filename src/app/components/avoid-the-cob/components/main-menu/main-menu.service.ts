import { inject, Injectable } from '@angular/core';
import { GameObjectDefaults } from '../../models/game-object/game-object-defaults';
import { ParticleService } from '../../services/particle.service';
import { OverlayStore } from '../../store/overlay.store';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  private readonly overlay = inject(OverlayStore);
  private readonly particleService = inject(ParticleService);

  public show() {
    this.overlay.show('mainMenu');
    this.particleService.menuParticles('cornSvg', GameObjectDefaults.corn().settings, 30);
  }

  public hide() {
    this.overlay.hide('mainMenu');
  }
}
