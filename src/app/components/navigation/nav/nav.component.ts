import { Component, HostBinding, input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavType } from '../../toolbar/nav-type';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { NavLink, navGroups } from './links';

@Component({
  selector: 'app-nav',
  imports: [NavButtonComponent],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @HostBinding('class') hostClasses = [
    //Layout
    'flex',
    'h-full',
    'flex-col',
    'items-center',
    'overflow-y-auto',

    // Background
    'bg-mat-black',
  ].join(' ');

  sidenav = input.required<MatSidenav>();
  currentRoute: string = '';
  groups = navGroups;

  constructor(
    private router: Router,
    private toolbarService: ToolbarService,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = event.urlAfterRedirects;
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.toolbarService.setNav(this.sidenav(), NavType.Links);
  }

  navigate(path: string, external = false) {
    if (external) {
      window.open(path);
    } else if (this.currentRoute !== path) {
      this.sidenav().close();
      this.router.navigate([path]);
    }
  }

  hasActiveSublink(links: NavLink[]): boolean {
    return !!links.find((link) => this.currentRoute.includes(link.url));
  }
}
