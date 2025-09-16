<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        'nro',
        'fecha',
        'nombre',
        'descripcion',
        'cantidad',
        'umedida',
        'precio',
        'total',
        'tipo',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movimiento) {
            $ultimo = Movimiento::max('nro') ?? 0;
            $movimiento->nro = $ultimo + 1; // autoincremental desde 1
        });
    }
}
