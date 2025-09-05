import React, { useState, useEffect } from "react";
import { X, Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ProductoImagen } from "@/interfaces/Productos.Interface";



interface Props {
  productoId: number | null; // ID del producto
  imagenesGuardadas: ProductoImagen[]; // imágenes que vienen del backend
}

const ProductoImagenesManager: React.FC<Props> = ({ productoId, imagenesGuardadas }) => {
    console.log('productoId:', productoId);
    console.log('imagenesGuardadas:', imagenesGuardadas);
  const [imagenes, setImagenes] = useState<ProductoImagen[]>(imagenesGuardadas);

  useEffect(() => {
    setImagenes(imagenesGuardadas);
  }, [imagenesGuardadas]);

  // Subir nuevas imágenes
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append("imagenes[]", file);
    });

    try {
      const { data } = await axios.post(
        `/api/productos/${productoId}/imagenes`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setImagenes((prev) => [...prev, ...data.imagenes]);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    }
  };

  // Eliminar imagen
  const handleRemove = async (imagenId?: number) => {
    if (!imagenId) return;

    try {
      await axios.delete(`/api/imagenes/${imagenId}`);
      setImagenes((prev) => prev.filter((img) => img.id !== imagenId));
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
    }
  };

  // Establecer como principal
  const setPrincipal = async (imagenId?: number) => {
    if (!imagenId) return;

    try {
      await axios.patch(`/api/imagenes/${imagenId}/principal`);

      setImagenes((prev) =>
        prev.map((img) => ({
          ...img,
          principal: img.id === imagenId,
        }))
      );
    } catch (error) {
      console.error("Error al establecer imagen principal:", error);
    }
  };

  return (
    <div>
      {/* Botón subir imágenes */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">Subir imágenes</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {imagenes.map((img) => (
          <div key={img.id ?? img.imagen} className="relative group">
            <img
              src={img.imagen.startsWith("http") ? img.imagen : `/storage/${img.imagen}`}
              alt={`imagen-${img.id}`}
              className={`w-full h-32 object-cover rounded-xl border ${
                img.es_principal ? "border-blue-500" : "border-gray-300"
              }`}
            />

            {/* Botones flotantes */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => handleRemove(img.id)}
                className="p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                title="Eliminar"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPrincipal(img.id)}
                className={`p-1 rounded-full shadow ${
                  img.es_principal
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-black"
                }`}
                title="Establecer como principal"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>

            {/* Etiqueta principal */}
            {img.es_principal && (
              <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                Principal
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductoImagenesManager;
