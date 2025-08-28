import React from "react";
import { router } from "@inertiajs/react";
import { Producto } from "@/interfaces/Productos.Interface";
import { Button } from "../ui/button";

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (producto: Producto) => void;
  onDetail: (producto: Producto) => void;
}

const ProductoItemsTable: React.FC<Props> = ({ productos, onEdit, onDelete, onDetail }) => {
  if (productos.length === 0) {
    return <p className="text-center text-gray-500">No hay productos disponibles.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Nombre</th>
          <th className="border p-2">Precio</th>
          <th className="border p-2">Estado</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="border p-2 text-center">{producto.id}</td>
            <td className="border p-2">{producto.nombre}</td>
            <td className="border p-2 text-right">{producto.precio}</td>
            <td className="border p-2 text-center">{producto.activo ? "Activo" : "Inactivo"}</td>
            <td className="border p-2 flex space-x-2 justify-center">
              <Button size="sm" variant="default" onClick={() => onDetail(producto)}>
                Ver
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onEdit(producto)}>
                Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(producto)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductoItemsTable;
