<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\ProductoImagen;
use App\Models\ProductoPrecio;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->truncateTables([
            'users',
            'clientes',
            'categorias',
            'productos',
            'producto_imagens',
            'producto_precios',
            'tipo_pagos',
            'ventas',
            'detalle_ventas',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            // UserSeeder::class,
            ClienteSeeder::class,
            CategoriaSeeder::class,
            ProductoSeeder::class,
            ProductoImagenSeeder::class,
            ProductoPrecioSeeder::class,
            TipoPagoSeeder::class,
            VentaSeeder::class,
        ]);
    }

    protected function truncateTables(array $tables){
        DB::Statement('SET FOREIGN_KEY_CHECKS = 0;');
        foreach($tables as $table){
            DB::table($table)->truncate();
        }
        DB::Statement('SET FOREIGN_KEY_CHECKS = 1;');
    }
}
