import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './photo-nav.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class PhotoNavComponent implements OnInit {
  protected readonly hostClasses = computed(() => [
    // Layout
    'flex',
    'h-full',
    'flex-col',
    'items-center',
    'overflow-hidden',

    // Background
    'bg-mat-black',
  ]);

  public readonly sidenav = input.required<MatSidenav>();
  public readonly albums = input.required<Album[]>();

  constructor(
    protected galleryService: GalleryService,
    private readonly toolbarService: ToolbarService,
  ) {}

  public ngOnInit() {
    this.toolbarService.setNav(this.sidenav(), NavType.Photos);
    this.galleryService.albums.set(this.albums());
  }
}
