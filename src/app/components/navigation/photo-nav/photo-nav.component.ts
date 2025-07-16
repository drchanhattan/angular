import { CommonModule } from '@angular/common';
import { Component, HostBinding, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { Album } from '../../gallery/album';
import { GalleryService } from '../../gallery/gallery.service';
import { NavType } from '../../toolbar/nav-type';
import { ToolbarService } from '../../toolbar/toolbar.service';

@Component({
  selector: 'app-photo-nav',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './photo-nav.component.html',
})
export class PhotoNavComponent implements OnInit {
  @HostBinding('class') hostClasses = 'flex h-full flex-col items-center overflow-hidden bg-mat-black';
  sidenav = input.required<MatSidenav>();
  albums = input.required<Album[]>();

  constructor(
    public galleryService: GalleryService,
    private toolbarService: ToolbarService,
  ) {}

  ngOnInit() {
    this.toolbarService.setNav(this.sidenav(), NavType.Photos);
    this.galleryService.albums$.next(this.albums());
  }
}
