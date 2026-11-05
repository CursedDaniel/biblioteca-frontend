import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'usuarios', renderMode: RenderMode.Server },
  { path: 'autores', renderMode: RenderMode.Server },
  { path: 'categorias', renderMode: RenderMode.Server },
  { path: 'editoriales', renderMode: RenderMode.Server },
  { path: 'ejemplares', renderMode: RenderMode.Server },
  { path: 'libros', renderMode: RenderMode.Server },
  { path: 'prestamos', renderMode: RenderMode.Server },
  { path: 'multas', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server }
];