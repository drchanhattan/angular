import { Component, HostBinding, input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationButtonComponent } from '../navigation-button/navigation-button.component';
import { MenuType } from '../toolbar/menu-type';
import { ToolbarService } from '../toolbar/toolbar.service';
import { SideNavLink, sideNavLinks } from './navigation-links';

@Component({
  selector: 'app-navigation',
  imports: [NavigationButtonComponent],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-y-auto bg-mat-black';
  sidenav = input.required<MatSidenav>();
  currentRoute: string = '';
  links = sideNavLinks;

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
    this.toolbarService.setMenu(this.sidenav(), MenuType.Navigation);
  }

  navigate(path: string, external = false) {
    if (external) {
      window.open(path);
    } else if (this.currentRoute !== path) {
      this.sidenav().close();
      this.router.navigate([path]);
    }
  }

  hasActiveSublink(links: SideNavLink[]): boolean {
    return !!links.find((link) => this.currentRoute.includes(link.url));
  }
}
