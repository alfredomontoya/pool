export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  activo?: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductoCrear = Omit<Producto, "id" | "created_at" | "updated_at">;

export interface PaginatedProductos {
  data: Producto[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}
