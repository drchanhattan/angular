import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AvoidTheCobComponent } from './components/avoid-the-cob/avoid-the-cob.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RouterLink, AvoidTheCobComponent, MatIconModule],
  providers: [MatIconRegistry],
})
export class AppComponent {
  title = 'website';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'corn',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/corn.svg'),
    );
  }
}
