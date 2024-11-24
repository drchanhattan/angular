import { Component } from '@angular/core';
import { PhotoAlbum } from '../../components/photo-library/photo-album';
import { PhotoLibraryComponent } from '../../components/photo-library/photo-library.component';

@Component({
    selector: 'app-north-america',
    imports: [PhotoLibraryComponent],
    templateUrl: './north-america.component.html'
})
export class NorthAmericaComponent {
  albums: PhotoAlbum[] = [
    {
      label: 'Canada',
      icons: ['canada'],
      urls: [
        'canada-1.jpg',
        'canada-2.jpg',
        'canada-3.jpg',
        'canada-4.jpg',
        'canada-5.jpg',
        'canada-6.jpg',
        'canada-7.jpg',
        'canada-8.jpg',
        'canada-9.jpg',
        'canada-10.jpg',
        'canada-11.jpg',
        'canada-12.jpg',
        'canada-13.jpg',
        'canada-14.jpg',
        'canada-15.jpg',
        'canada-16.jpg',
        'canada-17.jpg',
        'canada-18.jpg',
        'canada-19.jpg',
        'canada-20.jpg',
        'canada-21.jpg',
        'canada-22.jpg',
        'canada-23.jpg',
      ],
    },
    {
      label: 'Guatemala & Costa Rica',
      icons: ['guatemala', 'costa rica'],
      urls: [
        'guatemala-costa-rica-1.jpg',
        'guatemala-costa-rica-2.jpg',
        'guatemala-costa-rica-3.jpg',
        'guatemala-costa-rica-4.jpg',
        'guatemala-costa-rica-5.jpg',
        'guatemala-costa-rica-6.jpg',
      ],
    },
    {
      label: 'Mexico',
      icons: ['mexico'],
      urls: [
        'mexico-1.jpg',
        'mexico-2.jpg',
        'mexico-3.jpg',
        'mexico-4.jpg',
        'mexico-5.jpg',
        'mexico-6.jpg',
        'mexico-7.jpg',
        'mexico-8.jpg',
        'mexico-9.jpg',
        'mexico-10.jpg',
        'mexico-11.jpg',
        'mexico-12.jpg',
      ],
    },
    {
      label: 'United States',
      icons: ['usa'],
      urls: [
        'usa-1.jpg',
        'usa-2.jpg',
        'usa-3.jpg',
        'usa-4.jpg',
        'usa-5.jpg',
        'usa-6.jpg',
        'usa-7.jpg',
        'usa-8.jpg',
        'usa-9.jpg',
        'usa-10.jpg',
        'usa-11.jpg',
        'usa-12.jpg',
        'usa-13.jpg',
        'usa-14.jpg',
        'usa-15.jpg',
        'usa-16.jpg',
        'usa-17.jpg',
        'usa-18.jpg',
        'usa-19.jpg',
        'usa-20.jpg',
        'usa-21.jpg',
        'usa-22.jpg',
        'usa-23.jpg',
        'usa-24.jpg',
        'usa-25.jpg',
        'usa-26.jpg',
        'usa-27.jpg',
        'usa-28.jpg',
        'usa-29.jpg',
        'usa-30.jpg',
        'usa-31.jpg',
        'usa-32.jpg',
        'usa-33.jpg',
        'usa-34.jpg',
        'usa-35.jpg',
        'usa-36.jpg',
        'usa-37.jpg',
        'usa-38.jpg',
      ],
    },
  ];
}
