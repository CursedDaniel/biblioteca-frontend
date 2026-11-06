import { Routes } from '@angular/router';
import { ENTITY_LIST } from './core/config/entities.config';

export const routes: Routes = [
  { path: '', redirectTo: ENTITY_LIST[0].route, pathMatch: 'full' },
  ...ENTITY_LIST.map(e => ({
    path: e.route,
    data: { entity: e.route },
    loadComponent: () =>
      import('./features/entity-page/entity-page').then(m => m.EntityPage),
  })),
  { path: '**', redirectTo: ENTITY_LIST[0].route },
];