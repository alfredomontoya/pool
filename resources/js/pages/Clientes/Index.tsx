import React, { useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

interface Cliente {
  id: number;
  tipo_documento: string;
  tipo: string;
  numero_documento: string;
  nombre_razon_social: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface Props {
  clientes: {
    data: Cliente[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: { search: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];

export default function Index({ clientes, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route("clientes.index"), { search }, { preserveState: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Clientes</h1>

        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cliente..."
            className="border rounded px-3 py-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Buscar
          </button>
          <Link
            href={route("clientes.create")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Nuevo
          </Link>
        </form>

        {/* Tabla de clientes */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tipo de Documento</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Número de Documento</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.data.map((cliente) => (
              <tr key={cliente.id}>
                <td className="p-2 border">{cliente.id}</td>
                <td className="p-2 border">{cliente.tipo_documento}</td>
                <td className="p-2 border">{cliente.tipo}</td>
                <td className="p-2 border">{cliente.numero_documento}</td>
                <td className="p-2 border">{cliente.nombre_razon_social}</td>
                <td className="p-2 border">{cliente.email}</td>
                <td className="p-2 border">{cliente.telefono}</td>
                <td className="p-2 border">{cliente.direccion}</td>
                <td className="p-2 border space-x-2">
                  <Link
                    href={route("clientes.edit", cliente.id)}
                    className="text-blue-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() =>
                      router.delete(route("clientes.destroy", cliente.id))
                    }
                    className="text-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="mt-4 flex gap-2">
          {clientes.links.map((link, i) => (
            <button
              key={i}
              disabled={!link.url}
              onClick={() => link.url && router.get(link.url)}
              className={`px-3 py-1 border rounded ${
                link.active ? "bg-gray-300" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
