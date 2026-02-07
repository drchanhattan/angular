import { Component, HostBinding } from '@angular/core';
import { IconDirective } from '../../utils/icon/icon.directive';
import { RedPandaComponent } from '../red-panda/red-panda.component';

type Link = {
  url: string;
  icon: string;
};

@Component({
  selector: 'app-footer',
  imports: [IconDirective, RedPandaComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @HostBinding('class') hostClasses = [
    // Layout
    'relative',
    'flex',
    'h-fit',
    'w-full',
    'flex-col',
    'items-center',
    'justify-center',

    // Border
    'border-t-2',
    'border-mat-white',

    // Background
    'bg-mat-black',
  ].join(' ');

  panda = false;

  year = new Date().getFullYear();

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
