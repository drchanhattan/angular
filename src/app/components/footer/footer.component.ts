import { Component, HostBinding } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { Icon } from '../icon/icon';
import { RedPandaComponent } from '../red-panda/red-panda.component';

type Link = {
  url: string;
  icon: Icon;
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconButtonComponent, RedPandaComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @HostBinding('class') hostClasses =
    'relative flex h-fit w-full flex-col items-center justify-center border-t-2 border-mat-white bg-mat-black';

  showPanda = false;
  links: Link[] = [
    { url: 'https://www.linkedin.com/in/christopher-chan-941503a1/', icon: { svgIcon: 'linkedin' } },
    { url: 'https://github.com/drchanhattan/', icon: { svgIcon: 'github' } },
    { url: 'https://www.youtube.com/@drchanhattan/', icon: { svgIcon: 'youtube' } },
    { url: 'https://www.instagram.com/drchanhattan/', icon: { svgIcon: 'instagram' } },
  ];

  open(url: string) {
    window.open(url);
  }
}
