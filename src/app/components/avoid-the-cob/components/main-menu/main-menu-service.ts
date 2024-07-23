import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParticleService } from '../../services/particle-service';
import { ShowHideService } from '../../services/show-hide-service';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  showParticles = new FormControl<boolean>(false);

  constructor(
    private particleService: ParticleService,
    private showHideService: ShowHideService,
  ) {}

  hide() {
    this.showParticles.setValue(false);
    this.showHideService.hide('app-main-menu');
  }

  show() {
    this.particleService.showMenuParticles('cornSvg', this.showParticles);
    this.showHideService.show('app-main-menu');
  }
}
