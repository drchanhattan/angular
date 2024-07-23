import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-name-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-name-input.component.html',
})
export class PlayerNameInputComponent {
  @Input() control!: FormControl;
  @Input() length: number = 10;
  @Input() placeholder: string = '';
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();
}
