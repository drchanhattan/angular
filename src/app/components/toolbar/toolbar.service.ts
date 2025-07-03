import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  hideMenuBtn$ = new BehaviorSubject<boolean>(false);
  label$ = new BehaviorSubject<string>('Location');
  menu!: MatSidenav;
  photoMenu!: MatSidenav;
  readonly #destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  get showPhotoMenu() {
    return this.router.url !== '/about' && this.router.url !== '/avoid-the-cob';
  }

  setMenu(sidenav: MatSidenav, photoMenu: boolean) {
    if (photoMenu) {
      this.photoMenu = sidenav;
    } else {
      this.menu = sidenav;
    }

    this.hideOverflow(sidenav);
  }

  toggleMenu(photoMenu: boolean) {
    if (photoMenu) {
      this.menu?.close();
      this.photoMenu?.toggle();
    } else {
      this.menu?.toggle();
      this.photoMenu?.close();
    }
  }

  hideOverflow(sidenav: MatSidenav) {
    const open$ = sidenav.openedStart.pipe(startWith({}));
    const close$ = sidenav.closedStart.pipe(startWith({}));

    combineLatest([open$, close$])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        if (this.menu?.opened || this.photoMenu?.opened) {
          document.querySelector('body')?.classList.add('overflow-hidden');
        } else {
          document.querySelector('body')?.classList.remove('overflow-hidden');
        }
      });
  }
}
