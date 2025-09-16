<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovimientoController extends Controller
{
    public function index()
    {
        $movimientos = Movimiento::orderBy('fecha', 'desc')->paginate(10);

        $totalIngresos = Movimiento::where('tipo', 'ingreso')->sum('total');
        $totalEgresos  = Movimiento::where('tipo', 'egreso')->sum('total');
        $saldo         = $totalIngresos - $totalEgresos;

        return Inertia::render('Movimientos/Index', [
            'movimientos'   => $movimientos,
            'totalIngresos' => $totalIngresos,
            'totalEgresos'  => $totalEgresos,
            'saldo'         => $saldo,
        ]);
    }


    public function create()
    {
        return Inertia::render('Movimientos/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'fecha' => 'required|date',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'cantidad' => 'required|integer|min:1',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:ingreso,egreso',
        ]);

        $data['total'] = $data['cantidad'] * $data['precio'];

        Movimiento::create($data);

        return redirect()->route('movimientos.index')->with('success', 'Movimiento creado');
    }

    public function edit(Movimiento $movimiento)
    {
        return Inertia::render('Movimientos/Edit', [
            'movimiento' => $movimiento
        ]);
    }

    public function update(Request $request, Movimiento $movimiento)
    {
        $data = $request->validate([
            'nro' => 'required|unique:movimientos,nro,' . $movimiento->id,
            'fecha' => 'required|date',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'cantidad' => 'required|integer|min:1',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:ingreso,egreso',
        ]);

        $data['total'] = $data['cantidad'] * $data['precio'];

        $movimiento->update($data);

        return redirect()->route('movimientos.index')->with('success', 'Movimiento actualizado');
    }

    public function destroy(Movimiento $movimiento)
    {
        $movimiento->delete();
        return redirect()->route('movimientos.index')->with('success', 'Movimiento eliminado');
    }
}
