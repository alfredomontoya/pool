<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('producto_precios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->decimal('precio', 10, 2);
            $table->decimal('descuento', 5, 2)->nullable(); // porcentaje opcional
            $table->string('codigo_descuento')->nullable();
            $table->boolean('activo')->default(true);
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // 🆕
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_precios');
    }
};
