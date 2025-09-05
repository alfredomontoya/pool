<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\ProductoImagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductoImagenController extends Controller
{
    // Guardar nuevas imágenes
    public function store(Request $request, Producto $producto)
    {
        $request->validate([
            'imagenes.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $imagenes = [];
        foreach ($request->file('imagenes') as $file) {
            $path = $file->store('productos', 'public');

            $imagen = $producto->imagenes()->create([
                'imagen' => $path,
                'es_principal' => false,
                'user_id' => Auth::id(),
            ]);

            $imagenes[] = $imagen;
        }

        return response()->json([
            'success' => 'Imágenes agregadas correctamente.',
            'imagenes' => $imagenes,
        ]);
    }

    // Eliminar imagen
    public function destroy(ProductoImagen $imagen)
    {
        if ($imagen->imagen && Storage::disk('public')->exists($imagen->imagen)) {
            Storage::disk('public')->delete($imagen->imagen);
        }

        $imagen->delete();

        return response()->json(['success' => 'Imagen eliminada.']);
    }

    // Establecer como principal
    public function setPrincipal(ProductoImagen $imagen)
    {
        // Desmarcar todas
        ProductoImagen::where('producto_id', $imagen->producto_id)
            ->update(['es_principal' => false]);

        // Marcar esta como principal
        $imagen->update(['es_principal' => true]);

        return response()->json(['success' => 'Imagen establecida como principal.']);
    }
}
