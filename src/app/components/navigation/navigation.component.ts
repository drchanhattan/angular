import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { NavigationButtonComponent } from './navigation-button/navigation-button.component';
import { SideNavLink, sideNavLinks } from './navigation-links';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [IconButtonComponent, MatDividerModule, NavigationButtonComponent],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @HostBinding('class') hostClasses = 'bg-mat-black/75 flex h-full flex-col items-center overflow-hidden';
  @Output() close = new EventEmitter();
  currentRoute!: string;
  links = sideNavLinks;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = event.url;
      window.scrollTo(0, 0);
    });
  }

  navigate(path: string, external = false) {
    if (external) {
      window.open(path);
    } else if (this.currentRoute !== path) {
      this.close.emit();
      this.router.navigate([path]);
    }
  }

  hasActiveSublink(links: SideNavLink[]) {
    return links.map((link) => link.url).includes(this.currentRoute);
  }
}
