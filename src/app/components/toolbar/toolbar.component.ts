import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  constructor() {}
}
