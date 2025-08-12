import { Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

interface Cliente {
  id: number;
  tipo_documento: string;
  numero_documento: string;
  nombre_razon_social: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface ClientesTableProps {
  data: Cliente[];
  sort: string;
  direction: string;
  onSort: (column: string) => void;
}

export default function ClientesTable({ data, sort, direction, onSort }: ClientesTableProps) {
  const SortIcon = ({ column }: { column: string }) => {
    if (sort !== column) return null;
    return direction === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 inline" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline" />
    );
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          {[
            { key: "id", label: "ID" },
            { key: "numero_documento", label: "Número documento" },
            { key: "nombre_razon_social", label: "Nombre/Razón Social" },
            { key: "email", label: "Email" },
            { key: "telefono", label: "Teléfono" },
            { key: "direccion", label: "Dirección" },
          ].map(({ key, label }) => (
            <th
              key={key}
              className="p-2 border cursor-pointer"
              onClick={() => onSort(key)}
            >
              {label} <SortIcon column={key} />
            </th>
          ))}
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cliente) => (
          <tr key={cliente.id}>
            <td className="p-2 border">{cliente.id}</td>
            <td className="p-2 border">
              {cliente.tipo_documento} {cliente.numero_documento}
            </td>
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
  );
}
