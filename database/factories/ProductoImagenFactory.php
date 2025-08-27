<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProductoImagen;
use App\Models\Producto;
use App\Models\User;

class ProductoImagenFactory extends Factory
{
  protected $model = ProductoImagen::class;

  public function definition()
  {
    $producto = Producto::inRandomOrder()->first() ?? Producto::factory()->create();
    $user = User::inRandomOrder()->first() ?? User::factory()->create();

    return [
      'producto_id' => $producto->id,
      'imagen' => 'https://picsum.photos/400/400?random=' . $this->faker->unique()->numberBetween(1, 1000),
      'es_principal' => $this->faker->boolean(30), // 30% chance
      'user_id' => $user->id,
    ];
  }
}
