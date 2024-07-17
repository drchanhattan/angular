import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import lozad from 'lozad';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'mb-20 flex !size-full flex-col items-center justify-center';
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[] }[];

  ngAfterViewInit() {
    this.lozad();
  }

  private lozad() {
    const observer = lozad();
    observer.observe();
  }
}
