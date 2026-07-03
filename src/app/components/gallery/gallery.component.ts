import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostBinding, inject, input } from '@angular/core';
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
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = [
    // Layout
    'flex',
    'flex-col',

    // Background
    'bg-neutral-white',
  ].join(' ');

  name = input<string>('');
  hero = input<string>('');
  albums = input.required<Album[]>();

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  galleryService = inject(GalleryService);
  toolbarService = inject(ToolbarService);

  heroImage = toSignal(
    toObservable(this.hero).pipe(
      switchMap((url) =>
        url ? httpBlob$(url, this.http).pipe(map((blob) => sanitizeBlob(blob, this.sanitizer))) : of(null),
      ),
    ),
    { initialValue: null },
  );

  animate() {
    AOS.refresh();
  }
}
