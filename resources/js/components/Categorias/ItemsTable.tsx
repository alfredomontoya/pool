import React from "react";
import { router } from "@inertiajs/react";
import Pagination from "@/components/Pagination";
import { Categoria, PaginatedCategorias } from "@/interfaces/Categorias.Interface";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  categorias: PaginatedCategorias;
  filters: {
    sort?: string;
    direction?: string;
  };
  onEdit: (categoria: Categoria) => void;
  onDelete: (categoria: Categoria) => void;
}

const ItemsTable: React.FC<Props> = ({ categorias, filters, onEdit, onDelete }) => {

  const handleSort = (field: string) => {
    const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
    router.get('/categorias', { sort: field, direction }, { preserveState: true });
  };

  const renderSortIcon = (field: string) => {
    if (filters.sort !== field) return null;
    return filters.direction === 'asc' ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-default">
          <tr>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("id")}>
              ID {renderSortIcon("id")}
            </th>
            <th className="px-4 py-2 border">Imagen</th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("nombre")}>
              Nombre {renderSortIcon("nombre")}
            </th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("descripcion")}>
              Descripción {renderSortIcon("descripcion")}
            </th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias?.data?.length ? (
            categorias.data.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2">
                  {cat.imagen ? (
                    <img
                      src={cat.imagen?.startsWith('http') ? cat.imagen : `/storage/${cat.imagen}`}
                      alt={cat.nombre}
                      className="w-12 h-12 object-cover rounded"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={`/images/default-category.png`}
                      alt={cat.nombre}
                      className="w-12 h-12 object-cover rounded"
                      loading="lazy"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{cat.nombre}</td>
                <td className="px-4 py-2">{cat.descripcion}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button
                    onClick={() => onEdit(cat)}
                    variant={"warning"}
                    className="px-2 py-1"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onDelete(cat)}
                    variant={"destructive"}
                    className="px-2 py-1"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                No hay categorías disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <Pagination links={categorias?.links ?? []} />
    </div>
  );
};

export default ItemsTable;
