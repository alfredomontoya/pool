<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pedido\StorePedidoRequest;
use App\Http\Requests\Pedido\UpdatePedidoRequest;
use App\Models\Pedido;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Exception;
use Inertia\Inertia;

class PedidoController extends Controller
{
    // Listar pedidos
    public function index()
    {
        try {
            $pedidos = Pedido::with(['cliente', 'user', 'detalles'])->get();
            return Inertia::render('Pedidos/Index', [
                'pedidos' => $pedidos
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al cargar los pedidos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function create()
    {
        return Inertia::render('Pedidos/Create');
    }

    // Crear pedido con transacción y manejo de errores
    public function store(StorePedidoRequest $request): JsonResponse
    {
        try {
            $pedido = DB::transaction(function () use ($request) {
                $pedido = Pedido::create($request->validated());

                foreach ($request->detalles as $detalle) {
                    $pedido->detalles()->create($detalle);
                }

                return $pedido;
            });

            return response()->json([
                'message' => 'Pedido creado correctamente',
                'pedido' => $pedido->load('detalles')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al crear el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Actualizar pedido con transacción y manejo de errores
    public function update(UpdatePedidoRequest $request, Pedido $pedido): JsonResponse
    {
        try {
            DB::transaction(function () use ($request, $pedido) {
                $pedido->update($request->validated());

                // Actualizamos detalles: eliminamos y recreamos
                $pedido->detalles()->delete();
                foreach ($request->detalles as $detalle) {
                    $pedido->detalles()->create($detalle);
                }
            });

            return response()->json([
                'message' => 'Pedido actualizado correctamente',
                'pedido' => $pedido->load('detalles')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Eliminar pedido con manejo de errores
    public function destroy(Pedido $pedido): JsonResponse
    {
        try {
            $pedido->delete();
            return response()->json([
                'message' => 'Pedido eliminado correctamente'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
