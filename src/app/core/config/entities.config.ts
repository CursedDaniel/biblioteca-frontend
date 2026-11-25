export type FieldType = 'text' | 'number' | 'date' | 'email' | 'select' | 'checkbox';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hideInTable?: boolean;
  lookup?: { endpoint: string; valueKey: string; labelKey: string };
}

export interface EntityConfig {
  label: string;
  endpoint: string;
  idField: string;
  route: string;
  icon: string;
  fields: FieldConfig[];
}

export const ENTITIES: Record<string, EntityConfig> = {
  usuarios: { label: 'Usuarios', endpoint: 'usuarios', idField: 'id_usuario', route: 'usuarios', icon: '👤', fields: [
    { key: 'nombre',         label: 'Nombre',            type: 'text',  required: true },
    { key: 'apellido',       label: 'Apellido',          type: 'text',  required: true },
    { key: 'documento',      label: 'Cédula',            type: 'text',  required: true },
    { key: 'correo',         label: 'Correo',            type: 'email', required: true },
    { key: 'telefono',       label: 'Teléfono',          type: 'text',  required: true },
    { key: 'fecha_registro', label: 'Fecha de registro', type: 'date',  required: true },
    { key: 'estado',         label: 'Estado',            type: 'text',  required: true },
  ] },
  autores: { label: 'Autores', endpoint: 'autores', idField: 'id_autor', route: 'autores', icon: '✒️', fields: [
    { key: 'nombre',           label: 'Nombre',           type: 'text', required: true },
    { key: 'apellido',         label: 'Apellido',         type: 'text', required: true },
    { key: 'fecha_nacimiento', label: 'Fecha de nacimiento', type: 'date', required: true },
    { key: 'nacionalidad',     label: 'Nacionalidad',     type: 'text', required: true },
    { key: 'biografia',        label: 'Biografía',        type: 'text', required: true, hideInTable: true },
  ] },
  categorias: { label: 'Categorías', endpoint: 'categorias', idField: 'id_categoria', route: 'categorias', icon: '🏷️', fields: [
    { key: 'nombre',      label: 'Nombre',      type: 'text', required: true },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true },
  ] },
  editoriales: { label: 'Editoriales', endpoint: 'editoriales', idField: 'id_editorial', route: 'editoriales', icon: '🏢', fields: [
    { key: 'nombre',   label: 'Nombre',   type: 'text',  required: true },
    { key: 'pais',     label: 'País',     type: 'text',  required: true },
    { key: 'ciudad',   label: 'Ciudad',   type: 'text',  required: true },
    { key: 'correo',   label: 'Correo',   type: 'email', required: true },
    { key: 'telefono', label: 'Teléfono', type: 'text',  required: true },
  ] },
  ejemplares: { label: 'Ejemplares', endpoint: 'ejemplares', idField: 'id_ejemplar', route: 'ejemplares', icon: '📖', fields: [
    { key: 'id_libro',          label: 'Libro', type: 'select', required: true,
      lookup: { endpoint: 'libros', valueKey: 'id_libro', labelKey: 'titulo' } },
    { key: 'codigo_inventario', label: 'Código de inventario', type: 'text', required: true },
    { key: 'fecha_adquisicion', label: 'Fecha de adquisición', type: 'date', required: true },
    { key: 'estado',            label: 'Estado',    type: 'text', required: true },
    { key: 'ubicacion',         label: 'Ubicación', type: 'text', required: true },
  ] },
  libros: { label: 'Libros', endpoint: 'libros', idField: 'id_libro', route: 'libros', icon: '📚', fields: [
    { key: 'titulo',            label: 'Título',              type: 'text',   required: true },
    { key: 'fecha_publicacion', label: 'Fecha de publicación', type: 'date',   required: true },
    { key: 'numero_paginas',    label: 'Páginas',             type: 'number', required: true },
    { key: 'idiomas',           label: 'Idiomas',             type: 'text',   required: true },
    { key: 'descripcion',       label: 'Descripción',         type: 'text',   required: true, hideInTable: true },
    { key: 'id_categoria',      label: 'Categoría',           type: 'select', required: true,
      lookup: { endpoint: 'categorias', valueKey: 'id_categoria', labelKey: 'nombre' } },
    { key: 'id_editorial',      label: 'Editorial',           type: 'select', required: true,
      lookup: { endpoint: 'editoriales', valueKey: 'id_editorial', labelKey: 'nombre' } },
  ] },
  prestamos: { label: 'Préstamos', endpoint: 'prestamos', idField: 'id_prestamo', route: 'prestamos', icon: '🔄', fields: [
    { key: 'id_usuario',       label: 'Usuario',    type: 'select', required: true,
      lookup: { endpoint: 'usuarios', valueKey: 'id_usuario', labelKey: 'nombre' } },
    { key: 'id_ejemplar',      label: 'Ejemplar',   type: 'select', required: true,
      lookup: { endpoint: 'ejemplares', valueKey: 'id_ejemplar', labelKey: 'codigo_inventario' } },
    { key: 'fecha_prestamo',   label: 'Fecha de préstamo',   type: 'date', required: true },
    { key: 'fecha_limite',     label: 'Fecha límite',        type: 'date', required: true },
    { key: 'fecha_devolucion', label: 'Fecha de devolución', type: 'date', required: false },
    { key: 'estado',           label: 'Estado',     type: 'text', required: true },
  ] },
  multas: { label: 'Multas', endpoint: 'multas', idField: 'id_multa', route: 'multas', icon: '💲', fields: [
    { key: 'id_prestamo',      label: 'Préstamo',   type: 'select', required: true,
      lookup: { endpoint: 'prestamos', valueKey: 'id_prestamo', labelKey: 'fecha_prestamo' } },
    { key: 'id_ejemplar',      label: 'Ejemplar',   type: 'select', required: true,
      lookup: { endpoint: 'ejemplares', valueKey: 'id_ejemplar', labelKey: 'codigo_inventario' } },
    { key: 'fecha_prestamo',   label: 'Fecha de préstamo',   type: 'date', required: true },
    { key: 'fecha_limite',     label: 'Fecha límite',        type: 'date', required: true },
    { key: 'fecha_devolucion', label: 'Fecha de devolución', type: 'date', required: false },
    { key: 'estado',           label: 'Estado',     type: 'text', required: true },
  ] },
}; 

export const ENTITY_LIST = Object.values(ENTITIES);