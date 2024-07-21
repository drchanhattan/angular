import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';
import { ShowHideService } from '../../services/show-hide-service';

@Injectable({
  providedIn: 'root',
})
export class PlayerNameService {
  name = new FormControl<string>('', [Validators.required, Validators.maxLength(20), this.profanityValidator()]);

  constructor(private showHideService: ShowHideService) {
    const name = window.localStorage.getItem('name');

    if (name) {
      this.name.setValue(name);
    }
  }

  saveName() {
    if (this.name.value && this.name.valid) {
      window.localStorage.setItem('name', this.name.value.toUpperCase());
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
    this.showHideService.hide('app-player-name');
  }

  show() {
    this.showHideService.show('app-player-name');
  }
}
