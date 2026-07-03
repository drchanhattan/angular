import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, forkJoin, map, take } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Album } from './album';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  albums$ = new BehaviorSubject<Album[]>([]);
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
    this.toolbarService.photoNav?.close();
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
      const requests = urls.map((url) => httpBlob$(url, this.http));

      forkJoin(requests)
        .pipe(take(1))
        .subscribe((blobs) => {
          const safeUrls = blobs.map((blob) => sanitizeBlob(blob, this.sanitizer));
          this.urls$.next(safeUrls);

          this.loading$.next(false);
        });
    });
  }
}
