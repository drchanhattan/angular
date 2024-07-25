import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameObjectDefaults } from '../../models/game-object/game-object-defaults';
import { OpacityService } from '../../services/opacity-service';
import { ParticleService } from '../../services/particle-service';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  showParticles = new FormControl<boolean>(false);

  constructor(
    private particleService: ParticleService,
    private opacityService: OpacityService,
  ) {}

  hide() {
    this.showParticles.setValue(false);
    this.opacityService.hide('app-main-menu');
  }

  show() {
    this.particleService.showMenuParticles('cornSvg', this.showParticles, GameObjectDefaults.corn().settings, 30);
    this.opacityService.show('app-main-menu');
  }
}
