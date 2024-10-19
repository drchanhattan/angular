import { Component } from '@angular/core';
import { PhotoAlbum } from '../../components/photo-library/photo-album';
import { PhotoLibraryComponent } from '../../components/photo-library/photo-library.component';

@Component({
  selector: 'app-europe',
  standalone: true,
  imports: [PhotoLibraryComponent],
  templateUrl: './europe.component.html',
})
export class EuropeComponent {
  albums: PhotoAlbum[] = [
    {
      label: 'Austria',
      icons: ['austria'],
      urls: [
        'austria-1.jpg',
        'austria-2.jpg',
        'austria-3.jpg',
        'austria-4.jpg',
        'austria-5.jpg',
        'austria-6.jpg',
        'austria-7.jpg',
        'austria-8.jpg',
        'austria-9.jpg',
        'austria-10.jpg',
        'austria-11.jpg',
        'austria-12.jpg',
        'austria-13.jpg',
        'austria-14.jpg',
        'austria-15.jpg',
        'austria-16.jpg',
        'austria-17.jpg',
        'austria-18.jpg',
        'austria-19.jpg',
        'austria-20.jpg',
      ],
    },
    {
      label: 'Croatia',
      icons: ['croatia'],
      urls: [
        'croatia-1.jpg',
        'croatia-2.jpg',
        'croatia-3.jpg',
        'croatia-4.jpg',
        'croatia-5.jpg',
        'croatia-6.jpg',
        'croatia-7.jpg',
        'croatia-8.jpg',
        'croatia-9.jpg',
        'croatia-10.jpg',
      ],
    },
    {
      label: 'Czech Republic',
      icons: ['czech republic'],
      urls: [
        'czech-1.jpg',
        'czech-2.jpg',
        'czech-3.jpg',
        'czech-4.jpg',
        'czech-5.jpg',
        'czech-6.jpg',
        'czech-7.jpg',
        'czech-8.jpg',
        'czech-9.jpg',
        'czech-10.jpg',
        'czech-11.jpg',
        'czech-12.jpg',
        'czech-13.jpg',
        'czech-14.jpg',
        'czech-15.jpg',
        'czech-16.jpg',
        'czech-17.jpg',
        'czech-18.jpg',
        'czech-19.jpg',
        'czech-20.jpg',
        'czech-21.jpg',
        'czech-22.jpg',
        'czech-23.jpg',
        'czech-24.jpg',
        'czech-25.jpg',
        'czech-26.jpg',
        'czech-27.jpg',
        'czech-28.jpg',
        'czech-29.jpg',
        'czech-30.jpg',
        'czech-31.jpg',
        'czech-32.jpg',
        'czech-33.jpg',
        'czech-34.jpg',
        'czech-35.jpg',
      ],
    },
    {
      label: 'England',
      icons: ['england'],
      urls: [
        'england-1.jpg',
        'england-2.jpg',
        'england-3.jpg',
        'england-4.jpg',
        'england-5.jpg',
        'england-6.jpg',
        'england-7.jpg',
        'england-8.jpg',
        'england-9.jpg',
        'england-10.jpg',
        'england-11.jpg',
        'england-12.jpg',
        'england-13.jpg',
        'england-14.jpg',
        'england-15.jpg',
        'england-16.jpg',
        'england-17.jpg',
        'england-18.jpg',
        'england-19.jpg',
        'england-20.jpg',
        'england-21.jpg',
        'england-22.jpg',
      ],
    },
    {
      label: 'Germany',
      icons: ['germany'],
      urls: ['germany-1.jpg', 'germany-2.jpg', 'germany-3.jpg', 'germany-4.jpg', 'germany-5.jpg', 'germany-6.jpg'],
    },
    {
      label: 'Hungary',
      icons: ['hungary'],
      urls: ['hungary-1.jpg', 'hungary-2.jpg', 'hungary-3.jpg', 'hungary-4.jpg', 'hungary-5.jpg', 'hungary-6.jpg'],
    },
    {
      label: 'Italy',
      icons: ['italy'],
      urls: [
        'italy-1.jpg',
        'italy-2.jpg',
        'italy-3.jpg',
        'italy-4.jpg',
        'italy-5.jpg',
        'italy-6.jpg',
        'italy-7.jpg',
        'italy-8.jpg',
        'italy-9.jpg',
        'italy-10.jpg',
        'italy-11.jpg',
        'italy-12.jpg',
        'italy-13.jpg',
        'italy-14.jpg',
        'italy-15.jpg',
      ],
    },
    {
      label: 'Slovenia',
      icons: ['slovenia'],
      urls: [
        'slovenia-1.jpg',
        'slovenia-2.jpg',
        'slovenia-3.jpg',
        'slovenia-4.jpg',
        'slovenia-5.jpg',
        'slovenia-6.jpg',
      ],
    },
  ];
}
