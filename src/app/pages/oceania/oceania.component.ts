import { Component } from '@angular/core';
import { PhotoAlbum } from '../../components/photo-library/photo-album';
import { PhotoLibraryComponent } from '../../components/photo-library/photo-library.component';

@Component({
  selector: 'app-oceania',
  imports: [PhotoLibraryComponent],
  templateUrl: './oceania.component.html',
})
export class OceaniaComponent {
  albums: PhotoAlbum[] = [
    {
      label: 'Australia',
      icons: ['australia'],
      urls: [
        'photos/oceania/australia-1.jpg',
        'photos/oceania/australia-2.jpg',
        'photos/oceania/australia-3.jpg',
        'photos/oceania/australia-4.jpg',
        'photos/oceania/australia-5.jpg',
        'photos/oceania/australia-6.jpg',
        'photos/oceania/australia-7.jpg',
        'photos/oceania/australia-8.jpg',
        'photos/oceania/australia-9.jpg',
        'photos/oceania/australia-10.jpg',
        'photos/oceania/australia-11.jpg',
      ],
    },
    {
      label: 'Fiji',
      icons: ['fiji'],
      urls: [
        'photos/oceania/fiji-1.jpg',
        'photos/oceania/fiji-2.jpg',
        'photos/oceania/fiji-3.jpg',
        'photos/oceania/fiji-4.jpg',
      ],
    },
    {
      label: 'Hobbiton',
      icons: ['hobbiton'],
      urls: [
        'photos/oceania/hobbiton-1.jpg',
        'photos/oceania/hobbiton-2.jpg',
        'photos/oceania/hobbiton-3.jpg',
        'photos/oceania/hobbiton-4.jpg',
        'photos/oceania/hobbiton-5.jpg',
      ],
    },
    {
      label: 'New Zealand',
      icons: ['new zealand'],
      urls: [
        'photos/oceania/new-zealand-1.jpg',
        'photos/oceania/new-zealand-2.jpg',
        'photos/oceania/new-zealand-3.jpg',
        'photos/oceania/new-zealand-4.jpg',
        'photos/oceania/new-zealand-5.jpg',
        'photos/oceania/new-zealand-6.jpg',
        'photos/oceania/new-zealand-7.jpg',
        'photos/oceania/new-zealand-8.jpg',
        'photos/oceania/new-zealand-9.jpg',
        'photos/oceania/new-zealand-10.jpg',
        'photos/oceania/new-zealand-11.jpg',
        'photos/oceania/new-zealand-12.jpg',
        'photos/oceania/new-zealand-13.jpg',
        'photos/oceania/new-zealand-14.jpg',
        'photos/oceania/new-zealand-15.jpg',
        'photos/oceania/new-zealand-16.jpg',
        'photos/oceania/new-zealand-17.jpg',
        'photos/oceania/new-zealand-18.jpg',
        'photos/oceania/new-zealand-19.jpg',
        'photos/oceania/new-zealand-20.jpg',
        'photos/oceania/new-zealand-21.jpg',
        'photos/oceania/new-zealand-22.jpg',
        'photos/oceania/new-zealand-23.jpg',
        'photos/oceania/new-zealand-24.jpg',
        'photos/oceania/new-zealand-25.jpg',
        'photos/oceania/new-zealand-26.jpg',
        'photos/oceania/new-zealand-27.jpg',
        'photos/oceania/new-zealand-28.jpg',
        'photos/oceania/new-zealand-29.jpg',
        'photos/oceania/new-zealand-30.jpg',
      ],
    },
  ];
}
