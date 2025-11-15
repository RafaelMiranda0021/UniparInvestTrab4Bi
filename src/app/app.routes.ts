import { Routes } from '@angular/router';
import { Inicio } from './layout/inicio/inicio';
import { Tickers } from './pages/tickers/tickers';
import { ConfiguracaoComponent } from './pages/configuracao/configuracao';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UsuariosComponent } from './pages/usuarios/usuarios'; // <-- ADICIONAR

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: Inicio,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'tickers', component: Tickers },
      { path: 'configuracao', component: ConfiguracaoComponent },
      { path: 'usuarios', component: UsuariosComponent }, // <-- ADICIONAR
    ]
  },
  { path: '**', redirectTo: 'inicio' },

];
