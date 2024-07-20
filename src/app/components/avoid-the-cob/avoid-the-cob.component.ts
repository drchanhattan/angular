import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GameTextService } from './game-text/game-text-service';
import { GameTextComponent } from './game-text/game-text.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlayerNameService } from './player-name/player-name-service';
import { PlayerNameComponent } from './player-name/player-name.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CanvasService } from './services/canvas-service';
import { GameService } from './services/game-service';
import { ParticleService } from './services/particle-service';

@Component({
  selector: 'app-avoid-the-cob',
  standalone: true,
  imports: [
    CommonModule,
    GameTextComponent,
    MainMenuComponent,
    MatIconModule,
    PlayerNameComponent,
    RouterLink,
    ScoreboardComponent,
  ],
  templateUrl: './avoid-the-cob.component.html',
})
export class AvoidTheCobComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'flex size-full justify-center items-center text-nowrap font-ink bg-game-black';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    public canvasService: CanvasService,
    public gameService: GameService,
    public nameService: PlayerNameService,
    public particleService: ParticleService,
    public textService: GameTextService,
  ) {}

  ngAfterViewInit() {
    this.canvasService.setup(this.canvasEle);
    this.animate();
  }

  animate() {
    const context = this.canvasService.context;
    const canvas = this.canvasService.canvasEle.nativeElement;

    const animateFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.draw();
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }

  draw() {
    this.gameService.draw();
    this.particleService.draw(this.canvasService.context);
    this.particleService.decay();
  }
}
