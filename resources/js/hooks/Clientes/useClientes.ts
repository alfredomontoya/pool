import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

export interface Cliente {
  id: number;
  tipo: string;
  tipo_documento: string;
  numero_documento: string;
  nombre_razon_social: string;
  telefono: string;
  direccion: string;
  correo: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ClientesData {
  data: Cliente[];
  links: Link[];
}

export interface Filters {
  search: string;
  sort: string;
  direction: "asc" | "desc";
  page: number;
}

export function useClientes(initialClientes: ClientesData, initialFilters: Filters) {
  const { props } = usePage();

  // Estados para datos paginados y filtros
  const [clientes, setClientes] = useState<ClientesData>(initialClientes);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Cuando cambian los props de Inertia (tras hacer router.get), actualizamos la data
  useEffect(() => {
    if (props.clientes) {
      setClientes(props.clientes);
    }
    if (props.filters) {
      setFilters(prev => ({ ...prev, ...props.filters }));
    }
  }, [props.clientes, props.filters]);

  // Función que hace la petición con los filtros actuales (o pasados)
  const fetchClientes = (newFilters?: Partial<Filters>) => {
    const f = { ...filters, ...newFilters };
    setFilters(f);
    router.get(route("clientes.index"), f, { preserveState: true });
  };

  const handleSearchChange = (value: string) => {
    fetchClientes({ search: value, page: 1 }); // resetea página
  };

  const handleSort = (column: string) => {
    let direction: "asc" | "desc" = "asc";
    if (filters.sort === column) {
      direction = filters.direction === "asc" ? "desc" : "asc";
    }
    fetchClientes({ sort: column, direction, page: 1 });
  };

  const handlePageChange = (page: number) => {
    fetchClientes({ page });
  };

  return {
    clientes,
    filters,
    handleSearchChange,
    handleSort,
    handlePageChange,
  };
}
