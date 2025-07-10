import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import AOS from 'aos';
import { BehaviorSubject, take } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { PhotoMenuComponent } from '../photo-menu/photo-menu.component';
import { ToolbarService } from '../toolbar/toolbar.service';
import { PhotoAlbum } from './photo-album';
import { PhotoLibraryService } from './photo-library.service';

@Component({
  selector: 'app-photo-library',
  imports: [CommonModule, MatProgressSpinnerModule, MatSidenavModule, PhotoMenuComponent],
  templateUrl: './photo-library.component.html',
})
export class PhotoLibraryComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex flex-col bg-neutral-white';
  name = input<string>('');
  hero = input<string>('');
  albums = input.required<PhotoAlbum[]>();
  hero$ = new BehaviorSubject<SafeUrl | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public photoLibraryService: PhotoLibraryService,
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
