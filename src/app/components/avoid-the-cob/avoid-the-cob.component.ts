import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CanvasService } from './services/canvas-service';
import { FirebaseService } from './services/firebase.service';
import { GameService } from './services/game-service';
import { NameService } from './services/name-service';
import { ParticleService } from './services/particle-service';
import { TextService } from './services/text-service';

@Component({
  selector: 'app-avoid-the-cob',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatIconModule],
  templateUrl: './avoid-the-cob.component.html',
})
export class AvoidTheCobComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'flex size-full justify-center items-center text-nowrap font-ink bg-game-black';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  constructor(
    private router: Router,
    public canvasService: CanvasService,
    public gameService: GameService,
    public textService: TextService,
    public particleService: ParticleService,
    public firebaseService: FirebaseService,
    public nameService: NameService,
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

  exit() {
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
