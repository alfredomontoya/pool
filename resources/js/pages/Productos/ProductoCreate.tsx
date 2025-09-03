import BuscarItem from "@/components/Helpers/BuscarItem";
import FloatingCreateButton from "@/components/Productos/FloatingCreateButton";
import { Button } from "@/components/ui/button";
import { Categoria } from "@/interfaces/Categorias.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { ProductoCrear } from "@/interfaces/Productos.Interface";
import { Input } from "@/components/ui/input";

interface Props {
  categorias: Categoria[];
}

const ProductoCreate = ({ categorias }: Props) => {
  const { data, setData, post } = useForm<ProductoCrear>({
    nombre: "",
    descripcion: "",
    categoria_id: 0,
    codigo: "",
    stock_actual: 0,
    stock_minimo: 0,
    unidad_medida: "",
    activo: true,
  });

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>


        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Selección de categoría */}
        <div className="mb-4">
            <label className="block text-sm font-medium">Categoria</label>
          <BuscarItem<Categoria>
            items={categorias}
            labelKey="nombre"
            placeholder="Buscar categoría"
            selected={categoriaSeleccionada}
            onSelect={(categoria) => {
              setData("categoria_id", categoria.id);
              setCategoriaSeleccionada(categoria);
            }}
          />
          {/* <p className="text-sm text-gray-500 mt-1">
            {categoriaSeleccionada ? categoriaSeleccionada.nombre : "No hay categoría seleccionada"}
          </p> */}
        </div>


          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <Input
              type="text"
              value={data.nombre}
              onChange={(e) => setData("nombre", e.target.value)}
            />
          </div>

          {/* Código */}
          <div>
            <label className="block text-sm font-medium">Código</label>
            <Input
              type="text"
              value={data.codigo}
              onChange={(e) => setData("codigo", e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={data.descripcion}
              onChange={(e) => setData("descripcion", e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          {/* Stock Actual */}
          <div>
            <label className="block text-sm font-medium">Stock Actual</label>
            <Input
              type="number"
              value={data.stock_actual}
              onChange={(e) => setData("stock_actual", Number(e.target.value))}
            />
          </div>

          {/* Stock Mínimo */}
          <div>
            <label className="block text-sm font-medium">Stock Mínimo</label>
            <Input
              type="number"
              value={data.stock_minimo}
              onChange={(e) => setData("stock_minimo", Number(e.target.value))}
            />
          </div>

          {/* Unidad de Medida */}
          <div>
            <label className="block text-sm font-medium">Unidad de Medida</label>
            <Input
              type="text"
              value={data.unidad_medida}
              onChange={(e) => setData("unidad_medida", e.target.value)}
            />
          </div>

          {/* Activo */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.activo}
              onChange={(e) => setData("activo", e.target.checked)}
              id="activo"
            />
            <label htmlFor="activo" className="text-sm">Activo</label>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="mt-6">
          <Button
            onClick={() => post("/productos")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </Button>
        </div>

      </div>
    </AppLayout>
  );
};

export default ProductoCreate;
