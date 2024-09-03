import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  toggled = new EventEmitter();
  selected!: number;

  get isSelected() {
    return !isNaN(this.selected);
  }

  select(index: number) {
    window.scrollTo(0, 0);
    this.selected = index;
  }

  unselect() {
    this.selected = undefined!;
  }

  toggle() {
    this.toggled.emit();
  }
}
