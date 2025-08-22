import React from 'react';
import { router } from '@inertiajs/react';

interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

interface Props {
  categorias: Categoria[];
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

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('nombre')}>Nombre</th>
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('descripcion')}>Descripción</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map(cat => (
          <tr key={cat.id} className="border-t">
            <td className="px-4 py-2">{cat.nombre}</td>
            <td className="px-4 py-2">{cat.descripcion}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => onEdit(cat)} className="px-2 py-1 bg-green-500 text-white rounded">Editar</button>
              <button onClick={() => onDelete(cat)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemsTable;
