import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import CreateModal from "@/components/Categorias/CreateModal";
import EditModal from "@/components/Categorias/EditModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import ItemsTable from "@/components/Categorias/ItemsTable";
import Search from "@/components/Categorias/Search";
import { Categoria, PaginatedCategorias } from "@/interfaces/Categorias.Interface";
import { Button } from "@/components/ui/button";
import DetailModal from "@/components/Categorias/DetailModal";

interface Props {
  categorias: PaginatedCategorias;
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
  const [detailCategoria, setDetailCategoria] = useState<Categoria | null>(null);

  const handleDelete = (categoria: Categoria) => {
    router.delete(`/categorias/${categoria.id}`, {
      onSuccess: () =>
        setToastMessage(`Categoría '${categoria.nombre}' eliminada correctamente.`),
    });
    setConfirmDelete(null);
  };

  const handleSaved = (msg: string) => {
    setToastMessage(msg);
  };


  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Categorias", href: "/categorias" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        {/* Botón para crear nueva categoría */}
        <Button
          onClick={() => setShowCreate(true)}
          variant={"default"}
          className="mb-4"
        >
          Nueva Categoría
        </Button>

        {/* Componente de búsqueda */}
        <Search initialSearch={filters.search} />

        {/* Tabla de categorías */}
        <ItemsTable
          categorias={categorias}
          filters={filters}
          onEdit={setEditCategoria}
          onDelete={setConfirmDelete}
          onDetail={setDetailCategoria}
        />

        {/* Modales */}
        {showCreate &&
          <CreateModal
            onClose={() => setShowCreate(false)}
            onSaved={(msg: string) => handleSaved(msg)}
          />
        }

        {editCategoria && (
          <EditModal
            categoria={editCategoria}
            onClose={() => setEditCategoria(null)}
            onSaved={(msg: string) => handleSaved(msg)}
          />
        )}

        {detailCategoria && (
        <DetailModal
            categoria={detailCategoria}
            onClose={() => setDetailCategoria(null)}
        />
        )}

        {confirmDelete && (
          <ConfirmModal
            categoria={confirmDelete}
            onConfirm={() => handleDelete(confirmDelete)}
            onClose={() => setConfirmDelete(null)}
          />
        )}

        {/* Toast de confirmación */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
