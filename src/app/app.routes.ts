import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Lab 1 – Angular' },
  { path: 'sobre', component: SobreComponent, title: 'Sobre | Lab 1 – Angular' },
  { path: '**', redirectTo: '' },
];
