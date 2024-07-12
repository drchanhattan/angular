import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-photo-library',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './photo-library.component.html',
})
export class PhotoLibraryComponent {}
