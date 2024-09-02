import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CountryListService } from './country-list-service';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './country-list.component.html',
})
export class CountrySelectorComponent {
  @HostBinding('class') hostClasses = 'bg-sidenav flex h-full flex-col items-center overflow-hidden';
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];
  @Output() selected = new EventEmitter();

  constructor(private countryListService: CountryListService) {}

  select(index: number) {
    this.countryListService.select(index);
    this.selected.emit();
  }

  isCountryActive(index: number) {
    return this.countryListService.selected === index;
  }
}
