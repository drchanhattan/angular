import { CommonModule } from '@angular/common';
import { Component, HostBinding, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { PhotoAlbum } from '../photo-library/photo-album';
import { PhotoLibraryService } from '../photo-library/photo-library.service';
import { MenuType } from '../toolbar/menu-type';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-photo-menu',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './photo-menu.component.html',
})
export class PhotoMenuComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black';
  sidenav = input.required<MatSidenav>();
  albums = input.required<PhotoAlbum[]>();

  constructor(
    public photoLibraryService: PhotoLibraryService,
    private toolbarService: ToolbarService,
  ) {}

  ngOnInit() {
    this.toolbarService.setMenu(this.sidenav(), MenuType.Photo);
    this.photoLibraryService.albums$.next(this.albums());
  }
}
