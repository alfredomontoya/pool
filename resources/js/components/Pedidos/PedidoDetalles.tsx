import { FC } from 'react';
import { DetallePedido } from '@/interfaces/Pedidos.Interface';
import { Producto } from '@/interfaces/Productos.Interface';

interface Props {
  detalles: DetallePedido[];
  productos: Producto[];
  addDetalle: (detalle: DetallePedido) => void;
  updateDetalle: (index: number, detalle: DetallePedido) => void;
  removeDetalle: (index: number) => void;
}

const PedidoDetalles: FC<Props> = ({
  detalles,
  productos,
  addDetalle,
  updateDetalle,
  removeDetalle,
}) => {
  return (
    <div className="mt-4">
      <label className="block font-bold mb-2">Detalles</label>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Producto</th>
            <th className="border px-2 py-1">Cantidad</th>
            <th className="border px-2 py-1">Precio</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">
                <select
                  value={detalle.producto_id}
                  onChange={(e) => {
                    const producto = productos.find(
                      (p) => String(p.id) === e.target.value
                    );
                    updateDetalle(index, {
                      ...detalle,
                      producto_id: e.target.value,
                      precio: producto
                        ? producto.precio_activo?.precio_venta ?? 0
                        : detalle.precio,
                    });
                  }}
                  className="border p-1 w-full"
                >
                  <option value="">Seleccione...</option>
                  {productos.map((p) => (
                    <option key={p.id} value={String(p.id)}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={detalle.cantidad}
                  onChange={(e) =>
                    updateDetalle(index, {
                      ...detalle,
                      cantidad: Number(e.target.value),
                    })
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1 text-right">
                {detalle.precio.toFixed(2)}
              </td>
              <td className="border px-2 py-1 text-right">
                {(detalle.cantidad * detalle.precio).toFixed(2)}
              </td>
              <td className="border px-2 py-1 text-center">
                <button
                  type="button"
                  onClick={() => removeDetalle(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() =>
          addDetalle({ producto_id: '', cantidad: 12, precio: 0 })
        }
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Detalle
      </button>
    </div>
  );
};

export default PedidoDetalles;
