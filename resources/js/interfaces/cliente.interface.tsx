export interface Cliente {
  id: number;
  user_id: number;
  tipo_documento: string;
  tipo: string;
  numero_documento: string;
  nombre_razon_social: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: string;
  notas: string;
  created_at: string;
  updated_at: string;
}

export type ClienteCrear = Omit<
  Cliente,
  "id" | "user_id" | "created_at" | "updated_at"
>;
