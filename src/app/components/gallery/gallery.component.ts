import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import AOS from 'aos';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
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

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
