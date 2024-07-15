import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @HostBinding('class') hostClasses = 'flex !size-full';
  @Input() hero: string | undefined;
  isLoading = true;

  loaded() {
    this.isLoading = false;
  }
}
