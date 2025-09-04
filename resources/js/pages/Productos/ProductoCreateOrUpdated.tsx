import BuscarItem from "@/components/Helpers/BuscarItem";
import { Categoria } from "@/interfaces/Categorias.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Producto, ProductoCrear } from "@/interfaces/Productos.Interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextInput } from "@/components/Helpers/TextInput";
import { TextArea } from "@/components/Helpers/TextArea";
import { Label } from "@/components/ui/label";
import Toast from "@/components/Toast";
import axios from "axios";

interface Props {
  producto: Producto | null;
  categorias: Categoria[];
  onSaved?: (msg: string) => void;
}

const ProductoCreate = ({ categorias, onSaved, producto }: Props) => {
  const { data, setData, reset, errors } = useForm<ProductoCrear>({
    id: producto?.id || null,
    nombre: producto?.nombre || "",
    descripcion: producto?.descripcion || "",
    categoria_id: producto?.categoria_id || 0,
    codigo: producto?.codigo || "",
    stock_actual: producto?.stock_actual || 0,
    stock_minimo: producto?.stock_minimo || 0,
    unidad_medida: producto?.unidad_medida || "",
    activo: producto?.activo ?? true,
  });

  console.log(producto);
  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(producto?.categoria || null);

  const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

  // ----------------------
  // Submit con Axios
  // ----------------------
  const handleSubmit = () => {
    const isEditing = Boolean(producto?.id);
    const url = isEditing
        ? route("productos.update", producto?.id)
        : route("productos.store");

    const method = isEditing ? "put" : "post";

    console.log(isEditing, url, method, data);


    axios[method](url, data)
        .then((res) => {
        setToastMessage(res.data.success);
        setData("id", res.data.producto_id);

        // Reset de formulario y categoría
        setCategoriaSeleccionada(null);

        // Callback al padre
        onSaved?.(res.data.success);
        })
        .catch((err) => {
        if (err.response?.status === 422) {
            // errores de validación
            console.log(err.response.data.errors);
        } else {
            // otros errores
            console.log('otro tipo de error');
            console.error(err);
        }
        });
    };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          {producto?.id ? "Editar" : "Crear"} Producto <span className="text--secondary">{producto?.id && `#${producto.id}`}</span>
        </h1>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Selección de categoría */}
          <div className="mb-4">
            <Label className="block text-sm font-medium">Categoria</Label>
            <BuscarItem<Categoria>
              items={categorias}
              labelKey="nombre"
              placeholder="Buscar categoría"
              selected={categoriaSeleccionada}
              onSelect={(categoria) => {
                setData("categoria_id", categoria.id);
                setCategoriaSeleccionada(categoria);
              }}
              error={errors.categoria_id}
            />
          </div>

          {/* Nombre */}
          <div>
            <TextInput
              label="Nombre"
              type="text"
              placeholder="Nombre del producto"
              value={data.nombre}
              onChange={(val) => setData("nombre", val)}
              error={errors.nombre}
            />
          </div>

          {/* Código */}
          <div>
            <TextInput
              label="Código"
              type="text"
              placeholder="Código del producto"
              value={data.codigo}
              onChange={(val) => setData("codigo", val)}
              error={errors.codigo}
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 lg:col-span-3">
            <TextArea
              label="Descripción"
              value={data.descripcion}
              placeholder="Descripción del producto"
              onChange={(val) => setData("descripcion", val)}
              error={errors.descripcion}
            />
          </div>

          {/* Stock Actual */}
          <div>
            <TextInput
              label="Stock Actual"
              type="number"
              value={data.stock_actual}
              onChange={(val) => setData("stock_actual", Number(val))}
              error={errors.stock_actual}
            />
          </div>

          {/* Stock Mínimo */}
          <div>
            <TextInput
              label="Stock Mínimo"
              type="number"
              value={data.stock_minimo}
              onChange={(val) => setData("stock_minimo", Number(val))}
              error={errors.stock_minimo}
            />
          </div>

          {/* Unidad de Medida */}
          <div>
            <TextInput
              label="Unidad de Medida"
              type="text"
              placeholder="Ej: kg, unid, lt"
              value={data.unidad_medida}
              onChange={(val) => setData("unidad_medida", val)}
              error={errors.unidad_medida}
            />
          </div>

          {/* Activo */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="activo"
              name="activo"
              checked={data.activo}
              onClick={() => setData("activo", !data.activo)}
            />
            <label htmlFor="activo" className="text-sm">Activo</label>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="mt-6">
          <Button variant="default" onClick={handleSubmit}>Guardar</Button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </AppLayout>
  );
};

export default ProductoCreate;
