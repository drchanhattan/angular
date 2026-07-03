import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { CONTINENT_DATA, ContinentData } from './continent-data';

@Component({
  selector: 'app-continent',
  imports: [GalleryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-gallery [name]="data.name" [hero]="data.hero" [albums]="data.albums"></app-gallery>
  `,
})
export class ContinentComponent {
  protected readonly data: ContinentData;

  constructor() {
    const route = inject(ActivatedRoute);
    const slug = route.snapshot.parent?.url[0]?.path ?? route.snapshot.url[0].path;
    this.data = CONTINENT_DATA[slug];
  }
}
