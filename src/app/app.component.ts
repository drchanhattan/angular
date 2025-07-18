import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { GameHelpService } from './components/avoid-the-cob/components/game-help/game-help.service';
import { GameSettingsService } from './components/avoid-the-cob/components/game-settings/game-settings.service';
import { GameTextService } from './components/avoid-the-cob/components/game-text/game-text.service';
import { LeaderboardService } from './components/avoid-the-cob/components/leaderboard/leaderboard.service';
import { MainMenuService } from './components/avoid-the-cob/components/main-menu/main-menu.service';
import { PlayerNameService } from './components/avoid-the-cob/components/player-name/player-name.service';
import { AssetService } from './components/avoid-the-cob/services/asset.service';
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
import { GalleryService } from './components/gallery/gallery.service';
import { SvgIconRegistryModule } from './components/icon/svg-icon-registry.module';
import { LinkNavComponent } from './components/navigation/link-nav/link-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarService } from './components/toolbar/toolbar.service';

@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, LinkNavComponent, RouterOutlet, SvgIconRegistryModule, ToolbarComponent],
  templateUrl: './app.component.html',
  providers: [
    AssetService,
    AudioService,
    AvoidTheCobService,
    CanvasService,
    CheatService,
    CursorService,
    CollisionService,
    DeviceService,
    DifficultyService,
    FirebaseService,
    GalleryService,
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
    ToolbarService,
  ],
})
export class AppComponent {
  constructor(public router: Router) {
    this.redirectToHash();
    this.animateOnScroll();
  }

  redirectToHash() {
    if (!window.location.hash) {
      window.location.href = '/#' + window.location.pathname;
    }
  }

  private animateOnScroll() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        AOS.init();
      }
    };
  }
}
