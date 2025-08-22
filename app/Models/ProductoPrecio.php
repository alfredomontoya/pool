<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoPrecio extends Model
{
    use HasFactory;

    protected $fillable = [
        'producto_id',
        'precio',
        'descuento',
        'codigo_descuento',
        'activo',
        'fecha_inicio',
        'fecha_fin'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function precioFinal()
    {
        if ($this->descuento) {
            return $this->precio - ($this->precio * ($this->descuento / 100));
        }
        return $this->precio;
    }
}
