import { Movimiento } from "@/interfaces/Movimientos.Interface";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface Props {
  movimiento?: Movimiento | null;
  tipo?: "ingreso" | "egreso"; // prop opcional para Create
}

export default function Form({ movimiento, tipo }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const { data, setData, post, put, processing, errors } = useForm({
    nro: movimiento?.nro ?? 0,
    tipo: movimiento?.tipo ?? tipo ?? "ingreso",
    nombre: movimiento?.nombre ?? "",
    descripcion: movimiento?.descripcion ?? "",
    precio: movimiento?.precio ?? 0,
    cantidad: movimiento?.cantidad ?? 1,
    umedida: movimiento?.umedida ?? "unidad",
    fecha: movimiento?.fecha ?? today,
    total: movimiento?.total ?? 0, // total inicial
  });

  // Calcular total al cargar o al cambiar precio/cantidad
  useEffect(() => {
    const total = Number((data.precio * data.cantidad).toFixed(2));
    if (total !== data.total) {
      setData("total", total);
    }
  }, [data.precio, data.cantidad]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movimiento) {
      put(`/movimientos/${movimiento.id}`);
    } else {
      post("/movimientos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        {movimiento && (
          <div>
        <label className="block font-semibold mb-1">Nro</label>
        <input
          type="text"
          value={data.nro }
          className="border p-2 w-full cursor-not-allowed"
          disabled
        />
      </div>
        )}
      {/* Tipo (no editable) */}
      <div>
        <label className="block font-semibold mb-1">Tipo</label>
        <input
          type="text"
          value={data.tipo === "ingreso" ? "Ingreso" : "Egreso"}
          className="border p-2 w-full cursor-not-allowed"
          disabled
        />
      </div>

      {/* Nombre */}
      <div>
        <label className="block font-semibold mb-1">Nombre</label>
        <input
          type="text"
          value={data.nombre}
          onChange={e => setData("nombre", e.target.value)}
          placeholder="Nombre"
          className="border p-2 w-full"
        />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block font-semibold mb-1">Descripción</label>
        <textarea
          value={data.descripcion}
          onChange={e => setData("descripcion", e.target.value)}
          placeholder="Descripción"
          className="border p-2 w-full"
        />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
      </div>

      {/* Precio, Cantidad y Unidad de Medida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="number"
            step="0.01"
            value={data.precio}
            onChange={e => setData("precio", Number(e.target.value))}
            className="border p-2 w-full"
          />
          {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Cantidad</label>
          <input
            type="number"
            value={data.cantidad}
            onChange={e => setData("cantidad", Number(e.target.value))}
            className="border p-2 w-full"
          />
          {errors.cantidad && <p className="text-red-500 text-sm">{errors.cantidad}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Unidad de Medida</label>
          <input
            type="text"
            value={data.umedida}
            onChange={e => setData("umedida", e.target.value)}
            placeholder="Ej: kg, litros, unidades"
            className="border p-2 w-full"
          />
          {errors.umedida && <p className="text-red-500 text-sm">{errors.umedida}</p>}
        </div>
      </div>

      {/* Fecha */}
      <div>
        <label className="block font-semibold mb-1">Fecha</label>
        <input
          type="date"
          value={data.fecha}
          onChange={e => setData("fecha", e.target.value)}
          className="border p-2 w-full"
        />
        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
      </div>

      {/* Total calculado */}
      <div>
        <label className="block font-semibold mb-1">Total</label>
        <input
          type="number"
          value={data.total}
          className="border p-2 w-full bg-gray/100 cursor-not-allowed"
          disabled
        />
      </div>

      <button
        disabled={processing}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {movimiento ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
