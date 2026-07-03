import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, startWith } from 'rxjs';
import { NavType } from './nav-type';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  hideMenuBtn = signal<boolean>(false);
  label = signal<string>('Location');
  navOpen = signal<boolean>(false);
  photoNavOpen = signal<boolean>(false);
  nav!: MatSidenav;
  photoNav!: MatSidenav;
  readonly #destroyRef = inject(DestroyRef);
  private router = inject(Router);

  showPhotoMenu = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url !== '/about' && this.router.url !== '/avoid-the-cob'),
    ),
    { initialValue: true },
  );

  setNav(sidenav: MatSidenav, navType: NavType) {
    if (navType === NavType.Photos) {
      this.photoNav = sidenav;
    } else {
      this.nav = sidenav;
    }

    this.hideOverflow(sidenav);
  }

  toggleMenu(menuType: NavType) {
    if (menuType === NavType.Photos) {
      this.nav?.close();
      this.photoNav?.toggle();
    } else {
      this.nav?.toggle();
      this.photoNav?.close();
    }
  }

  hideOverflow(sidenav: MatSidenav) {
    const open$ = sidenav.openedStart.pipe(startWith({}));
    const close$ = sidenav.closedStart.pipe(startWith({}));

    combineLatest([open$, close$])
      .pipe()
      .subscribe(() => {
        const navOpen = this.nav?.opened || false;
        const photoNavOpen = this.photoNav?.opened || false;
        this.navOpen.set(navOpen);
        this.photoNavOpen.set(photoNavOpen);
        if (navOpen || photoNavOpen) {
          document.querySelector('body')?.classList.add('overflow-hidden');
        } else {
          document.querySelector('body')?.classList.remove('overflow-hidden');
        }
      });
  }
}
