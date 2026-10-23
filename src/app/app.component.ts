import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { NavComponent } from './components/navigation/nav/nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, NavComponent, RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    this.redirectToHash();
    this.animateOnScroll();
  }

  private redirectToHash() {
    if (!window.location.hash) {
      window.location.href = '/#' + window.location.pathname;
    }
  }

  private animateOnScroll() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        AOS.init();
      }
    };
  }
}
