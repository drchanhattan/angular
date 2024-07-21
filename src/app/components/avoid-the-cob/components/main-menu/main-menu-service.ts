import { Injectable } from '@angular/core';
import { GameObject } from '../../models/game-object/game-object';
import { GameObjectDefaults } from '../../models/game-object/game-object-defaults';
import { ParticleService } from '../../services/particle-service';
import { ShowHideService } from '../../services/show-hide-service';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  menuParticles: boolean = false;

  constructor(
    private particleService: ParticleService,
    private showHideService: ShowHideService,
  ) {
    this.showParticles();
  }

  hide() {
    this.hideParticles();
    this.showHideService.hide('app-main-menu');
  }

  show() {
    this.showParticles();
    this.showHideService.show('app-main-menu');
  }

  private showParticles() {
    if (!this.menuParticles) {
      this.menuParticles = true;

      const centre = new GameObject(window.innerWidth / 2, window.innerHeight / 2, GameObjectDefaults.corn().settings);
      const interval = setInterval(() => {
        this.menuParticles ? this.particleService.create(centre, 30, 2) : clearInterval(interval);
      }, 500);
    }
  }

  private hideParticles() {
    this.menuParticles = false;
  }
}
