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
        'photos/asia/cambodia-1.jpg',
        'photos/asia/cambodia-2.jpg',
        'photos/asia/cambodia-3.jpg',
        'photos/asia/cambodia-4.jpg',
        'photos/asia/cambodia-5.jpg',
        'photos/asia/cambodia-6.jpg',
        'photos/asia/cambodia-7.jpg',
        'photos/asia/cambodia-8.jpg',
      ],
    },
    {
      label: 'Hong Kong',
      icons: ['hong kong'],
      urls: [
        'photos/asia/hong-kong-1.jpg',
        'photos/asia/hong-kong-2.jpg',
        'photos/asia/hong-kong-3.jpg',
        'photos/asia/hong-kong-4.jpg',
        'photos/asia/hong-kong-5.jpg',
        'photos/asia/hong-kong-6.jpg',
        'photos/asia/hong-kong-7.jpg',
        'photos/asia/hong-kong-8.jpg',
        'photos/asia/hong-kong-9.jpg',
        'photos/asia/hong-kong-10.jpg',
        'photos/asia/hong-kong-11.jpg',
        'photos/asia/hong-kong-12.jpg',
      ],
    },
    {
      label: 'Laos & Vietnam',
      icons: ['laos', 'vietnam'],
      urls: [
        'photos/asia/laos-vietnam-1.jpg',
        'photos/asia/laos-vietnam-2.jpg',
        'photos/asia/laos-vietnam-3.jpg',
        'photos/asia/laos-vietnam-4.jpg',
        'photos/asia/laos-vietnam-5.jpg',
        'photos/asia/laos-vietnam-6.jpg',
        'photos/asia/laos-vietnam-7.jpg',
        'photos/asia/laos-vietnam-8.jpg',
        'photos/asia/laos-vietnam-9.jpg',
        'photos/asia/laos-vietnam-10.jpg',
        'photos/asia/laos-vietnam-11.jpg',
        'photos/asia/laos-vietnam-12.jpg',
        'photos/asia/laos-vietnam-13.jpg',
      ],
    },
    {
      label: 'Malaysia & Singapore',
      icons: ['malaysia', 'singapore'],
      urls: [
        'photos/asia/malaysia-singapore-1.jpg',
        'photos/asia/malaysia-singapore-2.jpg',
        'photos/asia/malaysia-singapore-3.jpg',
        'photos/asia/malaysia-singapore-4.jpg',
        'photos/asia/malaysia-singapore-5.jpg',
      ],
    },
    {
      label: 'Thailand',
      icons: ['thailand'],
      urls: [
        'photos/asia/thailand-1.jpg',
        'photos/asia/thailand-2.jpg',
        'photos/asia/thailand-3.jpg',
        'photos/asia/thailand-4.jpg',
        'photos/asia/thailand-5.jpg',
        'photos/asia/thailand-6.jpg',
        'photos/asia/thailand-7.jpg',
        'photos/asia/thailand-8.jpg',
        'photos/asia/thailand-9.jpg',
      ],
    },
  ];
}
