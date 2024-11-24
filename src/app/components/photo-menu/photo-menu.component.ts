import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { PhotoAlbum } from '../photo-library/photo-album';
import { PhotoLibraryService } from '../photo-library/photo-library.service';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-photo-menu',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './photo-menu.component.html',
})
export class PhotoMenuComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black';
  @Input() sidenav!: MatSidenav;
  @Input() albums!: PhotoAlbum[];

  constructor(
    public photoLibraryService: PhotoLibraryService,
    private toolbarService: ToolbarService,
  ) {}

  ngOnInit() {
    this.toolbarService.setMenu(this.sidenav, true);
    this.photoLibraryService.albums$.next(this.albums);
  }
}
