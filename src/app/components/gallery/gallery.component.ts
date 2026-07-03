import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import AOS from 'aos';
import { map, of, switchMap } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { PhotoNavComponent } from '../navigation/photo-nav/photo-nav.component';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Album } from './album';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, MatProgressSpinnerModule, MatSidenavModule, PhotoNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class GalleryComponent {
  protected readonly hostClasses = computed(() => [
    // Layout
    'flex',
    'flex-col',

    // Background
    'bg-neutral-white',
  ]);

  public readonly name = input<string>('');
  public readonly hero = input<string>('');
  public readonly albums = input.required<Album[]>();

  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly galleryService = inject(GalleryService);
  protected readonly toolbarService = inject(ToolbarService);

  protected readonly heroImage = toSignal(
    toObservable(this.hero).pipe(
      switchMap((url) =>
        url ? httpBlob$(url, this.http).pipe(map((blob) => sanitizeBlob(blob, this.sanitizer))) : of(null),
      ),
    ),
    { initialValue: null },
  );

  protected animate() {
    AOS.refresh();
  }
}
