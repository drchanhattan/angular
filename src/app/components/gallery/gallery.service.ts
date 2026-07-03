import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, firstValueFrom, forkJoin, map, of, switchMap } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Album } from './album';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  albums = signal<Album[]>([]);
  id = signal<number | null>(null);
  isSelected = computed(() => this.id() !== null);
  loading = signal<boolean>(false);
  urls = signal<SafeUrl[]>([]);

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
    this.id.set(id);
    this.toolbarService.label.set(this.albums()[id]?.label || 'Location');
    this.toolbarService.photoNav?.close();
  }

  deselect() {
    this.id.set(null);
    this.toolbarService.label.set('Location');
  }

  private handleRouteParams() {
    combineLatest([
      toObservable(this.albums),
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    ]).subscribe(async () => {
      const route$ = this.route?.children[0]?.children[0];
      if (route$ && this.albums()) {
        const id = (await firstValueFrom(route$.url))[0].path;
        this.select(Number(id));
      } else {
        this.deselect();
      }
    });
  }

  private preloadImages() {
    toObservable(this.id)
      .pipe(
        switchMap((id) => {
          this.loading.set(true);
          const urls = id !== null ? this.albums()?.[id]?.urls || [] : [];
          if (!urls.length) return of([] as Blob[]);
          return forkJoin(urls.map((url) => httpBlob$(url, this.http)));
        }),
        map((blobs) => blobs.map((blob) => sanitizeBlob(blob, this.sanitizer))),
      )
      .subscribe((safeUrls) => {
        this.urls.set(safeUrls);
        this.loading.set(false);
      });
  }
}
