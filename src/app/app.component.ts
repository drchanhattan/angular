import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { GameTextService } from './components/avoid-the-cob/components/game-text/game-text-service';
import { MainMenuService } from './components/avoid-the-cob/components/main-menu/main-menu-service';
import { FirebaseService } from './components/avoid-the-cob/components/scoreboard/firebase.service';
import { CanvasService } from './components/avoid-the-cob/services/canvas-service';
import { CursorService } from './components/avoid-the-cob/services/cursor.service';
import { GameService } from './components/avoid-the-cob/services/game-service';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { GameComponent } from './pages/game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    GameComponent,
    SideNavComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    IconButtonComponent,
  ],
  templateUrl: './app.component.html',
  providers: [CanvasService, CursorService, FirebaseService, GameService, GameTextService, MainMenuService],
})
export class AppComponent {
  @HostBinding('class') hostClasses = '!size-full';

  constructor() {
    // this.registerIcons();
    this.animateOnScroll();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    location.reload();
  }

  private registerIcons() {
    // const svgIcons = [];
    // svgIcons.forEach((icon) => {
    //   this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`/${icon}.svg`));
    // });
  }

  private animateOnScroll() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        AOS.init();
      }
    };
  }
}
