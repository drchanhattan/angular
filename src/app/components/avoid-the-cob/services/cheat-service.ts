import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PowerUpService } from './power-up-service';

@Injectable({
  providedIn: 'root',
})
export class CheatService {
  cheats = new FormGroup({
    invincibility: new FormControl<boolean>(false),
    magnet: new FormControl<boolean>(false),
    repel: new FormControl<boolean>(false),
    freeze: new FormControl<boolean>(false),
  });

  constructor(private powerUpService: PowerUpService) {}

  get cheatsEnabled(): boolean {
    return Object.values(this.cheats.value).some((cheat) => cheat === true);
  }

  execute() {
    const { invincibility, magnet, repel, freeze } = this.cheats.value;

    if (!!invincibility) {
      this.powerUpService.powerInvincible();
    }
    if (!!magnet) {
      setTimeout(() => {
        this.powerUpService.powerAttract();
      }, 1000);
    }
    if (!!repel) {
      this.powerUpService.powerRepel();
    }
    if (!!freeze) {
      this.powerUpService.powerSlowCorn();
    }
  }
}
