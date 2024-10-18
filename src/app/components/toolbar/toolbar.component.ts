import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CountryPickerService } from '../country-picker/country-picker.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() drawer!: MatSidenav;
  scrollTop: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollTop = window.scrollY < 64;
  }

  constructor(
    public countryPickerService: CountryPickerService,
    public toolbarService: ToolbarService,
  ) {
    this.onScroll();
  }

  get darkToolbar() {
    return !this.scrollTop || this.drawer.opened || this.countryPickerService?.drawer?.opened;
  }

  toggleMenu() {
    this.drawer.toggle();
    this.countryPickerService.close();
  }

  toggleLocation() {
    this.countryPickerService.toggle();
    this.drawer.close();
  }
}
