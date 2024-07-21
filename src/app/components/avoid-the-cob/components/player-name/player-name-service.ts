import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';

@Injectable({
  providedIn: 'root',
})
export class PlayerNameService {
  name = new FormControl<string>('', [Validators.required, Validators.maxLength(20), this.profanityValidator()]);

  constructor() {
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
    const menuClassList = document.getElementsByTagName('app-player-name')[0].classList;
    menuClassList.add('opacity-0');
    menuClassList.add('pointer-events-none');
  }

  show() {
    const menuClassList = document.getElementsByTagName('app-player-name')[0].classList;
    menuClassList.remove('opacity-0');
    menuClassList.remove('pointer-events-none');
  }
}
