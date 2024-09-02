import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import AOS from 'aos';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { CountryListService } from './country-list/country-list-service';
import { CountrySelectorComponent } from './country-list/country-list.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    IconButtonComponent,
    GalleryComponent,
    CountrySelectorComponent,
  ],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center overflow-hidden bg-neutral-white';
  @Input() name!: string;
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];

  constructor(public countryListService: CountryListService) {}

  animate() {
    AOS.refresh();
  }
}
