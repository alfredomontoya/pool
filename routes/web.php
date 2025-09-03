<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProductoController;
use App\Http\Middleware\SetUserId;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', SetUserId::class])->group(function () {
    Route::resource('clientes', ClienteController::class);
    Route::resource('categorias', CategoriaController::class);
    Route::get('productos/createOrUpdate/{id}', [ProductoController::class, 'createOrUpdate'])->name('productos.createOrUpdate');
    Route::resource('productos', ProductoController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
