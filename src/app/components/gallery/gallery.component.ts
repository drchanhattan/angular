import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import AOS from 'aos';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center';
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[] }[];

  heroLoaded: boolean = false;

  animate() {
    AOS.refresh();
  }
}
