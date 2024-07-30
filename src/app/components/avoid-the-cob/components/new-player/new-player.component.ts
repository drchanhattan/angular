import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { NewPlayerService } from './new-player-service';

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [CommonModule, GameButtonComponent, ReactiveFormsModule],
  templateUrl: './new-player.component.html',
})
export class NewPlayerComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center';
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Output() backClicked = new EventEmitter();
  @Output() nameEntered = new EventEmitter();

  constructor(
    private avoidTheCob: AvoidTheCobService,
    private mainMenuService: MainMenuService,
    public newPlayerService: NewPlayerService,
  ) {}

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  back() {
    this.newPlayerService.hide();
    this.mainMenuService.show();
  }

  enterName() {
    const name = this.newPlayerService.name;

    if (name.value && name.valid) {
      window.localStorage.setItem('name', name.value.toUpperCase());
      this.avoidTheCob.play();
    }
  }

  keyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enterName();
    }
  }
}
