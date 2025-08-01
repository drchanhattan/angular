import { Component } from '@angular/core';
import { Album } from '../../components/gallery/album';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-europe',
  imports: [GalleryComponent],
  templateUrl: './europe.component.html',
})
export class EuropeComponent {
  albums: Album[] = [
    {
      label: 'Austria',
      icons: ['austria'],
      urls: [
        'photos/europe/austria-1.jpg',
        'photos/europe/austria-2.jpg',
        'photos/europe/austria-3.jpg',
        'photos/europe/austria-4.jpg',
        'photos/europe/austria-5.jpg',
        'photos/europe/austria-6.jpg',
        'photos/europe/austria-7.jpg',
        'photos/europe/austria-8.jpg',
        'photos/europe/austria-9.jpg',
        'photos/europe/austria-10.jpg',
        'photos/europe/austria-11.jpg',
        'photos/europe/austria-12.jpg',
        'photos/europe/austria-13.jpg',
        'photos/europe/austria-14.jpg',
        'photos/europe/austria-15.jpg',
        'photos/europe/austria-16.jpg',
        'photos/europe/austria-17.jpg',
        'photos/europe/austria-18.jpg',
        'photos/europe/austria-19.jpg',
        'photos/europe/austria-20.jpg',
      ],
    },
    {
      label: 'Croatia',
      icons: ['croatia'],
      urls: [
        'photos/europe/croatia-1.jpg',
        'photos/europe/croatia-2.jpg',
        'photos/europe/croatia-3.jpg',
        'photos/europe/croatia-4.jpg',
        'photos/europe/croatia-5.jpg',
        'photos/europe/croatia-6.jpg',
        'photos/europe/croatia-7.jpg',
        'photos/europe/croatia-8.jpg',
        'photos/europe/croatia-9.jpg',
        'photos/europe/croatia-10.jpg',
      ],
    },
    {
      label: 'Czech Republic',
      icons: ['czech republic'],
      urls: [
        'photos/europe/czech-1.jpg',
        'photos/europe/czech-2.jpg',
        'photos/europe/czech-3.jpg',
        'photos/europe/czech-4.jpg',
        'photos/europe/czech-5.jpg',
        'photos/europe/czech-6.jpg',
        'photos/europe/czech-7.jpg',
        'photos/europe/czech-8.jpg',
        'photos/europe/czech-9.jpg',
        'photos/europe/czech-10.jpg',
        'photos/europe/czech-11.jpg',
        'photos/europe/czech-12.jpg',
        'photos/europe/czech-13.jpg',
        'photos/europe/czech-14.jpg',
        'photos/europe/czech-15.jpg',
        'photos/europe/czech-16.jpg',
        'photos/europe/czech-17.jpg',
        'photos/europe/czech-18.jpg',
        'photos/europe/czech-19.jpg',
        'photos/europe/czech-20.jpg',
        'photos/europe/czech-21.jpg',
        'photos/europe/czech-22.jpg',
        'photos/europe/czech-23.jpg',
        'photos/europe/czech-24.jpg',
        'photos/europe/czech-25.jpg',
        'photos/europe/czech-26.jpg',
        'photos/europe/czech-27.jpg',
        'photos/europe/czech-28.jpg',
        'photos/europe/czech-29.jpg',
        'photos/europe/czech-30.jpg',
        'photos/europe/czech-31.jpg',
        'photos/europe/czech-32.jpg',
        'photos/europe/czech-33.jpg',
        'photos/europe/czech-34.jpg',
        'photos/europe/czech-35.jpg',
      ],
    },
    {
      label: 'England',
      icons: ['england'],
      urls: [
        'photos/europe/england-1.jpg',
        'photos/europe/england-2.jpg',
        'photos/europe/england-3.jpg',
        'photos/europe/england-4.jpg',
        'photos/europe/england-5.jpg',
        'photos/europe/england-6.jpg',
        'photos/europe/england-7.jpg',
        'photos/europe/england-8.jpg',
        'photos/europe/england-9.jpg',
        'photos/europe/england-10.jpg',
        'photos/europe/england-11.jpg',
        'photos/europe/england-12.jpg',
        'photos/europe/england-13.jpg',
        'photos/europe/england-14.jpg',
        'photos/europe/england-15.jpg',
        'photos/europe/england-16.jpg',
        'photos/europe/england-17.jpg',
        'photos/europe/england-18.jpg',
        'photos/europe/england-19.jpg',
        'photos/europe/england-20.jpg',
        'photos/europe/england-21.jpg',
        'photos/europe/england-22.jpg',
      ],
    },
    {
      label: 'Germany',
      icons: ['germany'],
      urls: [
        'photos/europe/germany-1.jpg',
        'photos/europe/germany-2.jpg',
        'photos/europe/germany-3.jpg',
        'photos/europe/germany-4.jpg',
        'photos/europe/germany-5.jpg',
        'photos/europe/germany-6.jpg',
      ],
    },
    {
      label: 'Hungary',
      icons: ['hungary'],
      urls: [
        'photos/europe/hungary-1.jpg',
        'photos/europe/hungary-2.jpg',
        'photos/europe/hungary-3.jpg',
        'photos/europe/hungary-4.jpg',
        'photos/europe/hungary-5.jpg',
        'photos/europe/hungary-6.jpg',
      ],
    },
    {
      label: 'Italy',
      icons: ['italy'],
      urls: [
        'photos/europe/italy-1.jpg',
        'photos/europe/italy-2.jpg',
        'photos/europe/italy-3.jpg',
        'photos/europe/italy-4.jpg',
        'photos/europe/italy-5.jpg',
        'photos/europe/italy-6.jpg',
        'photos/europe/italy-7.jpg',
        'photos/europe/italy-8.jpg',
        'photos/europe/italy-9.jpg',
        'photos/europe/italy-10.jpg',
        'photos/europe/italy-11.jpg',
        'photos/europe/italy-12.jpg',
        'photos/europe/italy-13.jpg',
        'photos/europe/italy-14.jpg',
        'photos/europe/italy-15.jpg',
      ],
    },
    {
      label: 'Slovenia',
      icons: ['slovenia'],
      urls: [
        'photos/europe/slovenia-1.jpg',
        'photos/europe/slovenia-2.jpg',
        'photos/europe/slovenia-3.jpg',
        'photos/europe/slovenia-4.jpg',
        'photos/europe/slovenia-5.jpg',
        'photos/europe/slovenia-6.jpg',
      ],
    },
  ];
}
