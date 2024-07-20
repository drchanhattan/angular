import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  playerName = new FormControl<string>('', [Validators.required, this.profanityValidator()]);

  constructor() {
    const name = window.localStorage.getItem('playerName');

    if (name) {
      this.playerName.setValue(name);
    }
  }

  saveName() {
    if (this.playerName.value && this.playerName.valid) {
      window.localStorage.setItem('playerName', this.playerName.value.toUpperCase());
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
}
