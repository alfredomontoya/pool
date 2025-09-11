import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ProductoPrecio } from "@/interfaces/Productos.Interface";



interface Props {
  productoId: number | null;
  preciosGuardados: ProductoPrecio[];
  onUpdated?: (mensaje: string) => void;
}

const ProductoPrecioManager: React.FC<Props> = ({ productoId, preciosGuardados, onUpdated }) => {
    const today = new Date().toISOString().split("T")[0]

  const [precios, setPrecios] = useState<ProductoPrecio[]>(preciosGuardados);
  const [nuevoPrecio, setNuevoPrecio] = useState<Partial<ProductoPrecio>>({
        producto_id: productoId ?? undefined,
        precio_venta: 0,
        precio_compra: 0,
        activo: true,
        fecha_inicio: today, // ✅ por defecto la fecha actual
        fecha_fin: null,
  });


  useEffect(() => {
    setPrecios(preciosGuardados);
  }, [preciosGuardados]);

  // Manejar cambios de inputs
  const handleChange = (field: keyof ProductoPrecio, value: any) => {
    setNuevoPrecio((prev) => ({ ...prev, [field]: value }));
  };

  // Crear nuevo precio
  const agregarPrecio = async () => {
    if (!productoId) return;

    try {
      const { data } = await axios.post(`/producto-precios`, {
        ...nuevoPrecio,
        producto_id: productoId,
      });

      console.log("Respuesta al agregar precio:", data);

      setPrecios(data.productoPrecios);
      setNuevoPrecio({
        precio_venta: 0,
        precio_compra: 0,
        activo: true,
        fecha_inicio: today,
        fecha_fin: null,
      });
      onUpdated?.("Precio agregado correctamente");
    } catch (error: any) {
      console.error("Error al agregar precio:", error.response?.data || error.message);
      onUpdated?.("Error al agregar precio");
    }
  };

  // Desactivar precio
  const desactivarPrecio = async (precioId: number) => {
    try {
      const { data } = await axios.patch(`/producto-precios/${precioId}/desactivar`);

      // Actualizamos el estado con la lista actualizada
      setPrecios((prev) =>
        prev.map((p) => (p.id === precioId ? { ...p, activo: false, fecha_fin: data.fecha_fin } : p))
      );

      onUpdated?.("Precio desactivado");
    } catch (error) {
      console.error("Error al desactivar precio:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Precios del producto</h2>

      {/* Formulario para nuevo precio */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Precio venta"
          value={nuevoPrecio.precio_venta}
          onChange={(e) => handleChange("precio_venta", parseFloat(e.target.value))}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Precio compra"
          value={nuevoPrecio.precio_compra}
          onChange={(e) => handleChange("precio_compra", parseFloat(e.target.value))}
          className="border p-2 rounded"
        />
        <input
          type="date"
          placeholder="Fecha inicio"
          value={nuevoPrecio.fecha_inicio ?? today}
          onChange={(e) => handleChange("fecha_inicio", e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={agregarPrecio}>Agregar precio</Button>
      </div>

      {/* Listado de precios */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Precio venta</th>
              <th className="p-2 border">Precio compra</th>
              <th className="p-2 border">Activo</th>
              <th className="p-2 border">Fecha inicio</th>
              <th className="p-2 border">Fecha fin</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {precios.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.precio_venta}</td>
                <td className="p-2 border">{p.precio_compra}</td>
                <td className="p-2 border">{p.activo ? "Sí" : "No"}</td>
                <td className="p-2 border">{p.fecha_inicio}</td>
                <td className="p-2 border">{p.fecha_fin ?? "-"}</td>
                <td className="p-2 border">
                  {p.activo && (
                    <Button size="sm" variant="destructive" onClick={() => desactivarPrecio(p.id)}>
                      Desactivar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductoPrecioManager;
