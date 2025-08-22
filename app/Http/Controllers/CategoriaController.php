<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    // Listado con búsqueda y orden
    public function index(Request $request)
    {
        $query = Categoria::query();

        // Buscar por nombre
        if ($request->has('search')) {
            $query->where('nombre', 'like', "%{$request->search}%");
        }

        // Orden
        $sort = $request->get('sort', 'nombre');
        $direction = $request->get('direction', 'asc');
        $query->orderBy($sort, $direction);

        $categorias = $query->paginate(5)->withQueryString();

        return Inertia::render('Categorias/Index', [
            'categorias' => $categorias,
            'filters' => $request->only('search', 'sort', 'direction'),
            // flash messages son enviados automáticamente por Inertia
        ]);
    }

    // Crear categoría
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('nombre', 'descripcion');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('categorias', 'public');
        }

        $data['user_id'] = Auth::user()->id;

        // dd($data);

        $categoria = Categoria::create($data);

        // Redirige con mensaje para el toast
        return redirect()->route('categorias.index')
            ->with('success', "Categoría '{$categoria->nombre}' creada con éxito.");
    }

    // Editar categoría
    public function update(Request $request, Categoria $categoria)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('nombre', 'descripcion');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria->update($data);

        return redirect()->route('categorias.index')
            ->with('success', "Categoría '{$categoria->nombre}' actualizada con éxito.");
    }

    // Dar de baja categoría
    public function destroy(Categoria $categoria)
    {
        $nombre = $categoria->nombre;
        $categoria->delete();

        return redirect()->route('categorias.index')
            ->with('success', "Categoría '{$nombre}' eliminada correctamente.");
    }
}
