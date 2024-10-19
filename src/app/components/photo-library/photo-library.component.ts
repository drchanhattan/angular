import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { PhotoMenuComponent } from '../photo-menu/photo-menu.component';
import { PhotoAlbum } from './photo-album';
import { PhotoLibraryService } from './photo-library.service';

@Component({
  selector: 'app-photo-library',
  standalone: true,
  imports: [
    CommonModule,
    IconButtonComponent,
    MatProgressSpinnerModule,
    MatSidenavModule,
    PhotoMenuComponent,
    RouterLink,
  ],
  templateUrl: './photo-library.component.html',
})
export class PhotoLibraryComponent {
  @HostBinding('class') hostClasses = 'flex flex-col bg-neutral-white';
  @Input() name: string = '';
  @Input() hero: string = '';
  @Input() albums!: PhotoAlbum[];

  constructor(public photoLibraryService: PhotoLibraryService) {}

  animate() {
    AOS.refresh();
  }
}
