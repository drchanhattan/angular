import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { BehaviorSubject, take } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { PhotoMenuComponent } from '../photo-menu/photo-menu.component';
import { PhotoAlbum } from './photo-album';
import { PhotoLibraryService } from './photo-library.service';

@Component({
    selector: 'app-photo-library',
    imports: [
        CommonModule,
        IconButtonComponent,
        MatProgressSpinnerModule,
        MatSidenavModule,
        PhotoMenuComponent,
        RouterLink,
    ],
    templateUrl: './photo-library.component.html'
})
export class PhotoLibraryComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex flex-col bg-neutral-white';
  @Input() name: string = '';
  @Input() hero: string = '';
  @Input() albums!: PhotoAlbum[];
  hero$ = new BehaviorSubject<SafeUrl | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public photoLibraryService: PhotoLibraryService,
  ) {}

  ngOnInit() {
    httpBlob$(this.hero, this.http)
      .pipe(take(1))
      .subscribe((blob) => this.hero$.next(sanitizeBlob(blob, this.sanitizer)));
  }

  animate() {
    AOS.refresh();
  }
}
