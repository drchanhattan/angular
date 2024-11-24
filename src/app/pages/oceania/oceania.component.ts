import { Component } from '@angular/core';
import { PhotoAlbum } from '../../components/photo-library/photo-album';
import { PhotoLibraryComponent } from '../../components/photo-library/photo-library.component';

@Component({
    selector: 'app-oceania',
    imports: [PhotoLibraryComponent],
    templateUrl: './oceania.component.html'
})
export class OceaniaComponent {
  albums: PhotoAlbum[] = [
    {
      label: 'Australia',
      icons: ['australia'],
      urls: [
        'australia-1.jpg',
        'australia-2.jpg',
        'australia-3.jpg',
        'australia-4.jpg',
        'australia-5.jpg',
        'australia-6.jpg',
        'australia-7.jpg',
        'australia-8.jpg',
        'australia-9.jpg',
        'australia-10.jpg',
        'australia-11.jpg',
      ],
    },
    {
      label: 'Fiji',
      icons: ['fiji'],
      urls: ['fiji-1.jpg', 'fiji-2.jpg', 'fiji-3.jpg', 'fiji-4.jpg'],
    },
    {
      label: 'Hobbiton',
      icons: ['hobbiton'],
      urls: ['hobbiton-1.jpg', 'hobbiton-2.jpg', 'hobbiton-3.jpg', 'hobbiton-4.jpg', 'hobbiton-5.jpg'],
    },
    {
      label: 'New Zealand',
      icons: ['new zealand'],
      urls: [
        'new-zealand-1.jpg',
        'new-zealand-2.jpg',
        'new-zealand-3.jpg',
        'new-zealand-4.jpg',
        'new-zealand-5.jpg',
        'new-zealand-6.jpg',
        'new-zealand-7.jpg',
        'new-zealand-8.jpg',
        'new-zealand-9.jpg',
        'new-zealand-10.jpg',
        'new-zealand-11.jpg',
        'new-zealand-12.jpg',
        'new-zealand-13.jpg',
        'new-zealand-14.jpg',
        'new-zealand-15.jpg',
        'new-zealand-16.jpg',
        'new-zealand-17.jpg',
        'new-zealand-18.jpg',
        'new-zealand-19.jpg',
        'new-zealand-20.jpg',
        'new-zealand-21.jpg',
        'new-zealand-22.jpg',
        'new-zealand-23.jpg',
        'new-zealand-24.jpg',
        'new-zealand-25.jpg',
        'new-zealand-26.jpg',
        'new-zealand-27.jpg',
        'new-zealand-28.jpg',
        'new-zealand-29.jpg',
        'new-zealand-30.jpg',
      ],
    },
  ];
}
