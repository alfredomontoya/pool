<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoPrecioFactory extends Factory
{
    public function definition(): array
    {
        return [
            'producto_id' => Producto::inRandomOrder()->first()->id ?? Producto::factory(), // 🆕
            'precio' => $this->faker->randomFloat(2, 10, 500),
            'descuento' => $this->faker->optional(0.3)->randomFloat(2, 1, 50),
            'codigo_descuento' => $this->faker->optional(0.3)->bothify('DESC###'),
            'activo' => $this->faker->boolean(80),
            'fecha_inicio' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
            'fecha_fin' => $this->faker->optional()->dateTimeBetween('now', '+1 month'),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(), // 🆕
        ];
    }
}
