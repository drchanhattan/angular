import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CountryPickerService } from '../country-picker/country-picker.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';

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
    this.scrollTop = window.scrollY === 0;
  }

  constructor(
    public countryPickerService: CountryPickerService,
    private router: Router,
  ) {
    this.onScroll();
  }

  get isGame() {
    return this.router.url === '/avoid-the-cob';
  }

  get isHome() {
    return this.router.url === '/';
  }

  get hideToolbar() {
    return (
      !this.scrollTop ||
      this.drawer.opened ||
      this.countryPickerService?.drawer?.opened ||
      this.countryPickerService.isSelected
    );
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
