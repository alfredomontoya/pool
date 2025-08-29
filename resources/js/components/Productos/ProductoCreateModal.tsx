import React, { useState, useEffect } from "react";
import { ProductoCrear } from "@/interfaces/Productos.Interface";
import { Categoria } from "@/interfaces/Categorias.Interface";
import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ProductoCreateModalProps {
  show: boolean;
  onClose: () => void;
  categorias: Categoria[];
  onSaved?: (msg: string) => void; // callback opcional al guardar
}

export default function ProductoCreateModal({
  show,
  onClose,
  categorias,
  onSaved,
}: ProductoCreateModalProps) {
  const [searchCategoria, setSearchCategoria] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  const [imagenPrincipalIndex, setImagenPrincipalIndex] = useState<number | null>(null);
  const [agregarPrecio, setAgregarPrecio] = useState(false);
  const [precioInicial, setPrecioInicial] = useState<{ precio_venta?: number; precio_compra?: number }>({});

  // Formulario con useForm
  const { data, setData, post, reset } = useForm<ProductoCrear & { imagenes?: File[]; precio?: any }>({
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

  // Generar previews de imágenes
  useEffect(() => {
    if (data.imagenes && data.imagenes.length > 0) {
      const previews = data.imagenes.map((file) => URL.createObjectURL(file));
      setPreview(previews);
      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    } else setPreview([]);
  }, [data.imagenes]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setData("imagenes", [...(data.imagenes || []), ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    // Agregar precio inicial temporalmente
    if (agregarPrecio) {
      setData("precio", {
        precio_venta: precioInicial.precio_venta ?? null,
        precio_compra: precioInicial.precio_compra ?? null,
        activo: true,
      });
    }

    // Enviar formulario
    post(route("productos.store"), {
      onSuccess: () => {
        reset();
        setPreview([]);
        setImagenPrincipalIndex(null);
        setAgregarPrecio(false);
        setPrecioInicial({});
        onClose();

        // Llamar callback onSaved si existe
        if (onSaved) {
          onSaved("Producto creado correctamente");
        }
      },
    });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      tabIndex={-1}
    >
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Crear Producto</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nombre"
            value={data.nombre}
            onChange={(e) => setData("nombre", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <textarea
            placeholder="Descripción"
            value={data.descripcion || ""}
            onChange={(e) => setData("descripcion", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Código"
            value={data.codigo || ""}
            onChange={(e) => setData("codigo", e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          {/* Select Categoría filtrable */}
          <div>
            <input
              type="text"
              placeholder="Buscar categoría..."
              value={searchCategoria}
              onChange={(e) => setSearchCategoria(e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
            />
            <select
              value={data.categoria_id}
              onChange={(e) => setData("categoria_id", Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              <option value={0}>Seleccionar categoría</option>
              {categorias
                .filter((c) =>
                  c.nombre.toLowerCase().includes(searchCategoria.toLowerCase())
                )
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Stock Actual"
              value={data.stock_actual}
              onChange={(e) => setData("stock_actual", Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Stock Mínimo"
              value={data.stock_minimo}
              onChange={(e) => setData("stock_minimo", Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <input
            type="text"
            placeholder="Unidad de medida (ej: kg, unid, lt)"
            value={data.unidad_medida}
            onChange={(e) => setData("unidad_medida", e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          {/* Carga de imágenes */}
          <div>
            <label className="block mb-2 font-medium">Imágenes</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg p-2"
            />
            <div className="flex gap-3 mt-3 flex-wrap">
              {preview.map((src, i) => (
                <div
                  key={i}
                  className={`relative border rounded-lg p-1 cursor-pointer ${
                    imagenPrincipalIndex === i ? "border-green-500" : ""
                  }`}
                  onClick={() => setImagenPrincipalIndex(i)}
                >
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  {imagenPrincipalIndex === i && (
                    <span className="absolute top-1 right-1 bg-green-600 text-white text-xs px-1 rounded">
                      Principal
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Precio opcional */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={agregarPrecio}
                onChange={(e) => setAgregarPrecio(e.target.checked)}
              />
              Agregar precio inicial
            </label>
            {agregarPrecio && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Precio Venta"
                  value={precioInicial.precio_venta ?? ""}
                  onChange={(e) =>
                    setPrecioInicial({ ...precioInicial, precio_venta: Number(e.target.value) })
                  }
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="number"
                  placeholder="Precio Compra"
                  value={precioInicial.precio_compra ?? ""}
                  onChange={(e) =>
                    setPrecioInicial({ ...precioInicial, precio_compra: Number(e.target.value) })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>
            )}
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
