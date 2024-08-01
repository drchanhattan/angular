import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { SideNavButtonComponent } from './side-nav-button/side-nav-button.component';
import { SideNavLink, sideNavLinks } from './side-nav-links';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, SideNavButtonComponent, ThemeSelectorComponent],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center';
  @Output() close = new EventEmitter();
  currentRoute!: string;
  links = sideNavLinks;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = event.url;
      window.scrollTo(0, 0);
    });
  }

  navigate(path: string) {
    if (this.currentRoute !== path) {
      this.close.emit();
      this.router.navigate([path]).then(() => window.location.reload());
    }
  }

  hasActiveSublink(links: SideNavLink[]) {
    return links.map((link) => link.url).includes(this.currentRoute);
  }
}
