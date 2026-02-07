import { CommonModule } from '@angular/common';
import { Component, HostBinding, input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { IconDirective } from '../../../utils/icon/icon.directive';
import { Album } from '../../gallery/album';
import { GalleryService } from '../../gallery/gallery.service';
import { NavType } from '../../toolbar/nav-type';
import { ToolbarService } from '../../toolbar/toolbar.service';

@Component({
  selector: 'app-photo-nav',
  imports: [CommonModule, IconDirective, RouterLink],
  templateUrl: './photo-nav.component.html',
})
export class PhotoNavComponent implements OnInit {
  @HostBinding('class') hostClasses = [
    // Layout
    'flex',
    'h-full',
    'flex-col',
    'items-center',
    'overflow-hidden',

    // Background
    'bg-mat-black',
  ].join(' ');

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
