import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (imagen) formData.append('imagen', imagen);

    router.post('/categorias', formData, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Nueva Categoría</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 w-full mb-2"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            className="border p-2 w-full mb-2"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImagen(e.target.files ? e.target.files[0] : null)}
            className="mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
