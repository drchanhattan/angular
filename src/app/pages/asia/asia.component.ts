import { Component, HostBinding } from '@angular/core';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-asia',
  standalone: true,
  templateUrl: './asia.component.html',
  imports: [GalleryComponent],
})
export class AsiaComponent {
  @HostBinding('class') hostClasses = '';
}
