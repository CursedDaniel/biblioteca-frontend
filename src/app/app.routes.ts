import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./features/usuarios/usuarios')
        .then(m => m.Usuarios)
  },
  {
    path: 'autores',
    loadComponent: () =>
      import('./features/autores/autores')
        .then(m => m.Autores)
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./features/categorias/categorias')
        .then(m => m.Categorias)
  },
  {
    path: 'editoriales',
    loadComponent: () =>
      import('./features/editoriales/editoriales')
        .then(m => m.Editoriales)
  },
  {
    path: 'ejemplares',
    loadComponent: () =>
      import('./features/ejemplares/ejemplares')
        .then(m => m.Ejemplares)
  },
  {
    path: 'libros',
    loadComponent: () =>
      import('./features/libros/libros')
        .then(m => m.Libros)
  },
  {
    path: 'prestamos',
    loadComponent: () =>
      import('./features/prestamos/prestamos')
        .then(m => m.Prestamos)
  },
  {
    path: 'multas',
    loadComponent: () =>
      import('./features/multas/multas')
        .then(m => m.Multas)
  },
  {
    path: '**',
    redirectTo: 'usuarios'
  }

];
  console.log('RUTAS CARGADAS:', routes.map(r => r.path));