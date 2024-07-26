import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';
import { GameObjectDefaults } from '../../models/game-object/game-object-defaults';
import { OpacityService } from '../../services/opacity-service';
import { ParticleService } from '../../services/particle-service';

@Injectable({
  providedIn: 'root',
})
export class PlayerNameService {
  name = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    this.characterValidator(),
    this.whitespaceValidator(),
    this.profanityValidator(),
  ]);
  showParticles = new FormControl<boolean>(false);

  constructor(
    private particleService: ParticleService,
    private opacityService: OpacityService,
  ) {
    const name = window.localStorage.getItem('name');

    if (name) {
      this.name.setValue(name);
    }
  }

  show() {
    const settings = GameObjectDefaults.powerUp().settings;
    settings.gravity = -0.015;
    this.particleService.showMenuParticles('peaSvg', this.showParticles, settings, 30);
    this.opacityService.show('app-player-name');
  }

  hide() {
    this.showParticles.setValue(false);
    this.opacityService.hide('app-player-name');
  }

  private characterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^[\p{L}\- ]+$/u; // Letters spaces and hyphens
      if (control.value && !pattern.test(control.value)) {
        return { letters: true };
      }
      return null;
    };
  }

  private whitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const consecutivePattern = /[ \-]{2,}/; // Consecutive spaces or hyphens
      const edgePattern = /(^[ \-])|([ \-]$)/; // leading or trailing spaces or hyphens

      return value
        ? consecutivePattern.test(value)
          ? { consecutive: true }
          : edgePattern.test(value)
            ? { edge: true }
            : null
        : null;
    };
  }

  private profanityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
      });
      const containsProfanity = matcher.hasMatch(control.value.replace(/\s/g, ''));
      return containsProfanity ? { profanity: true } : null;
    };
  }
}
