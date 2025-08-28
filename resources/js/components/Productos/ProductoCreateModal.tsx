import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CreateModalProps {
  onClose: () => void;
  onSaved: (msg: string) => void;
}

const ProductoCreateModal: React.FC<CreateModalProps> = ({ onClose, onSaved }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImagen(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", String(precio));
    if (imagen) formData.append("imagen", imagen);

    router.post("/productos", formData, {
      onSuccess: () => {
        onClose();
        onSaved(`Producto '${nombre}' creado correctamente ✅`);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-neutral-100 dark:bg-neutral-800">
        <h2 className="text-xl font-bold mb-4">Nuevo Producto</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <Input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="border p-2 w-full mb-2"
            required
          />
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />

          {preview && (
            <div className="mb-4 flex justify-center">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              Crear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoCreateModal;
