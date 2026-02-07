import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import AOS from 'aos';
import { BehaviorSubject, take } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { PhotoNavComponent } from '../navigation/photo-nav/photo-nav.component';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Album } from './album';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, MatProgressSpinnerModule, MatSidenavModule, PhotoNavComponent],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
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
  hero$ = new BehaviorSubject<SafeUrl | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public galleryService: GalleryService,
    public toolbarService: ToolbarService,
  ) {}

  ngOnInit() {
    httpBlob$(this.hero(), this.http)
      .pipe(take(1))
      .subscribe((blob) => this.hero$.next(sanitizeBlob(blob, this.sanitizer)));
  }

  animate() {
    AOS.refresh();
  }
}
