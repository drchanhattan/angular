import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AvoidTheCobComponent } from './components/avoid-the-cob/avoid-the-cob.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink, AvoidTheCobComponent],
})
export class AppComponent {
  title = 'website';
  icons = ['corn'];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.registerIcons();
  }

  public registerIcons() {
    this.icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`/icons/${icon}.svg`),
      );
    });
  }
}
