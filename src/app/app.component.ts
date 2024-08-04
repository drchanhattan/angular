import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { GameSettingsService } from './components/avoid-the-cob/components/game-settings/game-settings-service';
import { GameTextService } from './components/avoid-the-cob/components/game-text/game-text-service';
import { LeaderboardService } from './components/avoid-the-cob/components/leaderboard/leaderboard-service';
import { MainMenuService } from './components/avoid-the-cob/components/main-menu/main-menu-service';
import { NewPlayerService } from './components/avoid-the-cob/components/new-player/new-player-service';
import { AudioService } from './components/avoid-the-cob/services/audio-service';
import { AvoidTheCobService } from './components/avoid-the-cob/services/avoid-the-cob-service';
import { CanvasService } from './components/avoid-the-cob/services/canvas-service';
import { CheatService } from './components/avoid-the-cob/services/cheat-service';
import { CollisionService } from './components/avoid-the-cob/services/collision-service';
import { CursorService } from './components/avoid-the-cob/services/cursor.service';
import { DeviceService } from './components/avoid-the-cob/services/device-service';
import { DifficultyService } from './components/avoid-the-cob/services/difficulty.service';
import { FirebaseService } from './components/avoid-the-cob/services/firebase.service';
import { GameObjectService } from './components/avoid-the-cob/services/game-object-service';
import { GameStateService } from './components/avoid-the-cob/services/game-state-service';
import { PowerUpService } from './components/avoid-the-cob/services/power-up-service';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { GameComponent } from './pages/game/game.component';
import { SvgLoaderService } from './components/avoid-the-cob/services/svg-loader-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent,
    IconButtonComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    SideNavComponent,
    ThemeSelectorComponent,
  ],
  templateUrl: './app.component.html',
  providers: [
    AudioService,
    AvoidTheCobService,
    CanvasService,
    CheatService,
    CursorService,
    CollisionService,
    DeviceService,
    DifficultyService,
    FirebaseService,
    GameObjectService,
    GameSettingsService,
    GameStateService,
    GameTextService,
    LeaderboardService,
    MainMenuService,
    NewPlayerService,
    PowerUpService,
    SvgLoaderService,
  ],
})
export class AppComponent {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    public router: Router,
  ) {
    this.registerIcons();
    this.animateOnScroll();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    location.reload();
  }

  private registerIcons() {
    const svgIcons = ['instagram', 'linkedin'];
    svgIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`/${icon}.svg`));
    });
  }

  private animateOnScroll() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        AOS.init();
      }
    };
  }
}
