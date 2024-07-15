import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex !size-full';
  @Input() hero: string | undefined;
}
