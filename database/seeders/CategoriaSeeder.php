<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\User;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        Categoria::factory(5)->create();
    }
}
