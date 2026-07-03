import { Routes } from '@angular/router';
import { AsiaComponent } from './pages/asia/asia.component';
import { CobGameComponent } from './pages/cob-game/cob-game.component';
import { CVComponent } from './pages/cv/cv.component';
import { EuropeComponent } from './pages/europe/europe.component';
import { HomeComponent } from './pages/home/home.component';
import { NorthAmericaComponent } from './pages/north-america/north-america.component';
import { OceaniaComponent } from './pages/oceania/oceania.component';
import { SouthAmericaComponent } from './pages/south-america/south-america.component';

export const routes: Routes = [
  { path: 'avoid-the-cob', component: CobGameComponent },
  { path: 'about', component: HomeComponent },
  { path: 'cv', component: CVComponent },
  { path: 'europe', component: EuropeComponent, children: [{ path: ':id', component: EuropeComponent }] },
  {
    path: 'asia',
    component: AsiaComponent,
    children: [{ path: ':id', component: AsiaComponent }],
  },
  {
    path: 'north-america',
    component: NorthAmericaComponent,
    children: [{ path: ':id', component: NorthAmericaComponent }],
  },
  {
    path: 'south-america',
    component: SouthAmericaComponent,
    children: [{ path: ':id', component: SouthAmericaComponent }],
  },
  {
    path: 'oceania',
    component: OceaniaComponent,
    children: [{ path: ':id', component: OceaniaComponent }],
  },
  { path: '**', redirectTo: '/avoid-the-cob', pathMatch: 'full' },
];
