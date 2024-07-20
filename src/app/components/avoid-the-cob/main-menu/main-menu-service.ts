import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { ParticleService } from '../services/particle-service';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  menuParticles: boolean = false;

  constructor(private particleService: ParticleService) {
    this.showParticles();
  }

  hide() {
    this.hideParticles();
    const menuClassList = document.getElementsByTagName('app-main-menu')[0].classList;
    menuClassList.add('opacity-0');
    menuClassList.add('pointer-events-none');
  }

  show() {
    this.showParticles();
    const menuClassList = document.getElementsByTagName('app-main-menu')[0].classList;
    menuClassList.remove('opacity-0');
    menuClassList.remove('pointer-events-none');
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
