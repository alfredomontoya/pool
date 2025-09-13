import { Link, usePage } from '@inertiajs/react'
import VentaTable from '@/components/Ventas/VentaTable'
import { BreadcrumbItem, Paginated, Venta } from '@/types'
import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'

interface Props {
  ventas: Paginated<Venta>
  filters: { search?: string }
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "ventas", href: "/ventas" }];

const Index: React.FC<Props> = ({ventas, filters}) => {
    const { flash } = usePage().props as any

  return (
    <AppLayout breadcrumbs={breadcrumbs} >
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Ventas</h1>

                <Button variant={"default"} asChild>
                    <Link href="/ventas/create">Nueva Venta</Link>
                </Button>
            </div>
            <VentaTable ventas={ventas} />
        </div>
    </AppLayout>
  )
}

export default Index
