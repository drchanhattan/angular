import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CountryListService } from '../gallery/country-list/country-list-service';
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
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden px-4 bg-sidenav';
  @Output() close = new EventEmitter();
  currentRoute!: string;
  links = sideNavLinks;

  constructor(
    private countryListService: CountryListService,
    private router: Router,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.countryListService.select();
      this.currentRoute = event.url;
      window.scrollTo(0, 0);
    });
  }

  navigate(path: string) {
    if (this.currentRoute !== path) {
      this.close.emit();
      this.router.navigate([path]);
    }
  }

  hasActiveSublink(links: SideNavLink[]) {
    return links.map((link) => link.url).includes(this.currentRoute);
  }

  github() {
    window.open('https://github.com/drchanhattan/');
  }

  instagram() {
    window.open('https://www.instagram.com/drchanhattan/');
  }

  linkedIn() {
    window.open('https://www.linkedin.com/in/christopher-chan-941503a1/');
  }

  youtube() {
    window.open('https://www.youtube.com/@drchanhattan/');
  }
}
