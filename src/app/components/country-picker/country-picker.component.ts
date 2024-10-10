import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CountryPickerService } from './country-picker-service';

@Component({
  selector: 'app-country-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './country-picker.component.html',
})
export class CountryPickerComponent {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black/85';
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];
  @Output() selected = new EventEmitter();

  constructor(private countriesService: CountryPickerService) {}

  select(index: number) {
    this.countriesService.select(index);
    this.selected.emit();
  }

  isSelected(index: number) {
    return this.countriesService.index === index;
  }
}
