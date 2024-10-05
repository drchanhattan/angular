import { Component, HostBinding } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { RedPandaComponent } from '../red-panda/red-panda.component';

type Link = {
  url: string;
  icon: string;
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconButtonComponent, RedPandaComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @HostBinding('class') hostClasses =
    'relative flex h-96 w-full flex-col overflow-x-hidden overflow-y-visible bg-mat-black';

  links: Link[] = [
    { url: 'https://www.linkedin.com/in/christopher-chan-941503a1/', icon: 'linkedin' },
    { url: 'https://github.com/drchanhattan/', icon: 'github' },
    { url: 'https://www.youtube.com/@drchanhattan/', icon: 'youtube' },
    { url: 'https://www.instagram.com/drchanhattan/', icon: 'instagram' },
  ];

  open(url: string) {
    window.open(url);
  }
}
