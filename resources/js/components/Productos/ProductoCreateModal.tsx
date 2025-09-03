import { Categoria } from "@/interfaces/Categorias.Interface";
import { ProductoCrear } from "@/interfaces/Productos.Interface";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { TextInput } from "../Helpers/TextInput";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { SelectCategoria } from "../Helpers/SelectCategoria";
import { ImageGallery } from "../Helpers/ImageGallery";
import { Input } from "../ui/input";
import { Precio } from "./Precio";
import { Button } from "../ui/button";

interface ProductoCreateModalProps {
  show: boolean;
  onClose: () => void;
  categorias: Categoria[];
  onSaved?: (msg: string) => void;
}

export default function ProductoCreateModal({ show, onClose, categorias, onSaved }: ProductoCreateModalProps) {
  const [preview, setPreview] = useState<string[]>([]);
  const [imagenPrincipalIndex, setImagenPrincipalIndex] = useState<number | null>(null);
  const [agregarPrecio, setAgregarPrecio] = useState(false);
  const [precioInicial, setPrecioInicial] = useState<{ precio_venta?: number; precio_compra?: number }>({});

  const { data, setData, post, reset, errors } = useForm<ProductoCrear & { imagenes?: File[]; precio?: any }>({
    nombre: "",
    descripcion: "",
    categoria_id: 0,
    codigo: "",
    stock_actual: 0,
    stock_minimo: 0,
    unidad_medida: "",
    activo: true,
    imagenes: [],
  });

  // Generar previews
  useEffect(() => {
    if (data.imagenes && data.imagenes.length > 0) {
      const previews = data.imagenes.map((file) => URL.createObjectURL(file));
      setPreview(previews);
      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    } else setPreview([]);
  }, [data.imagenes]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setData("imagenes", [...(data.imagenes || []), ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    if (agregarPrecio) {
      setData("precio", { ...precioInicial, activo: true });
    }

    post(route("productos.store"), {
      onSuccess: () => {
        reset();
        setPreview([]);
        setImagenPrincipalIndex(null);
        setAgregarPrecio(false);
        setPrecioInicial({});
        onClose();
        if (onSaved) onSaved("Producto creado correctamente");
      },
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" tabIndex={-1}>
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Crear Producto</h2>

        <div className="space-y-3">
          <TextInput
            label="Nombre"
            placeholder="Nombre"
            value={data.nombre}
            onChange={(val) => setData("nombre", val)}
            error={errors.nombre}
            rule="Campo requerido, máximo 255 caracteres"
          />

          <div className="mb-4">
            <Label>Descripción</Label>
            <textarea
              placeholder="Descripción"
              value={data.descripcion || ""}
              onChange={(e) => setData("descripcion", e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <TextInput
            label="Código"
            placeholder="Código"
            value={data.codigo || ""}
            onChange={(val) => setData("codigo", val)}
            error={errors.codigo}
          />

          <SelectCategoria
            categorias={categorias}
            value={data.categoria_id}
            onChange={(id) => setData("categoria_id", id)}
            error={errors.categoria_id}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Stock Actual"
              type="number"
              value={data.stock_actual}
              onChange={(val) => setData("stock_actual", Number(val))}
              error={errors.stock_actual}
            />
            <TextInput
              label="Stock Mínimo"
              type="number"
              value={data.stock_minimo}
              onChange={(val) => setData("stock_minimo", Number(val))}
              error={errors.stock_minimo}
            />
          </div>

          <TextInput
            label="Unidad de medida"
            placeholder="Ej: kg, unid, lt"
            value={data.unidad_medida}
            onChange={(val) => setData("unidad_medida", val)}
            error={errors.unidad_medida}
          />

          {/* Imágenes */}
          <div className="mb-4">
            <Label>Imágenes</Label>
            <Input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full border rounded-lg p-2" />
            <ImageGallery
                files={data.imagenes || []}
                preview={preview}
                principalIndex={imagenPrincipalIndex}
                onSelectPrincipal={setImagenPrincipalIndex}
                onFilesChange={(newFiles) => setData("imagenes", newFiles)}
                />
          </div>

          {/* Precio opcional */}
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={agregarPrecio} onChange={(e) => setAgregarPrecio(e.target.checked)} />
              Agregar precio inicial
            </label>
            {agregarPrecio && <Precio precio={precioInicial} onChange={setPrecioInicial} />}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="default" onClick={handleSubmit}>Guardar</Button>
        </div>
      </div>
    </div>
  );
}
