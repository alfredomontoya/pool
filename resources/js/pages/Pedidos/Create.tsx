// import { useNavigate } from 'react-router-dom';
import usePedido from '@/hooks/Pedido/usePedido';
import { PedidoFormData } from '@/interfaces/Pedidos.Interface';
import usePedidosCRUD from '@/hooks/Pedido/usePedidosCRUD';
import PedidoForm from '@/components/Pedidos/PedidoForm';
import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import { Producto } from '@/interfaces/Productos.Interface';
import { useState } from 'react';

interface Props {
  productos: Producto[]
}


export default function Create({ productos }: Props) {
  // Estado del formulario
  const { form, setData, addDetalle, updateDetalle, removeDetalle } = usePedido({
    cliente_id: '',
    user_id: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'pendiente',
    detalles: [],
    observacion: ''
  } as PedidoFormData);

  const { createPedido } = usePedidosCRUD();

const [errors, setErrors] = useState<{ [key: string]: string[] }>({}); // 👈 estado para errores

//   const navigate = useNavigate();

  // Al enviar el formulario
  const handleSubmit = async () => {
  try {
    const result = await createPedido('/pedidos/store', form);
    console.log('Pedido creado:', result);
    setErrors({}); // limpiar errores si la creación fue exitosa
    // navigate('/pedidos'); // redirigir a la lista de pedidos
    alert('Pedido creado correctamente');
    router.visit('/pedidos');
  } catch (errors: any) {
    // aquí recibimos directamente los errores de validación
    console.log('Errores de validación:', errors);

    // const mensajes = Object.values(errors).flat().join('\n');
    // alert('Errores de validación:\n' + mensajes);
    setErrors(errors); // actualizar el estado de errores
  }
};

  return (
    <AppLayout breadcrumbs={[{ title: 'Pedidos', href: '/pedidos' }]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Crear Pedido</h1>
         <Link
            href="/pedidos/create"
            as="button"
            method="get"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Nuevo Pedido
          </Link>

        {/* Componente formulario reutilizable */}
        <PedidoForm
          form={form}
          setData={setData}
          addDetalle={addDetalle}
          updateDetalle={updateDetalle}
          removeDetalle={removeDetalle}
          onSubmit={handleSubmit}
          productos={productos}
          errors={errors}
        />
      </div>
    </AppLayout>
  );
}
