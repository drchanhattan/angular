import { AfterViewInit, Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import AOS from 'aos';
import { CountryPickerService } from '../country-picker/country-picker-service';
import { CountryPickerComponent } from '../country-picker/country-picker.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CountryPickerComponent, FooterComponent, MatSidenavModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @HostBinding('class') hostClasses = 'flex flex-col bg-neutral-white';
  @ViewChild('drawer') matSidenav!: MatSidenav;
  @Input() name: string = '';
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];

  constructor(public countriesService: CountryPickerService) {}

  ngOnInit() {
    this.countriesService.unselect();
  }

  ngAfterViewInit() {
    this.countriesService.toggled.subscribe(() => this.matSidenav.toggle());
  }

  animate() {
    AOS.refresh();
  }
}
