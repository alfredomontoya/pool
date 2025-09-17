import { Link, usePage } from "@inertiajs/react";
import VentaTable from "@/components/Ventas/VentaTable";
import { BreadcrumbItem } from "@/types";
import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Paginated, Venta } from "@/interfaces/Venta.Interface";
import { useVentas } from "@/hooks/Ventas/useVentas"; // importa tu hook

// Venta (Pedido)
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

interface Props {
  ventas: Paginated<Venta>;
  filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "ventas", href: "/ventas" }];

const Index: React.FC<Props> = ({ ventas, filters }) => {
  const { flash } = usePage().props as any;

  // usa tu hook con el valor inicial desde filters
  const { search, setSearch, handleSearch } = useVentas(filters.search ?? "");

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-xl font-bold">Ventas</h1>

          <div className="flex gap-2">
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="border p-2 rounded"
              />
              <Button type="submit">Buscar</Button>
            </form>

            <Button variant={"default"} asChild>
              <Link href="/ventas/create">Nueva Venta</Link>
            </Button>
          </div>
        </div>

        <VentaTable ventas={ventas} />
      </div>
    </AppLayout>
  );
};

export default Index;
