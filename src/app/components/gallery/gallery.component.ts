import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center overflow-hidden';
  @Input() name?: string;
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[] }[];

  animate() {
    AOS.refresh();
  }
}
