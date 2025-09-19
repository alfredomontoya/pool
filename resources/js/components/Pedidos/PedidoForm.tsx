import { FC, useEffect } from 'react';
import { DetallePedido, PedidoFormData } from '@/interfaces/Pedidos.Interface';
import { Producto } from '@/interfaces/Productos.Interface';
import ClienteAutocomplete from '../Clientes/ClienteAutocomplete';
import PedidoDetalles from './PedidoDetalles';

interface Props {
  form: PedidoFormData;
  productos: Producto[];
  setData: (key: keyof PedidoFormData, value: any) => void;
  addDetalle: (detalle: DetallePedido) => void;
  updateDetalle: (index: number, detalle: DetallePedido) => void;
  removeDetalle: (index: number) => void;
  onSubmit: () => void;
}

const PedidoForm: FC<Props> = ({
  form,
  productos,
  setData,
  addDetalle,
  updateDetalle,
  removeDetalle,
  onSubmit,
}) => {
  console.log('Productos en PedidoForm:', productos);
  // Inicializar con los 3 primeros productos de la DB
  useEffect(() => {
    if (form.detalles.length === 0 && productos.length > 0) {
      const iniciales: DetallePedido[] = productos.slice(0, 3).map((p) => ({
        producto_id: String(p.id), // 🔹 convertido a string
        cantidad: 0,
        precio: Number(p.precio_activo?.precio_venta ?? 0), // 🔹 nunca undefined
      }));
      setData('detalles', iniciales);
    }
  }, [form.detalles, productos, setData]);

  return (
    <div className="p-4">
      {/* Cliente */}
      <div>
        <label className="block font-bold">Cliente</label>
        <ClienteAutocomplete form={form} setData={setData} />
      </div>

      {/* Fecha */}
      <div>
        <label className="block font-bold">Fecha</label>
        <input
          type="date"
          value={form.fecha}
          onChange={(e) => setData('fecha', e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block font-bold">Estado</label>
        <select
          value={form.estado}
          onChange={(e) => setData('estado', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="pendiente">Pendiente</option>
        </select>
      </div>

      {/* Detalles */}
      <PedidoDetalles
        detalles={form.detalles}
        productos={productos}
        addDetalle={addDetalle}
        updateDetalle={updateDetalle}
        removeDetalle={removeDetalle}
      />

      {/* Observación */}
      <div>
        <label className="block font-bold">Observación</label>
        <textarea
          value={form.observacion}
          onChange={(e) => setData('observacion', e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Botón Guardar */}
      <button
        type="button"
        onClick={onSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </div>
  );
};

export default PedidoForm;
