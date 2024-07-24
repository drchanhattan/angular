import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';
import { GameObjectDefaults } from '../../models/game-object/game-object-defaults';
import { ParticleService } from '../../services/particle-service';
import { ShowHideService } from '../../services/show-hide-service';

@Injectable({
  providedIn: 'root',
})
export class PlayerNameService {
  firstName = new FormControl<string>('', [Validators.required, Validators.maxLength(15), this.profanityValidator()]);
  lastName = new FormControl<string>('', [Validators.required, Validators.maxLength(15), this.profanityValidator()]);
  showParticles = new FormControl<boolean>(false);

  constructor(
    private particleService: ParticleService,
    private showHideService: ShowHideService,
  ) {
    const name = window.localStorage.getItem('name');

    if (name) {
      this.firstName.setValue(name);
    }
  }

  private profanityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
      });
      const containsProfanity = matcher.hasMatch(control.value);
      return containsProfanity ? { profanity: true } : null;
    };
  }

  hide() {
    this.showParticles.setValue(false);
    this.showHideService.hide('app-player-name');
  }

  show() {
    this.particleService.showMenuParticles('peaSvg', this.showParticles, GameObjectDefaults.pea().settings, 10);
    this.showHideService.show('app-player-name');
  }
}
