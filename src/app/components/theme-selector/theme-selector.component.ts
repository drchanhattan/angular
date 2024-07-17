import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeSelectorService } from './theme-selector-service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
  @HostBinding('class') hostClasses = '';

  constructor(public service: ThemeSelectorService) {}

  setTheme(theme: 'light-theme' | 'dark-theme') {
    this.service.setTheme(theme);
  }
}
