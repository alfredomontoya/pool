import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CreateModal from '@/components/Categorias/CreateModal';
import EditModal from '@/components/Categorias/EditModal';
import ConfirmModal from '@/components/ConfirmModal';
import Toast from '@/components/Toast';
import ItemsTable from '@/components/Categorias/ItemsTable';
import Search from '@/components/Categorias/Search';

interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

interface Props {
  categorias: {
    data: Categoria[];
    meta: any;
  };
  filters: {
    search?: string;
    sort?: string;
    direction?: string;
  };
}

interface BreadcrumbItem {
  title: string;
  href: string;
}

const Index: React.FC<Props> = ({ categorias, filters }) => {
  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);

  const [showCreate, setShowCreate] = useState(false);
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Categoria | null>(null);

  const handleDelete = (categoria: Categoria) => {
    router.delete(`/categorias/${categoria.id}`, {
      onSuccess: () => setToastMessage(`Categoría '${categoria.nombre}' eliminada correctamente.`)
    });
    setConfirmDelete(null);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Categorias", href: "/categorias" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <button
          onClick={() => setShowCreate(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Nueva Categoría
        </button>

        <Search initialSearch={filters.search} />

        <ItemsTable
          categorias={categorias.data}
          filters={filters}
          onEdit={setEditCategoria}
          onDelete={setConfirmDelete}
        />

        {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
        {editCategoria && <EditModal categoria={editCategoria} onClose={() => setEditCategoria(null)} />}
        {confirmDelete && (
          <ConfirmModal
            categoria={confirmDelete}
            onConfirm={() => handleDelete(confirmDelete)}
            onClose={() => setConfirmDelete(null)}
          />
        )}
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </div>
    </AppLayout>
  );
};

export default Index;
