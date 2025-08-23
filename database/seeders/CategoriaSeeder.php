<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\User;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = User::all();

        Categoria::factory(25)->create()->each(function ($categoria) use ($usuarios) {
            $categoria->update([
                'user_id' => $usuarios->random()->id
            ]);
        });
    }
}
