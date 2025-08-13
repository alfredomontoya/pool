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
  estado: string | number;
  notas: string;
  created_at: string;
  updated_at: string;
}
