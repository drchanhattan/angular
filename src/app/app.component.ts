import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { GameCursor } from './components/game/models/game-object/game-cursor';
import { CanvasService } from './components/game/services/canvas-service';
import { GameService } from './components/game/services/game-service';
import { TextService } from './components/game/services/text-service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, GameComponent, ToolbarComponent],
  providers: [CanvasService, GameCursor, GameService, TextService],
})
export class AppComponent implements OnInit {
  currentRoute: string;
  svgIcons = ['corn', 'corn-mono'];

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.currentRoute = this.router.url;
    this.registerIcons();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    location.reload();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  private registerIcons() {
    this.svgIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`/${icon}.svg`));
    });
  }
}
