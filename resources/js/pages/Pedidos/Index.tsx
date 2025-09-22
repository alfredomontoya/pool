// Elegir Cliente
// Ver Ubicación, dirección y teléfono del cliente
// registrar Detalle
// 	Producto	Cantidad	Total
// 	####		###		###
// 	####		###		###

// 	####		###		###

// Total 100 (Se calcula automaticamente)
// Tipo Pago: Inicialmente Vacio: QR, Transferencia, Efectivo
// Pago Inicial 20
// Saldo 80

// Pago Final 100
// Cambio:	20
// Estado: Pendiente | Cancelado
// Fecha: Actual

import usePedidosCRUD from '@/hooks/Pedido/usePedidosCRUD';
import { useEffect, useState } from 'react';
import TablePedidos from './TablePedidos';
import { Pedido } from '@/interfaces/Pedidos.Interface';
import AppLayout from '@/layouts/app-layout';
import { Paginated } from '@/interfaces/Venta.Interface';
import { Link } from '@inertiajs/react';
import SearchComponent from '@/components/helpers/SearchComponent';
import Pagination from '@/components/Pagination';
import usePedido from '@/hooks/Pedido/usePedido';
import useSearch from '@/hooks/Pedido/useSearch';
// import TablePedidos from './components/TablePedidos';


interface Props {
    pedidos: Paginated<Pedido>;
    filters?: { search?: string };
}

export default function Index({ pedidos, filters }: Props) {

    const { deletePedido } = usePedidosCRUD();
    const { search, setSearch, handleSearch } = useSearch(filters?.search || '');


  return (
    <AppLayout breadcrumbs={[{ title: 'Pedidos', href: '/pedidos' }]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
         <Link
            href="/pedidos/create"
            as="button"
            method="get"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Nuevo Pedido
          </Link>
        <SearchComponent search={search} setSearch={setSearch} handleSearch={handleSearch} />
        <TablePedidos pedidos={pedidos} onDelete={deletePedido} search={search} />
        <Pagination links={pedidos.links} />
      </div>
    </AppLayout>
  );
}
