import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryPickerService {
  toggled = new EventEmitter();
  index: number | undefined;

  get isSelected(): boolean {
    return this.index !== undefined && !isNaN(this.index);
  }

  select(index: number | undefined) {
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
