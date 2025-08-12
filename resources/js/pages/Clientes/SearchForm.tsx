import { Link } from "@inertiajs/react";

interface SearchFormProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SearchForm({ search, onSearchChange, onSubmit }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
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
