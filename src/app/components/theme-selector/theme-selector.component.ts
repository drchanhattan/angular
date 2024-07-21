import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeSelectorService } from './theme-selector-service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [IconButtonComponent, MatIconModule, MatMenuModule],
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
  constructor(public service: ThemeSelectorService) {}

  setTheme(theme: 'light-theme' | 'dark-theme') {
    this.service.setTheme(theme);
  }
}
