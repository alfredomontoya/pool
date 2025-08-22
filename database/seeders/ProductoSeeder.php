<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\User;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = User::all();
        $categorias = Categoria::all();

        $categorias->each(function ($categoria) use ($usuarios) {
            Producto::factory(10)->create([
                'categoria_id' => $categoria->id,
                'user_id' => $usuarios->random()->id,
            ]);
        });
    }
}
