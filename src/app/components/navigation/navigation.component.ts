import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationButtonComponent } from '../navigation-button/navigation-button.component';
import { SideNavLink, sideNavLinks } from './navigation-links';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavigationButtonComponent],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black';
  @Output() close = new EventEmitter();
  currentRoute: string = '';
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

  hasActiveSublink(links: SideNavLink[]): boolean {
    return !!links.find((link) => this.currentRoute.includes(link.url));
  }
}
