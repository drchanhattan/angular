import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CountryPickerService } from '../country-picker/country-picker-service';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() drawer!: MatSidenav;
  @Output() icon = new EventEmitter();

  constructor(
    public countryPickerService: CountryPickerService,
    public router: Router,
  ) {}

  get isGame() {
    return this.router.url === '/avoid-the-cob';
  }

  get isHome() {
    return this.router.url === '/home';
  }
}
