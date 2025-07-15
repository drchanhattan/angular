import { Component } from '@angular/core';
import { PhotoAlbum } from '../../components/photo-library/photo-album';
import { PhotoLibraryComponent } from '../../components/photo-library/photo-library.component';

@Component({
  selector: 'app-south-america',
  imports: [PhotoLibraryComponent],
  templateUrl: './south-america.component.html',
})
export class SouthAmericaComponent {
  albums: PhotoAlbum[] = [
    {
      label: 'Argentina & Chile',
      icons: ['argentina', 'chile'],
      urls: [
        'photos/south-america/argentina-chile-1.jpg',
        'photos/south-america/argentina-chile-2.jpg',
        'photos/south-america/argentina-chile-3.jpg',
        'photos/south-america/argentina-chile-4.jpg',
        'photos/south-america/argentina-chile-5.jpg',
        'photos/south-america/argentina-chile-6.jpg',
        'photos/south-america/argentina-chile-7.jpg',
        'photos/south-america/argentina-chile-8.jpg',
        'photos/south-america/argentina-chile-9.jpg',
        'photos/south-america/argentina-chile-10.jpg',
      ],
    },
    {
      label: 'Bolivia',
      icons: ['bolivia'],
      urls: [
        'photos/south-america/bolivia-1.jpg',
        'photos/south-america/bolivia-2.jpg',
        'photos/south-america/bolivia-3.jpg',
        'photos/south-america/bolivia-4.jpg',
        'photos/south-america/bolivia-5.jpg',
        'photos/south-america/bolivia-6.jpg',
        'photos/south-america/bolivia-7.jpg',
        'photos/south-america/bolivia-8.jpg',
        'photos/south-america/bolivia-9.jpg',
        'photos/south-america/bolivia-10.jpg',
        'photos/south-america/bolivia-11.jpg',
        'photos/south-america/bolivia-12.jpg',
      ],
    },
    {
      label: 'Brazil',
      icons: ['brazil'],
      urls: [
        'photos/south-america/brazil-1.jpg',
        'photos/south-america/brazil-2.jpg',
        'photos/south-america/brazil-3.jpg',
        'photos/south-america/brazil-4.jpg',
        'photos/south-america/brazil-5.jpg',
        'photos/south-america/brazil-6.jpg',
        'photos/south-america/brazil-7.jpg',
        'photos/south-america/brazil-8.jpg',
        'photos/south-america/brazil-9.jpg',
      ],
    },
    {
      label: 'Peru',
      icons: ['peru'],
      urls: [
        'photos/south-america/peru-1.jpg',
        'photos/south-america/peru-2.jpg',
        'photos/south-america/peru-3.jpg',
        'photos/south-america/peru-4.jpg',
        'photos/south-america/peru-5.jpg',
        'photos/south-america/peru-6.jpg',
        'photos/south-america/peru-7.jpg',
        'photos/south-america/peru-8.jpg',
        'photos/south-america/peru-9.jpg',
        'photos/south-america/peru-10.jpg',
        'photos/south-america/peru-11.jpg',
        'photos/south-america/peru-12.jpg',
        'photos/south-america/peru-13.jpg',
        'photos/south-america/peru-14.jpg',
        'photos/south-america/peru-15.jpg',
        'photos/south-america/peru-16.jpg',
        'photos/south-america/peru-17.jpg',
        'photos/south-america/peru-18.jpg',
      ],
    },
  ];
}
