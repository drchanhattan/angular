import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PowerUpService } from './power-up.service';

@Injectable({
  providedIn: 'root',
})
export class CheatService {
  public readonly cheats = new FormGroup({
    invincibility: new FormControl<boolean>(false),
    magnetise: new FormControl<boolean>(false),
    forceField: new FormControl<boolean>(false),
    timeLock: new FormControl<boolean>(false),
  });

  constructor(private readonly powerUpService: PowerUpService) {}

  public get cheatsEnabled(): boolean {
    return Object.values(this.cheats.value).some((cheat) => !!cheat);
  }

  public execute() {
    const { invincibility, magnetise, forceField, timeLock } = this.cheats.value;

    if (!!invincibility) {
      this.powerUpService.powerInvincible();
    }
    if (!!magnetise) {
      setTimeout(() => {
        this.powerUpService.powerMagnetise();
      }, 1000);
    }
    if (!!forceField) {
      this.powerUpService.powerForceField();
    }
    if (!!timeLock) {
      this.powerUpService.powerTimeLock();
    }
  }
}
