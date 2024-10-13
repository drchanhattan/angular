import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, firstValueFrom } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountryPickerService {
  countries$ = new BehaviorSubject<Country[]>([]);
  country: string = 'Location';
  drawer!: MatSidenav;
  id: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    combineLatest([
      this.countries$,
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    ]).subscribe(async () => this.handleRouteParams());
  }

  get isSelected(): boolean {
    return this.id !== undefined && !isNaN(this.id);
  }

  close() {
    this.drawer?.close();
  }

  setCountries(countries: Country[]) {
    this.countries$.next(countries);
  }

  setDrawer(drawer: MatSidenav) {
    this.drawer = drawer;
  }

  select(id: number) {
    window.scrollTo(0, 0);
    this.id = id;
    this.country = this.countries$.value[id]?.label || 'Location';
    this.close();
  }

  deselect() {
    this.id = undefined;
    this.country = 'Location';
  }

  toggle() {
    this.drawer?.toggle();
  }

  async handleRouteParams() {
    const route$ = this.route?.children[0]?.children[0];
    if (route$ && this.countries$.value) {
      const id = (await firstValueFrom(route$.url))[0].path;
      this.select(Number(id));
    } else {
      this.deselect();
    }
  }
}
