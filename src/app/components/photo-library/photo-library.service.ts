import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, forkJoin, map } from 'rxjs';
import { ToolbarService } from '../toolbar/toolbar.service';
import { PhotoAlbum } from './photo-album';

@Injectable({
  providedIn: 'root',
})
export class PhotoLibraryService {
  albums$ = new BehaviorSubject<PhotoAlbum[]>([]);
  id$ = new BehaviorSubject<number | null>(null);
  isSelected$ = this.id$.pipe(map((id) => id !== null));
  loading$ = new BehaviorSubject<boolean>(false);
  urls$: BehaviorSubject<SafeUrl[]> = new BehaviorSubject<SafeUrl[]>([]);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toolbarService: ToolbarService,
  ) {
    this.handleRouteParams();
    this.preloadImages();
  }

  select(id: number) {
    window.scrollTo(0, 0);
    this.id$.next(id);
    this.toolbarService.label$.next(this.albums$.value[id]?.label || 'Location');
    this.toolbarService.photoMenu?.close();
  }

  deselect() {
    this.id$.next(null);
    this.toolbarService.label$.next('Location');
  }

  private handleRouteParams() {
    combineLatest([this.albums$, this.router.events.pipe(filter((event) => event instanceof NavigationEnd))]).subscribe(
      async () => {
        const route$ = this.route?.children[0]?.children[0];
        if (route$ && this.albums$.value) {
          const id = (await firstValueFrom(route$.url))[0].path;
          this.select(Number(id));
        } else {
          this.deselect();
        }
      },
    );
  }

  private preloadImages() {
    this.id$.subscribe((id) => {
      this.loading$.next(true);

      const urls = id !== null ? this.albums$.value?.[id]?.urls || [] : [];
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
