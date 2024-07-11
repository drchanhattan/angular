import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GameService } from './components/game/game-service';
import { GameComponent } from './components/game/game.component';
import { CanvasService } from './components/game/game/canvas-service';
import { GameCursor } from './components/game/game/game-cursor';
import { TextService } from './components/game/game/text-service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink, GameComponent],
  providers: [GameService, CanvasService, GameCursor, TextService, GameService],
})
export class AppComponent {
  title = 'website';
  icons = ['corn'];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.registerIcons();
  }

  public registerIcons() {
    this.icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`/${icon}.svg`));
    });
  }
}
