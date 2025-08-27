<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\ProductoImagen;
use App\Models\User;

class ProductoImagenSeeder extends Seeder
{
    public function run(): void
    {
        // Se generan entre 1 y 3 imágenes por producto
        Producto::all()->each(function ($producto) {
            ProductoImagen::factory(rand(1, 3))->create([
                'producto_id' => $producto->id,
            ]);
        });
    }
}
