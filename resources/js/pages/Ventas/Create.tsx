import { Head, useForm } from "@inertiajs/react";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { TipoPago, Venta } from "@/interfaces/Venta.Interface";
import AppLayout from "@/layouts/app-layout";
import VentaForm from "@/components/Ventas/VentaForm";
import { Producto } from "@/interfaces/Productos.Interface";

interface Props {
  clientes: Cliente[];
  tiposPago: TipoPago[];
  productos: Producto[];
}

export default function Create({ clientes, tiposPago, productos }: Props) {
  // Inicializamos useForm con los campos que vamos a enviar
  const form = useForm<{
    cliente_id?: number;
    tipo_pago_id?: number;
    total: number;
    efectivo: number;
    cambio: number;
    estado: string;
    detalles: {
      producto_id: number;
      cantidad: number;
      precio_unitario: number;
      subtotal: number;
    }[];
  }>({
    cliente_id: undefined,
    tipo_pago_id: undefined,
    total: 0,
    efectivo: 0,
    cambio: 0,
    estado: "pendiente",
    detalles: [],
  });

  const handleSubmit = (data: Partial<Venta> & { detalles: any[] }) => {
    // Solo enviamos datos serializables
    form.setData({
      cliente_id: data.cliente_id,
      tipo_pago_id: data.tipo_pago_id,
      total: data.total ?? 0,
      efectivo: data.efectivo ?? 0,
      cambio: data.cambio ?? 0,
      estado: data.estado ?? "pendiente",
      detalles: data.detalles.map((d) => ({
        producto_id: d.producto_id,
        cantidad: d.cantidad,
        precio_unitario: d.precio_unitario,
        subtotal: d.subtotal,
      })),
    });

    form.post(route("ventas.store"), {
      onSuccess: () => {
        console.log("Venta guardada con éxito");
        form.reset(); // opcional: limpiar el formulario
      },
      onError: (errors) => {
        console.error("Errores al guardar la venta:", errors);
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Nueva Venta" />

      <div className="py-6">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <VentaForm
              clientes={clientes}
              tiposPago={tiposPago}
              productos={productos}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
