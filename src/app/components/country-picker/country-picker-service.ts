import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryPickerService {
  toggled = new EventEmitter();
  index!: number;

  get isSelected() {
    return !isNaN(this.index);
  }

  select(index: number) {
    window.scrollTo(0, 0);
    this.index = index;
  }

  unselect() {
    this.index = undefined!;
  }

  toggle() {
    this.toggled.emit();
  }
}
