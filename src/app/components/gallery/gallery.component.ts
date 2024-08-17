import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import AOS from 'aos';
import { ToolbarService } from '../toolbar/toolbar-service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center overflow-hidden bg-mat-black';
  @Input() name!: string;
  @Input() hero?: string;
  @Input() photos?: { header: string; urls: string[]; icons: string[] }[];

  constructor(private toolbarService: ToolbarService) {}

  ngOnInit() {
    this.toolbarService.header = this.name;
  }

  ngOnDestroy() {
    this.toolbarService.header = '';
  }

  animate() {
    AOS.refresh();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
