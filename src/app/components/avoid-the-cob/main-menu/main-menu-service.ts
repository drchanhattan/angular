import { Injectable } from '@angular/core';
import { ParticleService } from '../services/particle-service';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  constructor(private particleService: ParticleService) {}

  hide() {
    this.particleService.showMenuParticles();
    const menuClassList = document.getElementsByTagName('app-main-menu')[0].classList;
    menuClassList.add('opacity-0');
    menuClassList.add('pointer-events-none');
  }

  show() {
    this.particleService.showMenuParticles();
    const menuClassList = document.getElementsByTagName('app-main-menu')[0].classList;
    menuClassList.remove('opacity-0');
    menuClassList.remove('pointer-events-none');
  }
}
