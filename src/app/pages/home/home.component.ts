import { Component, HostBinding } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, GalleryComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @HostBinding('class') hostClasses = 'flex';
}
