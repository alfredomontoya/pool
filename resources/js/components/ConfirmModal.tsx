import React from 'react';

interface Categoria {
  id: number;
  nombre: string;
}

interface ConfirmModalProps {
  categoria: Categoria;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ categoria, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-4">¿Deseas eliminar la categoría <strong>{categoria.nombre}</strong>?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
