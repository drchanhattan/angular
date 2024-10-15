import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center bg-mat-yellow text-mat-black';

  techStack = [
    { icon: 'angular', label: 'Angular' },
    { icon: 'typescript', label: 'Typescript' },
    { icon: 'html', label: 'HTML' },
    { icon: 'sass', label: 'SCSS' },
    { icon: 'javascript', label: 'Javascript' },
    { icon: 'tailwind', label: 'Tailwind' },
    { icon: 'material', label: 'Material' },
    { icon: 'git', label: 'Git' },
    { icon: 'rxjs', label: 'RXJS' },
    { icon: 'storybook', label: 'Storybook' },
    { icon: 'npm', label: 'NPM' },
    { icon: 'vs-code', label: 'Visual Studio' },
    { icon: 'webstorm', label: 'Webstorm' },
    { icon: 'jira', label: 'Jira' },
    { icon: 'teams', label: 'Teams' },
    { icon: 'slack', label: 'Slack' },
    { icon: 'c-sharp', label: 'C#' },
    { icon: 'selenium', label: 'Selenium' },
  ];
}
