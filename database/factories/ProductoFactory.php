<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),
            'descripcion' => $this->faker->paragraph(),
            'categoria_id' => Categoria::inRandomOrder()->first()->id ?? Categoria::factory(), // 🆕
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(), // 🆕
        ];
    }
}
