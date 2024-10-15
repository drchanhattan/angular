import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { GameHelpService } from './components/avoid-the-cob/components/game-help/game-help.service';
import { GameSettingsService } from './components/avoid-the-cob/components/game-settings/game-settings.service';
import { GameTextService } from './components/avoid-the-cob/components/game-text/game-text.service';
import { LeaderboardService } from './components/avoid-the-cob/components/leaderboard/leaderboard.service';
import { MainMenuService } from './components/avoid-the-cob/components/main-menu/main-menu.service';
import { PlayerNameService } from './components/avoid-the-cob/components/player-name/player-name.service';
import { AudioService } from './components/avoid-the-cob/services/audio.service';
import { AvoidTheCobService } from './components/avoid-the-cob/services/avoid-the-cob.service';
import { CanvasService } from './components/avoid-the-cob/services/canvas.service';
import { CheatService } from './components/avoid-the-cob/services/cheat.service';
import { CollisionService } from './components/avoid-the-cob/services/collision.service';
import { CursorService } from './components/avoid-the-cob/services/cursor.service';
import { DeviceService } from './components/avoid-the-cob/services/device.service';
import { DifficultyService } from './components/avoid-the-cob/services/difficulty.service';
import { FirebaseService } from './components/avoid-the-cob/services/firebase.service';
import { GameObjectService } from './components/avoid-the-cob/services/game-object.service';
import { GameStateService } from './components/avoid-the-cob/services/game-state.service';
import { OverlayService } from './components/avoid-the-cob/services/overlay.service';
import { ParticleService } from './components/avoid-the-cob/services/particle.service';
import { PowerUpService } from './components/avoid-the-cob/services/power-up.service';
import { ScoreService } from './components/avoid-the-cob/services/score.service';
import { SvgLoaderService } from './components/avoid-the-cob/services/svg-loader.service';
import { CountryPickerService } from './components/country-picker/country-picker.service';
import { Icons } from './components/icon/icons';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSidenavModule, NavigationComponent, RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  providers: [
    AudioService,
    AvoidTheCobService,
    CanvasService,
    CheatService,
    CursorService,
    CollisionService,
    CountryPickerService,
    DeviceService,
    DifficultyService,
    FirebaseService,
    GameHelpService,
    GameObjectService,
    GameSettingsService,
    GameStateService,
    GameTextService,
    LeaderboardService,
    MainMenuService,
    OverlayService,
    ParticleService,
    PlayerNameService,
    PowerUpService,
    ScoreService,
    SvgLoaderService,
  ],
})
export class AppComponent {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    public countryPickerService: CountryPickerService,
    public router: Router,
  ) {
    this.redirectToHash();
    this.registerIcons();
    this.animateOnScroll();
  }

  redirectToHash() {
    if (!window.location.hash) {
      window.location.href = '/#' + window.location.pathname;
    }
  }

  private registerIcons() {
    Icons.forEach((icon) => {
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
