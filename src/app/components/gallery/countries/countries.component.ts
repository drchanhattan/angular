import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CountriesService } from './countries-service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './countries.component.html',
})
export class CountriesComponent {
  @HostBinding('class') hostClasses = 'bg-sidenav-gradient flex h-full flex-col items-center overflow-hidden';
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];
  @Output() selected = new EventEmitter();

  constructor(private countriesService: CountriesService) {}

  select(index: number) {
    this.countriesService.select(index);
    this.selected.emit();
  }

  isSelected(index: number) {
    return this.countriesService.index === index;
  }
}
