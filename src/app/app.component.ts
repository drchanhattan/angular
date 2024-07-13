import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { GameCursor } from './components/game/models/game-object/game-cursor';
import { CanvasService } from './components/game/services/canvas-service';
import { GameService } from './components/game/services/game-service';
import { TextService } from './components/game/services/text-service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink, GameComponent],
  providers: [CanvasService, GameCursor, GameService, TextService],
})
export class AppComponent {
  svgIcons = ['corn', 'corn-mono'];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.registerIcons();
  }

  public registerIcons() {
    this.svgIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`/${icon}.svg`));
    });
  }
}
