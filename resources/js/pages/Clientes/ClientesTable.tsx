import React from "react";
import { Link, router } from "@inertiajs/react";
import { Cliente } from "@/interfaces/cliente.interface";
interface Props {
  clientes: Cliente[];
  onSelect: (cliente: Cliente) => void;
}

export default function ClientesTable({ clientes, onSelect }: Props) {
  return (
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
        {clientes.map((cliente) => (
          <tr key={cliente.id} onClick={() => onSelect(cliente)} className="cursor-pointer hover:bg-gray-100">
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
  );
}
