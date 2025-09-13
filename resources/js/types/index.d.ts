import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

import "@inertiajs/core";
declare module "@inertiajs/core" {
  interface PageProps {
    flash: {
      success?: string;
      error?: string;
      producto_id?: number;
    };
    auth?: {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    };
  }
}

// src/types.d.ts
// VENTAS
export interface Venta {
  id: number
  user_id: number
  tipo_pago_id: number
  cliente_id?: number | null
  total: number
  efectivo?: number | null
  cambio?: number | null
  estado: 'pendiente' | 'completado' | 'anulado'
  created_at?: string
  updated_at?: string
  user?: { id: number; name: string }
  tipoPago?: { id: number; nombre: string }
  detalles?: [] // luego lo defines mejor si quieres
}

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface Paginated<T> {
  data: T[]
  links: PaginationLink[]
}

// TIPOS DE PAGO
export interface TipoPago {
  id: number
  nombre: string
  activo: boolean
}
