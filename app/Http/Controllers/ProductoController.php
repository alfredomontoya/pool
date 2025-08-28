<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductoController extends Controller
{
    // Listado con búsqueda y orden
    public function index(Request $request)
    {
        $productos = Producto::with('categoria')
            ->when($request->search, fn($query, $search) =>
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%")
                    ->orWhere('codigo', 'like', "%{$search}%")
            )
            ->orderBy(
                $request->get('sort', 'id'),
                $request->get('direction', 'desc')
            )
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Productos/ProductoIndex', [
            'productos' => $productos,
            'filters' => $request->only('search', 'sort', 'direction'),
        ]);
    }

    // Crear producto
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'codigo' => 'nullable|string|max:50',
            'stock_actual' => 'nullable|numeric',
            'stock_minimo' => 'nullable|numeric',
            'unidad_medida' => 'nullable|string|max:20',
            'activo' => 'required|boolean',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $data = $request->only([
            'nombre', 'descripcion', 'categoria_id', 'codigo',
            'stock_actual', 'stock_minimo', 'unidad_medida', 'activo'
        ]);
        $data['user_id'] = Auth::user()->id;

        $producto = Producto::create($data);

        if ($request->hasFile('imagen')) {
            $producto->imagenes()->create([
                'url' => $request->file('imagen')->store('productos', 'public'),
                'es_principal' => true,
            ]);
        }

        return redirect()->route('productos.index')
            ->with('success', "Producto '{$producto->nombre}' creado con éxito.");
    }

    // Editar producto
    public function update(Request $request, Producto $producto)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'codigo' => 'nullable|string|max:50',
            'stock_actual' => 'nullable|numeric',
            'stock_minimo' => 'nullable|numeric',
            'unidad_medida' => 'nullable|string|max:20',
            'activo' => 'required|boolean',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $data = $request->only([
            'nombre', 'descripcion', 'categoria_id', 'codigo',
            'stock_actual', 'stock_minimo', 'unidad_medida', 'activo'
        ]);

        $producto->update($data);

        if ($request->hasFile('imagen')) {
            $producto->imagenes()->create([
                'url' => $request->file('imagen')->store('productos', 'public'),
                'es_principal' => true,
            ]);
        }

        return redirect()->route('productos.index')
            ->with('success', "Producto '{$producto->nombre}' actualizado con éxito.");
    }

    // Eliminar producto
    public function destroy(Producto $producto)
    {
        $nombre = $producto->nombre;
        $producto->delete();

        return redirect()->route('productos.index')
            ->with('success', "Producto '{$nombre}' eliminado correctamente.");
    }
}
