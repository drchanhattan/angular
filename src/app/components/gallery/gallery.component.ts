import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { Country } from '../country-picker/country';
import { CountryPickerComponent } from '../country-picker/country-picker.component';
import { CountryPickerService } from '../country-picker/country-picker.service';
import { FooterComponent } from '../footer/footer.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    CountryPickerComponent,
    FooterComponent,
    IconButtonComponent,
    MatProgressSpinnerModule,
    MatSidenavModule,
    RouterLink,
  ],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex flex-col bg-neutral-white';
  @Input() name: string = '';
  @Input() hero: string = '';
  @Input() countries!: Country[];

  constructor(public countryPickerService: CountryPickerService) {}

  animate() {
    AOS.refresh();
  }
}
