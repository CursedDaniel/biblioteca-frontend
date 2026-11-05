
export const ENTITIES = {
  usuarios: {
    label: 'Usuarios',
    endpoint: 'usuarios',
    idField: 'id_usuario',
    route: 'usuarios'
  },

  autores: {
    label: 'Autores',
    endpoint: 'autores',
    idField: 'id_autor',
    route: 'autores'
  },

  categorias: {
    label: 'Categorías',
    endpoint: 'categorias',
    idField: 'id_categoria',
    route: 'categorias'
  },

  editoriales: {
    label: 'Editoriales',
    endpoint: 'editoriales',
    idField: 'id_editorial',
    route: 'editoriales'
  },

  ejemplares: {
    label: 'Ejemplares',
    endpoint: 'ejemplares',
    idField: 'id_ejemplar',
    route: 'ejemplares'
  },

  libros: {
    label: 'Libros',
    endpoint: 'libros',
    idField: 'id_libro',
    route: 'libros'
  },

  prestamos: {
    label: 'Préstamos',
    endpoint: 'prestamos',
    idField: 'id_prestamo',
    route: 'prestamos'
  },

  multas: {
    label: 'Multas',
    endpoint: 'multas',
    idField: 'id_multa',
    route: 'multas'
  }
} as const;

export type EntityKey = keyof typeof ENTITIES;
