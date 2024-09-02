import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  selected!: number;

  get isSelected() {
    return !isNaN(this.selected);
  }

  select(index: number) {
    this.selected = index;
    window.scrollTo(0, 0);
  }
}
