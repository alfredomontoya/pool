import React from "react";
import { Link } from "@inertiajs/react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function ClientesSearchForm({ search, setSearch, handleSearch }: Props) {
  return (
    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar cliente..."
        className="border rounded px-3 py-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Buscar
      </button>
      <Link
        href={route("clientes.create")}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Nuevo
      </Link>
    </form>
  );
}
