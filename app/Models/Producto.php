<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'categoria_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function imagenes()
    {
        return $this->hasMany(ProductoImagen::class);
    }

    public function precios()
    {
        return $this->hasMany(ProductoPrecio::class);
    }

    public function precioVigente()
    {
        return $this->precios()
            ->where('activo', true)
            ->where(function ($query) {
                $query->whereNull('fecha_inicio')
                      ->orWhere('fecha_inicio', '<=', now());
            })
            ->where(function ($query) {
                $query->whereNull('fecha_fin')
                      ->orWhere('fecha_fin', '>=', now());
            })
            ->latest()
            ->first();
    }
}
