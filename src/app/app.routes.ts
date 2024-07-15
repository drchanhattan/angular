import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: GalleryComponent },
  { path: 'game', component: GameComponent },
];
