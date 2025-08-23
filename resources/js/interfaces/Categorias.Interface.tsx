export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string; // opcional
  imagen?: string; // opcional
}

export interface PaginatedCategorias {
  data: Categoria[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}
