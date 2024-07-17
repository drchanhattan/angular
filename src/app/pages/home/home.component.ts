import { Component, HostBinding } from '@angular/core';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [GalleryComponent],
})
export class HomeComponent {
  @HostBinding('class') hostClasses = '!size-full';
}
