import { Component } from '@angular/core';
import { PhotoAlbum } from '../../components/photo-library/photo-album';
import { PhotoLibraryComponent } from '../../components/photo-library/photo-library.component';

@Component({
  selector: 'app-asia',
  imports: [PhotoLibraryComponent],
  templateUrl: './asia.component.html',
})
export class AsiaComponent {
  albums: PhotoAlbum[] = [
    {
      label: 'Cambodia',
      icons: ['cambodia'],
      urls: [
        'cambodia-1.jpg',
        'cambodia-2.jpg',
        'cambodia-3.jpg',
        'cambodia-4.jpg',
        'cambodia-5.jpg',
        'cambodia-6.jpg',
        'cambodia-7.jpg',
        'cambodia-8.jpg',
      ],
    },
    {
      label: 'Hong Kong',
      icons: ['hong kong'],
      urls: [
        'hong-kong-1.jpg',
        'hong-kong-2.jpg',
        'hong-kong-3.jpg',
        'hong-kong-4.jpg',
        'hong-kong-5.jpg',
        'hong-kong-6.jpg',
        'hong-kong-7.jpg',
        'hong-kong-8.jpg',
        'hong-kong-9.jpg',
        'hong-kong-10.jpg',
        'hong-kong-11.jpg',
        'hong-kong-12.jpg',
      ],
    },
    {
      label: 'Laos & Vietnam',
      icons: ['laos', 'vietnam'],
      urls: [
        'laos-vietnam-1.jpg',
        'laos-vietnam-2.jpg',
        'laos-vietnam-3.jpg',
        'laos-vietnam-4.jpg',
        'laos-vietnam-5.jpg',
        'laos-vietnam-6.jpg',
        'laos-vietnam-7.jpg',
        'laos-vietnam-8.jpg',
        'laos-vietnam-9.jpg',
        'laos-vietnam-10.jpg',
        'laos-vietnam-11.jpg',
        'laos-vietnam-12.jpg',
        'laos-vietnam-13.jpg',
      ],
    },
    {
      label: 'Malaysia & Singapore',
      icons: ['malaysia', 'singapore'],
      urls: [
        'malaysia-singapore-1.jpg',
        'malaysia-singapore-2.jpg',
        'malaysia-singapore-3.jpg',
        'malaysia-singapore-4.jpg',
        'malaysia-singapore-5.jpg',
      ],
    },
    {
      label: 'Thailand',
      icons: ['thailand'],
      urls: [
        'thailand-1.jpg',
        'thailand-2.jpg',
        'thailand-3.jpg',
        'thailand-4.jpg',
        'thailand-5.jpg',
        'thailand-6.jpg',
        'thailand-7.jpg',
        'thailand-8.jpg',
        'thailand-9.jpg',
      ],
    },
  ];
}
