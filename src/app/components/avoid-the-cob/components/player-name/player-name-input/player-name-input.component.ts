import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-name-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-name-input.component.html',
})
export class PlayerNameInputComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center';

  @Input() control!: FormControl;
  @Input() length: number = 10;
  @Input() placeholder: string = '';
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();
}
