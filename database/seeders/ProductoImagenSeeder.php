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
        $usuarios = User::all();
        $productos = Producto::all();

        $productos->each(function ($producto) use ($usuarios) {
            ProductoImagen::factory(rand(1,3))->create([
                'producto_id' => $producto->id,
                'user_id' => $usuarios->random()->id,
            ]);
        });
    }
}
