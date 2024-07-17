import { Component, HostBinding } from '@angular/core';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-asia',
  standalone: true,
  templateUrl: './asia.component.html',
  imports: [GalleryComponent],
})
export class AsiaComponent {
  @HostBinding('class') hostClasses = '!size-full';

  photos: { header: string; urls: string[] }[] = [
    {
      header: 'Cambodia',
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
      header: 'Laos and Vietnam',
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
      header: 'Malaysia and Singapore',
      urls: [
        'malaysia-singapore-1.jpg',
        'malaysia-singapore-2.jpg',
        'malaysia-singapore-3.jpg',
        'malaysia-singapore-4.jpg',
        'malaysia-singapore-5.jpg',
      ],
    },
  ];
}
