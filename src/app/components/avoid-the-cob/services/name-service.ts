import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  name = new FormControl<string>('', [Validators.required, this.profanityValidator()]);

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
}
