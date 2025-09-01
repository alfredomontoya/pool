import React, { useState, useEffect } from "react";
import { Producto } from "@/interfaces/Productos.Interface";
import { Categoria } from "@/interfaces/Categorias.Interface";
import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ProductoEditModalProps {
  show: boolean;
  onClose: () => void;
  categorias: Categoria[];
  producto: Producto;
  onSaved?: (msg: string) => void;
}

export default function ProductoEditModal({
  show,
  onClose,
  categorias,
  producto,
  onSaved,
}: ProductoEditModalProps) {
  const [searchCategoria, setSearchCategoria] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  const [imagenPrincipalIndex, setImagenPrincipalIndex] = useState<number | null>(null);
  const [agregarPrecio, setAgregarPrecio] = useState(false);
  const [precioInicial, setPrecioInicial] = useState<{ precio_venta?: number; precio_compra?: number }>({});

  const { data, setData, post, patch, reset, errors } = useForm({
    nombre: producto.nombre,
    descripcion: producto.descripcion || "",
    categoria_id: producto.categoria_id,
    codigo: producto.codigo || "",
    stock_actual: producto.stock_actual,
    stock_minimo: producto.stock_minimo,
    unidad_medida: producto.unidad_medida,
    activo: producto.activo,
    imagenesFiles: [] as File[],
    precio: {
      precio_venta: producto.precio_activo?.precio_venta ?? undefined,
      precio_compra: producto.precio_activo?.precio_compra ?? undefined,
      activo: producto.precio_activo?.activo ?? undefined,
    },
  });

  // Previews de nuevas imágenes
  useEffect(() => {
    if (data.imagenesFiles && data.imagenesFiles.length > 0) {
      const previews = data.imagenesFiles.map((file) => URL.createObjectURL(file));
      setPreview(previews);
      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    } else setPreview([]);
  }, [data.imagenesFiles]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setData("imagenesFiles", [...(data.imagenesFiles || []), ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    if (agregarPrecio) {
      setData("precio", {
        precio_venta: precioInicial.precio_venta ?? data.precio.precio_venta,
        precio_compra: precioInicial.precio_compra ?? data.precio.precio_compra,
        activo: true,
      });
    }

    patch(route("productos.update", producto.id), {
      onSuccess: () => {
        reset();
        setPreview([]);
        setImagenPrincipalIndex(null);
        setAgregarPrecio(false);
        setPrecioInicial({});
        onClose();
        if (onSaved) onSaved("Producto actualizado correctamente");
      },
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>

        {/* Errores de validación */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
            {Object.entries(errors).map(([field, msg]) => (
              <p key={field}>{msg}</p>
            ))}
          </div>
        )}

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
            value={data.descripcion}
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

          {/* Select Categoría */}
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
                .filter((c) => c.nombre.toLowerCase().includes(searchCategoria.toLowerCase()))
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

          {/* Imágenes previas del producto */}
          {producto.imagenes && producto.imagenes.length > 0 && (
            <div>
              <p className="font-medium mb-1">Imágenes actuales:</p>
              <div className="flex gap-3 flex-wrap mb-3">
                {producto.imagenes.map((img, i) => {
                  const src = img.imagen.startsWith("http") ? img.imagen : `/storage/${img.imagen}`;
                  return (
                    <img
                      key={img.id}
                      src={src}
                      alt={`img-${i}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Previews de nuevas imágenes */}
          {preview.length > 0 && (
            <div>
              <p className="font-medium mb-1">Nuevas imágenes:</p>
              <div className="flex gap-3 flex-wrap mb-3">
                {preview.map((src, i) => (
                  <div
                    key={i}
                    className={`relative border rounded-lg p-1 cursor-pointer ${
                      imagenPrincipalIndex === i ? "border-green-500" : ""
                    }`}
                    onClick={() => setImagenPrincipalIndex(i)}
                  >
                    <img src={src} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded-lg" />
                    {imagenPrincipalIndex === i && (
                      <span className="absolute top-1 right-1 bg-green-600 text-white text-xs px-1 rounded">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subir nuevas imágenes */}
          <div>
            <label className="block mb-2 font-medium">Agregar imágenes</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Precio opcional */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={agregarPrecio}
                onChange={(e) => setAgregarPrecio(e.target.checked)}
              />
              Actualizar precio
            </label>
            {agregarPrecio && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Precio Venta"
                  value={precioInicial.precio_venta ?? data.precio.precio_venta ?? ""}
                  onChange={(e) =>
                    setPrecioInicial({ ...precioInicial, precio_venta: Number(e.target.value) })
                  }
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="number"
                  placeholder="Precio Compra"
                  value={precioInicial.precio_compra ?? data.precio.precio_compra ?? ""}
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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
