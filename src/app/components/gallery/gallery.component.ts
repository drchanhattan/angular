import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { map } from 'rxjs';
import { Country } from '../country-picker/country';
import { CountryPickerComponent } from '../country-picker/country-picker.component';
import { CountryPickerService } from '../country-picker/country-picker.service';
import { FooterComponent } from '../footer/footer.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, CountryPickerComponent, FooterComponent, MatSidenavModule, IconButtonComponent, RouterLink],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex flex-col bg-neutral-white';
  @Input() name: string = '';
  @Input() hero: string = '';
  @Input() countries!: Country[];

  urls$ = this.countriesService.id$.pipe(map((id) => (id !== null ? this.countries[id].urls : [])));

  constructor(public countriesService: CountryPickerService) {}

  animate() {
    AOS.refresh();
  }
}
