import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import AOS from 'aos';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { CountriesService } from './countries/countries-service';
import { CountriesComponent } from './countries/countries.component';

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
    CountriesComponent,
  ],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center overflow-hidden bg-neutral-white';
  @ViewChild('drawer') matSidenav!: MatSidenav;
  @Input() name!: string;
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];

  constructor(public countriesService: CountriesService) {}

  ngAfterViewInit() {
    this.countriesService.unselect();
    this.countriesService.toggled.subscribe(() => this.matSidenav.toggle());
  }

  animate() {
    AOS.refresh();
  }
}
