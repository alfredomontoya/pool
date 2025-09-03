import BuscarItem from "@/components/Helpers/BuscarItem";
import FloatingCreateButton from "@/components/Productos/FloatingCreateButton";
import { Button } from "@/components/ui/button";
import { Categoria } from "@/interfaces/Categorias.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

interface Props {
  categorias: Categoria[];
}

const ProductoCreate = ({ categorias }: Props) => {
  const { data, setData, post } = useForm<{
    nombre: string;
    categoria_id: number | null;
  }>({
    nombre: "",
    categoria_id: null,
  });

  // Estado local solo para mostrar la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">



        <h1>Crear Producto</h1>

        <BuscarItem<Categoria>
        items={categorias}
        labelKey="nombre"
        placeholder="Buscar categoría"
        selected={categoriaSeleccionada}
        onSelect={(categoria) => {
          setData("categoria_id", categoria.id); // 👈 esto va al backend
          setCategoriaSeleccionada(categoria);   // 👈 solo para mostrar en el input
        }}
        />
        <p>{categoriaSeleccionada ? categoriaSeleccionada.nombre : "No hay categoría seleccionada"}</p>

        {/* Formulario para crear un nuevo producto */}
        <div className="mt-4">
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={data.nombre}
          onChange={(e) => setData("nombre", e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        </div>

        <Button
        onClick={() => post("/productos")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-1"
        >
          Guardar
        </Button>
      </div>

    </AppLayout>
  );
};

export default ProductoCreate;
