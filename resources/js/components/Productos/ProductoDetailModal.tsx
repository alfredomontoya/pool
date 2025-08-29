import React, { useState } from "react";
import { Producto } from "@/interfaces/Productos.Interface";
import { Button } from "../ui/button";
import ZoomImageModal from "../helpers/ZoomImageModal";

interface DetailModalProps {
  producto: Producto | null;
  onClose: () => void;
}

const ProductoDetailModal: React.FC<DetailModalProps> = ({ producto, onClose }) => {
  const [showZoom, setShowZoom] = useState(false);
  if (!producto) return null;

  const imageSrc = producto.imagen_principal?.imagen?.startsWith("http")
    ? producto.imagen_principal?.imagen
    : `/storage/${producto.imagen_principal?.imagen ?? "images/default-product.png"}`;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Detalle del Producto</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Información completa del producto seleccionado.
          </p>

          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={imageSrc}
                alt={producto.nombre}
                className="w-40 h-40 object-cover rounded cursor-pointer hover:opacity-90 transition"
                onClick={() => setShowZoom(true)}
              />
            </div>

            <div><span className="font-semibold">ID:</span> {producto.id}</div>
            <div><span className="font-semibold">Nombre:</span> {producto.nombre}</div>
            {producto.descripcion && <div><span className="font-semibold">Descripción:</span> {producto.descripcion}</div>}
            <div><span className="font-semibold">Precio:</span> {producto.precio_activo?.precio_venta}</div>
            <div><span className="font-semibold">Creado:</span> {producto.created_at ? new Date(producto.created_at).toLocaleString() : "—"}</div>
            <div><span className="font-semibold">Actualizado:</span> {producto.updated_at ? new Date(producto.updated_at).toLocaleString() : "—"}</div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </div>

      <ZoomImageModal open={showZoom} onOpenChange={setShowZoom} src={imageSrc} alt={producto.nombre} />
    </>
  );
};

export default ProductoDetailModal;
