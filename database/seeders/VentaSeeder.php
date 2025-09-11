<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venta;
use App\Models\DetalleVenta;

class VentaSeeder extends Seeder
{
    public function run(): void
    {
        Venta::factory(10)->create()->each(function ($venta) {
            DetalleVenta::factory(rand(1, 5))->create(['venta_id' => $venta->id]);
        });
    }
}
