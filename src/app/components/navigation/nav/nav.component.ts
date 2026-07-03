import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { NavType } from '../../toolbar/nav-type';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { NavLink, navGroups } from './links';

@Component({
  selector: 'app-nav',
  imports: [NavButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class NavComponent {
  protected readonly hostClasses = computed(() => [
    //Layout
    'flex',
    'h-full',
    'flex-col',
    'items-center',
    'overflow-y-auto',

    // Background
    'bg-mat-black',
  ]);

  public readonly sidenav = input.required<MatSidenav>();
  protected readonly groups = navGroups;
  private readonly router = inject(Router);
  private readonly toolbarService = inject(ToolbarService);

  protected readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  public ngOnInit() {
    this.toolbarService.setNav(this.sidenav(), NavType.Links);
  }

  protected navigate(path: string, external = false) {
    if (external) {
      window.open(path);
    } else if (this.currentRoute() !== path) {
      this.sidenav().close();
      this.router.navigate([path]);
    }
  }

  protected hasActiveSublink(links: NavLink[]): boolean {
    return !!links.find((link) => this.currentRoute().includes(link.url));
  }
}
