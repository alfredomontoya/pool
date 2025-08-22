<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoImagenFactory extends Factory
{
    public function definition(): array
    {
        return [
            'producto_id' => Producto::inRandomOrder()->first()->id ?? Producto::factory(), // 🆕
            'path' => $this->faker->imageUrl(640, 480, 'products', true),
            'principal' => $this->faker->boolean(30),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(), // 🆕
        ];
    }
}
