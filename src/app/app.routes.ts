import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { PhotoLibraryComponent } from './components/photo-library/photo-library.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: PhotoLibraryComponent },
  { path: 'game', component: GameComponent },
];
