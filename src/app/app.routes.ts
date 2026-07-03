import { Routes } from '@angular/router';
import { CobGameComponent } from './pages/cob-game/cob-game.component';
import { ContinentComponent } from './pages/continent/continent.component';
import { CVComponent } from './pages/cv/cv.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'avoid-the-cob', component: CobGameComponent },
  { path: 'about', component: HomeComponent },
  { path: 'cv', component: CVComponent },
  { path: 'asia', component: ContinentComponent, children: [{ path: ':id', component: ContinentComponent }] },
  { path: 'europe', component: ContinentComponent, children: [{ path: ':id', component: ContinentComponent }] },
  { path: 'north-america', component: ContinentComponent, children: [{ path: ':id', component: ContinentComponent }] },
  { path: 'south-america', component: ContinentComponent, children: [{ path: ':id', component: ContinentComponent }] },
  { path: 'oceania', component: ContinentComponent, children: [{ path: ':id', component: ContinentComponent }] },
  { path: '**', redirectTo: '/avoid-the-cob', pathMatch: 'full' },
];
