// resources/js/Pages/Ventas/Create.tsx

import useVentas from "@/hooks/useVentas"
import VentaForm from "@/components/Ventas/VentaForm"
import { BreadcrumbItem, TipoPago } from "@/types"
import { Cliente } from "@/interfaces/Clientes.Interface"
import AppLayout from "@/layouts/app-layout"

interface Props {
  clientes: Cliente[]
  tiposPago: TipoPago[]
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "ventas", href: "/ventas" }];

const Create: React.FC<Props> = ({clientes, tiposPago}) => {

  const { store } = useVentas()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">Nueva Venta</h1>
      <VentaForm
        clientes={clientes}
        tiposPago={tiposPago}
        onSubmit={(data) => store(data)}
      />
    </div>
    </AppLayout>
  )
}
export default Create
