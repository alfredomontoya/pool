import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useClientes } from "@/hooks/Clientes/useClientes";
import ClientesSearchForm from "./ClientesSearchForm";
import ClientesTable from ".//ClientesTable";
import ClientesPagination from "./ClientesPagination";
import ClientesDetail from "./ClientesDetail";
import { Cliente } from "@/interfaces/cliente.interface";
import CreateClienteModal from "./ClienteCreateModal";
import { Button } from "@/components/ui/button";
import ConfirmacionRegistro from "@/components/ConfirmacionRegistro";
import ClienteUpdateModal from "./ClienteUpdateModal";



interface Props {
  clientes: {
    data: Cliente[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: { search: string };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Clientes", href: "/clientes" },
];

export default function Index({ clientes, filters }: Props) {
  const { search, setSearch, handleSearch } = useClientes(filters.search || "");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">
            Clientes

        </h1>
        <div className="flex gap-2">
            <ClientesSearchForm
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            {/* <Link
                href={route("clientes.create")}
                className="bg-secondary text-black px-3 py-1 rounded-sm gap-2 mb-4"
            >
                Nuevo
            </Link> */}
            <Button className="mb-4" variant={"secondary"} size={"sm"} onClick={() => setOpen(true)}>Nuevo Cliente</Button>
        </div>


        <ClientesTable clientes={clientes.data} onSelect={setClienteSeleccionado} />

        <ClientesPagination links={clientes.links} />

        <ClientesDetail
          cliente={clienteSeleccionado}
          onClose={() => setClienteSeleccionado(null)}
        />

        <CreateClienteModal
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={() => {
              setOpen(false);
              setShowConfirm(true);
            }}
        />

        {clienteSeleccionado && (
            <ClienteUpdateModal
                open={true}
                onClose={() => setClienteSeleccionado(null)}
                cliente={clienteSeleccionado}
                onSuccess={() => {
                    setClienteSeleccionado(null);
                    setShowConfirm(true);
                }}
            />
        )}

        <ConfirmacionRegistro open={showConfirm} onClose={() => setShowConfirm(false)} />
      </div>
    </AppLayout>
  );
}
