import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, startWith } from 'rxjs';
import { NavType } from './nav-type';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  hideMenuBtn$ = new BehaviorSubject<boolean>(false);
  label$ = new BehaviorSubject<string>('Location');
  nav!: MatSidenav;
  photoNav!: MatSidenav;
  readonly #destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  get showPhotoMenu() {
    return this.router.url !== '/about' && this.router.url !== '/avoid-the-cob';
  }

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
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        if (this.nav?.opened || this.photoNav?.opened) {
          document.querySelector('body')?.classList.add('overflow-hidden');
        } else {
          document.querySelector('body')?.classList.remove('overflow-hidden');
        }
      });
  }
}
