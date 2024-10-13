import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { Country } from './country';
import { CountryPickerService } from './country-picker.service';

@Component({
  selector: 'app-country-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './country-picker.component.html',
})
export class CountryPickerComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black/85';
  @Input() countries!: Country[];
  @Input() drawer!: MatSidenav;

  constructor(public countriesService: CountryPickerService) {}

  ngOnInit() {
    this.countriesService.setCountries(this.countries);
    this.countriesService.setDrawer(this.drawer);
  }
}
