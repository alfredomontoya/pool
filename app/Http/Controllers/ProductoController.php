<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use App\Models\ProductoImagen;
use App\Models\ProductoPrecio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductoController extends Controller
{
    // Listado con búsqueda y orden
    public function index(Request $request)
    {
        $productos = Producto::with([
                'categoria',
                'imagenPrincipal',
                'imagenes',       // todas las imágenes
                'precioActivo',
                'precios'         // historial de precios
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%")
                    ->orWhere('codigo', 'like', "%{$search}%");
                });
            })
            ->orderBy(
                $request->get('sort', 'id'),
                $request->get('direction', 'desc')
            )
            ->paginate(5)
            ->withQueryString();

        // Cargar todas las categorías para el modal de creación
        $categorias = \App\Models\Categoria::all();

        return Inertia::render('Productos/ProductoIndex', [
            'productos' => $productos,
            'filters' => $request->only('search', 'sort', 'direction'),
            'categorias' => $categorias, // <-- agregado
        ]);
    }



    // Crear producto
    public function store(Request $request)
    {
        // Validación básica
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'codigo' => 'nullable|string|max:50',
            'stock_actual' => 'required|numeric|min:0',
            'stock_minimo' => 'required|numeric|min:0',
            'unidad_medida' => 'required|string|max:20',
            'activo' => 'required|boolean',
            'imagenes.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'precio' => 'nullable|array',
            'precio.precio_venta' => 'nullable|numeric|min:0',
            'precio.precio_compra' => 'nullable|numeric|min:0',
        ]);

        // Crear producto
        $producto = Producto::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'categoria_id' => $validated['categoria_id'],
            'codigo' => $validated['codigo'] ?? null,
            'stock_actual' => $validated['stock_actual'],
            'stock_minimo' => $validated['stock_minimo'],
            'unidad_medida' => $validated['unidad_medida'],
            'activo' => $validated['activo'],
            'user_id' => Auth::id(),
        ]);

        // Guardar imágenes
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $file) {
                $path = $file->store('productos', 'public');
                ProductoImagen::create([
                    'producto_id' => $producto->id,
                    'imagen' => $path,
                    'es_principal' => $index === 0, // la primera imagen será principal por defecto
                    'user_id' => Auth::id(),
                ]);
            }
        }

        // Guardar precio inicial si existe
        if ($request->filled('precio')) {
            $precioData = $request->input('precio');
            if (!empty($precioData['precio_venta']) || !empty($precioData['precio_compra'])) {
                ProductoPrecio::create([
                    'producto_id' => $producto->id,
                    'precio_venta' => $precioData['precio_venta'] ?? 0,
                    'precio_compra' => $precioData['precio_compra'] ?? 0,
                    'activo' => true,
                    'fecha_inicio' => now(),
                    'user_id' => Auth::id(),
                ]);
            }
        }

        return redirect()->back()->with('success', 'Producto creado correctamente.');
    }

    // Editar producto
    public function update(Request $request, Producto $producto)
    {
        // Validación
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'codigo' => 'nullable|string|max:50',
            'stock_actual' => 'required|numeric|min:0',
            'stock_minimo' => 'required|numeric|min:0',
            'unidad_medida' => 'required|string|max:20',
            'activo' => 'required|boolean',
            'imagenesFiles.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'precio' => 'nullable|array',
            'precio.precio_venta' => 'nullable|numeric|min:0',
            'precio.precio_compra' => 'nullable|numeric|min:0',
        ]);

        // Actualizar datos básicos del producto
        $producto->update([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'categoria_id' => $validated['categoria_id'],
            'codigo' => $validated['codigo'] ?? null,
            'stock_actual' => $validated['stock_actual'],
            'stock_minimo' => $validated['stock_minimo'],
            'unidad_medida' => $validated['unidad_medida'],
            'activo' => $validated['activo'],
            'updated_by_user_id' => Auth::id(),
        ]);

        // Guardar nuevas imágenes si hay
        if ($request->hasFile('imagenesFiles')) {
            foreach ($request->file('imagenesFiles') as $index => $file) {
                $path = $file->store('productos', 'public');
                $producto->imagenes()->create([
                    'imagen' => $path,
                    'es_principal' => $index === 0, // primera imagen como principal
                    'user_id' => Auth::id(),
                ]);
            }
        }

        // Actualizar precio si existe
        if ($request->filled('precio')) {
            $precioData = $request->input('precio');
            if (!empty($precioData['precio_venta']) || !empty($precioData['precio_compra'])) {
                // Desactivar precio anterior activo
                $producto->precio_activo?->update(['activo' => false, 'fecha_fin' => now()]);

                // Crear nuevo precio
                $producto->precios()->create([
                    'precio_venta' => $precioData['precio_venta'] ?? 0,
                    'precio_compra' => $precioData['precio_compra'] ?? 0,
                    'activo' => true,
                    'fecha_inicio' => now(),
                    'user_id' => Auth::id(),
                ]);
            }
        }

        return redirect()->back()->with('success', 'Producto actualizado correctamente.');
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
