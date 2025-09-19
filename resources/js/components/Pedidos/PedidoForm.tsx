import { DetallePedido, PedidoFormData } from '@/interfaces/Pedidos.Interface';
import { FC } from 'react';
import ClienteSearch from '../Clientes/ClienteSearch';
import ClienteAutocomplete from '../Clientes/ClienteAutocomplete';

interface Props {
  form: PedidoFormData;
  setData: (key: keyof PedidoFormData, value: any) => void;
  addDetalle: (detalle: DetallePedido) => void;
  updateDetalle: (index: number, detalle: DetallePedido) => void;
  removeDetalle: (index: number) => void;
  onSubmit: () => void;
}

const PedidoForm: FC<Props> = ({ form, setData, addDetalle, updateDetalle, removeDetalle, onSubmit }) => {
  return (
    <div className="space-y-4">
      {/* Cliente */}
      {/* Cliente */}
    <div>
    <label className="block font-bold">Cliente</label>
    <ClienteAutocomplete form={form} setData={setData} />
    </div>

      {/* Usuario */}
      <div>
        <label className="block font-bold">Usuario</label>
        <input
          type="text"
          value={form.user_id}
          onChange={e => setData('user_id', e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Fecha */}
      <div>
        <label className="block font-bold">Fecha</label>
        <input
          type="date"
          value={form.fecha}
          onChange={e => setData('fecha', e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block font-bold">Estado</label>
        <select
          value={form.estado}
          onChange={e => setData('estado', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>

      {/* Detalles */}
      <div>
        <label className="block font-bold">Detalles</label>
        {form.detalles.map((detalle, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Producto ID"
              value={detalle.producto_id}
              onChange={e => updateDetalle(index, { ...detalle, producto_id: e.target.value })}
              className="border p-2 w-1/3"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={detalle.cantidad}
              onChange={e => updateDetalle(index, { ...detalle, cantidad: Number(e.target.value) })}
              className="border p-2 w-1/3"
            />
            <input
              type="number"
              placeholder="Precio"
              value={detalle.precio}
              onChange={e => updateDetalle(index, { ...detalle, precio: Number(e.target.value) })}
              className="border p-2 w-1/3"
            />
            <button
              type="button"
              onClick={() => removeDetalle(index)}
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDetalle({ producto_id: '', cantidad: 1, precio: 0 })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Detalle
        </button>
      </div>

      {/* Observación */}
      <div>
        <label className="block font-bold">Observación</label>
        <textarea
          value={form.observacion}
          onChange={e => setData('observacion', e.target.value)}
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
