import usePedidosCRUD from '@/hooks/Pedido/usePedidosCRUD';
import { useEffect } from 'react';
import TablePedidos from './TablePedidos';
import { Pedido } from '@/interfaces/Pedidos.Interface';
// import TablePedidos from './components/TablePedidos';


interface Props {
    pedidos: Pedido[];
}

export default function Index({ pedidos }: Props) {
    const { deletePedido } = usePedidosCRUD();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <TablePedidos pedidos={pedidos} onDelete={deletePedido} />
    </div>
  );
}
