import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface Props {
  initialSearch?: string;
}

const Search: React.FC<Props> = ({ initialSearch = '' }) => {
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/categorias', { search }, { preserveState: true });
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
      <input
        type="text"
        placeholder="Buscar categoría..."
        className="border p-2 flex-1"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Buscar</button>
    </form>
  );
};

export default Search;
