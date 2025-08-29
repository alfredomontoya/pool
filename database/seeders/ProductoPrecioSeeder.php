<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\ProductoPrecio;
use App\Models\User;

class ProductoPrecioSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = User::all();
        $productos = Producto::all();

        $productos->each(function ($producto) use ($usuarios) {
            ProductoPrecio::factory(1)->create([
                'producto_id' => $producto->id,
                'user_id' => $usuarios->random()->id,
                'activo' => true
            ]);
            ProductoPrecio::factory(rand(1,2))->create([
                'producto_id' => $producto->id,
                'user_id' => $usuarios->random()->id,
                'activo' => false,
            ]);
        });
    }
}
