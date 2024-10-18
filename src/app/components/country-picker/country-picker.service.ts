import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, forkJoin, map } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountryPickerService {
  countries$ = new BehaviorSubject<Country[]>([]);
  country: string = 'Location';
  drawer!: MatSidenav;
  id$ = new BehaviorSubject<number | null>(null);
  isSelected$ = this.id$.pipe(map((id) => id !== null));
  loading$ = new BehaviorSubject<boolean>(false);
  urls$: BehaviorSubject<SafeUrl[]> = new BehaviorSubject<SafeUrl[]>([]);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.handleRouteParams();
    this.preloadImages();
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
    this.id$.next(id);
    this.country = this.countries$.value[id]?.label || 'Location';
    this.close();
  }

  deselect() {
    this.id$.next(null);
    this.country = 'Location';
  }

  toggle() {
    this.drawer?.toggle();
  }

  private handleRouteParams() {
    combineLatest([
      this.countries$,
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    ]).subscribe(async () => {
      const route$ = this.route?.children[0]?.children[0];
      if (route$ && this.countries$.value) {
        const id = (await firstValueFrom(route$.url))[0].path;
        this.select(Number(id));
      } else {
        this.deselect();
      }
    });
  }

  private preloadImages() {
    this.id$.subscribe((id) => {
      this.loading$.next(true);

      const urls = id !== null ? this.countries$.value?.[id]?.urls || [] : [];
      const requests = urls.map((url) => this.http.get(url, { responseType: 'blob' }));
      forkJoin(requests).subscribe((blobs) => {
        let urls: SafeUrl[] = [];
        blobs.forEach((blob) => urls.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))));
        this.urls$.next(urls);

        this.loading$.next(false);
      });
    });
  }
}
