import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useClientes } from "@/hooks/Clientes/useClientes";
import ClientesSearchForm from "./ClientesSearchForm";
import ClientesTable from ".//ClientesTable";
import ClientesPagination from "./ClientesPagination";
import ClientesDetail from "./ClientesDetail";
import { Cliente } from "@/interfaces/cliente.interface";



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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Clientes</h1>

        <ClientesSearchForm
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />

        <ClientesTable clientes={clientes.data} onSelect={setClienteSeleccionado} />

        <ClientesPagination links={clientes.links} />

        <ClientesDetail
          cliente={clienteSeleccionado}
          onClose={() => setClienteSeleccionado(null)}
        />
      </div>
    </AppLayout>
  );
}
