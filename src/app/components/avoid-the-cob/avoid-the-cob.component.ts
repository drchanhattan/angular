import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { GameObject } from './game/game-object';
import { GameObjectBehaviour } from './game/game-object-behaviour';
import { Corn } from './corn';
import { Peas } from './peas';
import { Canvas } from './game/canvas';
import { Cursor } from './game/cursor';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avoid-the-cob',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './avoid-the-cob.component.html',
  styleUrls: ['./avoid-the-cob.component.scss'],
})
export class AvoidTheCobComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) public canvasEle!: ElementRef;

  public screenW = window.innerWidth;
  public screenH = window.innerHeight;
  public canvas = new Canvas();

  // General
  public lives = 0;
  public idle = true;
  public paused = false;
  public level!: number;

  // Modifiers
  public ghost = true;
  public invincible = false;

  // Game Objects
  public peas = new Peas();
  public corn = new Corn();

  // Particles
  private particleCount = 25;
  private particleSpd = 0.8;

  // Cursor
  private cursor = new Cursor();

  // Context
  private context!: CanvasRenderingContext2D;
  public message = { text: '', subText: '' };

  constructor(private change: ChangeDetectorRef) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    window.location.reload();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent): void {
    if (event.key === '1') {
      this.toggleInvincibility();
    }

    if (event.key === '2') {
      this.peas.objects.forEach((pea) =>
        pea.toggleBehaviour(GameObjectBehaviour.Follow),
      );
    }

    if (event.key === '3') {
      this.corn.objects.forEach((corn) =>
        corn.toggleBehaviour(GameObjectBehaviour.Repel),
      );
    }
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.cursor.track(this.context, this.canvas);
    this.canvas.particleDecay();
    this.animate();
  }

  setupCanvas(): void {
    this.context = this.canvasEle.nativeElement.getContext('2d');
    this.context.canvas.width = this.screenW;
    this.context.canvas.height = this.screenH;
    this.canvas.w = this.context.canvas.width;
    this.canvas.h = this.context.canvas.height;
  }

  animate(): void {
    setInterval(() => {
      // Clear previous frame
      this.context.clearRect(0, 0, this.canvas.w, this.canvas.h);
      // Draw new frame
      if (!this.idle) {
        this.cursor.draw(this.context);
      }
      this.drawCorn();
      this.drawPeas();
      this.canvas.drawParticles(this.context);
    }, 1);
  }

  public play(newGame: boolean): void {
    newGame ? this.resetDifficulty() : this.increaseDifficulty();
    this.change.detectChanges();
    this.corn.createNewCorn(newGame, this.cursor, this.canvas);
    this.peas.createNewPeas(this.canvas);
    this.paused = false;
    this.giveTemporaryImmunity(1500);
  }

  private pause(duration: number): void {
    this.paused = true;
    this.change.detectChanges();
    this.displayMessage(duration);
  }

  private LevelUp(): void {
    this.ghost = true;
    this.level = this.level + 1;
    this.message.text = 'Level ' + this.level;
    this.message.subText = this.level % 2 ? '' : '+ 1 life';
    this.pause(1000);

    setTimeout(() => {
      this.play(false);
    }, 2000);
  }

  private gameOver(): void {
    this.idle = true;
    this.message.text = 'Game Over';
    this.message.subText = 'You reached level ' + this.level;
    this.pause(3000);

    // Show buttons and cursor
    setTimeout(() => {
      this.displayButtons(false);
    }, 4000);
  }

  private resetDifficulty(): void {
    // Reset params back to default
    this.peas.count = 10;
    this.peas.size = 10;
    this.peas.speed = 0.8;

    this.corn.count = 30;
    this.corn.size = 20;
    this.corn.speed = 0.5;

    this.cursor.size = 10;

    this.lives = 3;
    this.level = 1;
    this.idle = false;
    this.message = { text: '', subText: '' };

    this.displayButtons(true);
  }

  private increaseDifficulty(): void {
    // Increase difficulty settings
    this.peas.count = 10;
    this.corn.count = this.corn.count * 1.1;
    this.peas.speed = this.peas.speed * 1.03;
    this.corn.speed = this.corn.speed * 1.01;

    this.peas.size = this.peas.size * 0.99;
    this.corn.size = this.corn.size * 0.99;
    this.cursor.size = this.cursor.size * 0.99;

    // Add additional life every 2 levels
    this.lives = this.level % 2 ? this.lives : this.lives + 1;
  }

  private drawCorn(): void {
    this.corn.objects.forEach((object) => {
      if (!object.destroyed) {
        // Draw a single Corn
        Canvas.drawObject(this.context, object);

        // Check for collision
        if (!this.paused) {
          this.canvas.wallCollision(object);
          this.cornCollision(object);
        } else {
          // Apply Gravity if objects are not alive
          object.applyForce(false, 2.5);
        }

        // Repel
        if (object.behaviourEquals(GameObjectBehaviour.Repel)) {
          object.follow(this.cursor, 10, this.canvas, 2, true);
        }

        object.move();
      }
    });
  }

  private drawPeas(): void {
    this.peas.objects.forEach((object) => {
      if (!object.destroyed) {
        // Draw a single Pea
        Canvas.drawObject(this.context, object);

        // Check for collision
        if (!this.paused) {
          this.canvas.wallCollision(object);
          this.peaCollision(object);
        } else {
          // Apply Gravity if objects are not alive
          object.applyForce(false, 2.5);
        }

        // Follow
        if (object.behaviourEquals(GameObjectBehaviour.Follow)) {
          object.follow(this.cursor, 30, this.canvas, 1);
        }

        object.move();
      }
    });
  }

  private peaCollision(pea: GameObject): void {
    if (pea.detectCollision(this.cursor)) {
      pea.destroyed = true;
      this.canvas.createParticles(pea, this.particleCount, this.particleSpd);
      this.peas.count = this.peas.count - 1;
      this.change.detectChanges();

      if (this.peas.count === 0) {
        this.LevelUp();
      }
    }
  }

  private cornCollision(corn: GameObject): void {
    if (!this.ghost && corn.detectCollision(this.cursor)) {
      corn.destroyed = true;
      this.canvas.createParticles(corn, this.particleCount, this.particleSpd);

      if (!this.invincible) {
        this.lives = this.lives - 1;
        this.change.detectChanges();
        this.flashColour('flash-red', 1000);
        this.giveTemporaryImmunity(500);
      }

      if (this.lives === 0) {
        this.gameOver();
      }
    }
  }

  private flashColour(className: string, duration: number): void {
    const canvasClass = this.canvasEle.nativeElement.classList;

    // Flash Colour
    canvasClass.add(className);

    // Remove Colour
    setTimeout(() => {
      canvasClass.remove(className);
    }, duration);
  }

  private toggleInvincibility(): void {
    this.cursor.history = [];
    this.cursor.trail = !this.cursor.trail;
    this.invincible = !this.invincible;
  }

  private giveTemporaryImmunity(duration: number): void {
    this.ghost = true;

    setTimeout(() => {
      this.ghost = false;
    }, duration);
  }

  private displayMessage(duration: number): void {
    const messageClass =
      document.getElementsByClassName('message')[0].classList;

    // Show Message
    messageClass.remove('hide');
    // Hide Message
    setTimeout(() => {
      messageClass.add('hide');
    }, duration);
  }

  private displayButtons(hide: boolean): void {
    const canvasClass = this.canvasEle.nativeElement.classList;
    const playButtonClass =
      document.getElementsByClassName('play-button')[0].classList;

    if (hide) {
      canvasClass.add('hide-cursor');
      playButtonClass.add('shrink');
    } else {
      canvasClass.remove('hide-cursor');
      playButtonClass.remove('shrink');
    }
  }
}
