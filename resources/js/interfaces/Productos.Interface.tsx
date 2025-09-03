import { Categoria } from "./Categorias.Interface";

export interface Producto {
  id: number | null;
  nombre: string;
  descripcion?: string;
  categoria_id: number;
  codigo?: string;
  stock_actual: number;
  stock_minimo: number;
  unidad_medida: string;
  activo: boolean;

  // Relaciones
  imagenes?: ProductoImagen[];
  imagen_principal?: ProductoImagen; // alias de imagenPrincipal en Eloquent
  precios?: ProductoPrecio[];
  precio_activo?: ProductoPrecio; // alias de precioActivo en Eloquent
  categoria?: Categoria;
  user?: User;
  updated_by_user?: User; // alias de updatedBy

  created_at: string;
  updated_at: string;
}

/** Para creación (sin id, timestamps ni relaciones) */
export type ProductoCrear = Omit<
  Producto,
  | "created_at"
  | "updated_at"
  | "imagenes"
  | "imagen_principal"
  | "precios"
  | "precio_activo"
  | "categoria"
  | "user"
  | "updated_by_user"
>;

/** Paginación */
export interface PaginatedProductos {
  data: Producto[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}

/** Interfaces relacionadas */
export interface ProductoImagen {
  id: number;
  producto_id: number;
  imagen: string; // ruta o URL
  es_principal: boolean;
  user_id: number;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface ProductoPrecio {
  id: number;
  producto_id: number;
  precio_venta: number;
  precio_compra: number;
  activo: boolean;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  user_id: number;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
