import { AfterViewInit, DestroyRef, Directive, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';

@Directive({
  selector: '[appSidenavOverflow]',
  standalone: true,
})
export class SidenavOverflowDirective implements AfterViewInit {
  @Input('appSidenavOverflow') drawer!: MatSidenav;
  readonly #destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.drawer.openedStart
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => document.querySelector('body')?.classList.add('overflow-hidden'));

    this.drawer.closedStart
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => document.querySelector('body')?.classList.remove('overflow-hidden'));
  }
}
