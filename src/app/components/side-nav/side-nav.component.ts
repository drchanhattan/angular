import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { SideNavGroup, SideNavLink, sideNavLinks } from './side-nav-links';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ThemeSelectorComponent, IconButtonComponent],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  @HostBinding('class') hostClasses = 'h-full flex flex-col items-center';
  @Output() close = new EventEmitter();
  currentRoute!: string;
  links = sideNavLinks;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = event.url;
      this.autoExpandActiveGroup();
      window.scrollTo(0, 0);
    });
  }

  private autoExpandActiveGroup() {
    this.links.forEach((link) => {
      if (link.sublinks) {
        link.expanded = this.hasActiveSublink(link.sublinks);
      }
    });
  }

  expandGroup(group: SideNavGroup, button: MatButton) {
    group.expanded = !group.expanded;
    button._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  navigate(path: string) {
    this.close.emit();
    this.router.navigate([path]).then(() => window.location.reload());
  }

  hasActiveSublink(links: SideNavLink[]) {
    return links.map((link) => link.url).includes(this.currentRoute);
  }
}
