import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { AsiaComponent } from './pages/asia/asia.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'asia', component: AsiaComponent },
  { path: 'game', component: GameComponent },
];
