import { useForm } from "@inertiajs/react";

export default function Form({ movimiento }: any) {
  const today = new Date().toISOString().split("T")[0];

  const { data, setData, post, put, processing, errors } = useForm(
    movimiento || {
      fecha: today,
      nombre: "",
      umedida: "", // 👈 nuevo
      descripcion: "",
      cantidad: 1,
      precio: 0,
      tipo: "ingreso",
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    movimiento ? put(`/movimientos/${movimiento.id}`) : post("/movimientos");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label className="block font-semibold mb-1">Nombre</label>
        <input
          value={data.nombre}
          onChange={e => setData("nombre", e.target.value)}
          placeholder="Nombre"
          className="border p-2 w-full"
        />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
      </div>

      

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
          value={data.umedida}
          onChange={e => setData("umedida", e.target.value)}
          placeholder="Ej: kg, litros, unidades"
          className="border p-2 w-full"
        />
        {errors.umedida && <p className="text-red-500 text-sm">{errors.umedida}</p>}
      </div>

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
        <label className="block font-semibold mb-1">Tipo</label>
        <select
          value={data.tipo}
          onChange={e => setData("tipo", e.target.value)}
          className="border p-2 w-full"
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
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
