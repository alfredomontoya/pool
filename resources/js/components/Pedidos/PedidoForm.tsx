// PedidoForm.tsx
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
  errors?: { [key: string]: string[] }; // errores de validación
}

const PedidoForm: FC<Props> = ({
  form,
  productos,
  setData,
  addDetalle,
  updateDetalle,
  removeDetalle,
  onSubmit,
  errors = {},
}) => {

  // Inicializar con los 3 primeros productos de la DB
  useEffect(() => {
    console.log('PedidoForm ')
    console.log(productos)
    if (form.detalles!.length === 0 && productos.length > 0) {
      const iniciales: DetallePedido[] = productos.slice(0, 3).map((p) => {
        const precio = Number(p.precio_activo?.precio_venta ?? 0);
        const cantidad = 0; // cantidad por defecto
        return {
          producto_id: String(p.id),
          cantidad,
          precio,
          subtotal: precio * cantidad,
        };
      });
      setData('detalles', iniciales);
    }
  }, [form.detalles, productos, setData]);

  // Función para actualizar un detalle y recalcular subtotal
  const handleUpdateDetalle = (index: number, detalle: DetallePedido) => {
    const subtotal = detalle.cantidad * detalle.precio;
    updateDetalle(index, { ...detalle, subtotal });
  };

  return (
    <div className="p-4">
      {/* Cliente */}
      <div>
        <label className="block font-bold">Cliente</label>
        <ClienteAutocomplete form={form} setData={setData} />
        {errors.cliente_id && <p className="text-red-500 text-sm">{errors.cliente_id[0]}</p>}
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
        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha[0]}</p>}
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
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
          <option value="entregado">Entregado</option>
        </select>
        {errors.estado && <p className="text-red-500 text-sm">{errors.estado[0]}</p>}
      </div>

      {/* Detalles */}
      <PedidoDetalles
        detalles={form.detalles}
        productos={productos}
        addDetalle={(detalle) => {
          // calcular subtotal al agregar
          addDetalle({ ...detalle, subtotal: detalle.cantidad * detalle.precio });
        }}
        updateDetalle={handleUpdateDetalle}
        removeDetalle={removeDetalle}
        errors={errors}
      />

      {/* Observación */}
      <div>
        <label className="block font-bold">Observación</label>
        <textarea
          value={form.observacion}
          onChange={(e) => setData('observacion', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.observacion && <p className="text-red-500 text-sm">{errors.observacion[0]}</p>}
      </div>

      {/* Botón Guardar */}
      <button
        type="button"
        onClick={onSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Guardar
      </button>
    </div>
  );
};

export default PedidoForm;
