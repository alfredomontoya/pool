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
        Producto::factory()->count(50)->create();
    }
}
