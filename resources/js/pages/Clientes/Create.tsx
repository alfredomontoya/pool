import React from "react";
import { useForm, Head } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: '', // si quieres dejarlo vacío o tomarlo de contexto/auth
    tipo_documento: "CI",
    tipo: "NATURAL",
    numero_documento: "",
    nombre_razon_social: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: "activo",
    notas: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("clientes.store"), {
      onSuccess: () => {
        reset()
      },
      onError: () => {
        console.error(errors);
        alert("❌ Ocurrió un error al registrar el cliente");
      }
    });

  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Clientes',
      href: '/clientes',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Cliente" />
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Registrar Cliente</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Tipo Documento */}
          <div>
            <label className="block font-medium">Tipo Documento</label>
            <select
              value={data.tipo_documento}
              onChange={(e) => setData("tipo_documento", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="CI">CI</option>
              <option value="NIT">NIT</option>
            </select>
            {errors.tipo_documento && (
              <p className="text-red-500 text-sm">{errors.tipo_documento}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block font-medium">Tipo</label>
            <select
              value={data.tipo}
              onChange={(e) => setData("tipo", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="NATURAL">Natural</option>
              <option value="JURIDICO">Jurídico</option>
            </select>
            {errors.tipo && (
              <p className="text-red-500 text-sm">{errors.tipo}</p>
            )}
          </div>

          {/* Numero Documento */}
          <div>
            <label className="block font-medium">Numero de documento</label>
            <input
              type="text"
              value={data.numero_documento}
              onChange={(e) => setData("numero_documento", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.numero_documento && (
              <p className="text-red-500 text-sm">{errors.numero_documento}</p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              type="text"
              value={data.nombre_razon_social}
              onChange={(e) => setData("nombre_razon_social", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nombre_razon_social && (
              <p className="text-red-500 text-sm">{errors.nombre_razon_social}</p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="block font-medium">Dirección</label>
            <input
              type="text"
              value={data.direccion}
              onChange={(e) => setData("direccion", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.direccion && (
              <p className="text-red-500 text-sm">{errors.direccion}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block font-medium">Teléfono</label>
            <input
              type="text"
              value={data.telefono}
              onChange={(e) => setData("telefono", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm">{errors.telefono}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="block font-medium">Estado</label>
            <select
              value={data.estado}
              onChange={(e) => setData("estado", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            {errors.estado && (
              <p className="text-red-500 text-sm">{errors.estado}</p>
            )}
          </div>

          {/* Notas */}
          <div>
            <label className="block font-medium">Notas</label>
            <textarea
              value={data.notas}
              onChange={(e) => setData("notas", e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
            {errors.notas && (
              <p className="text-red-500 text-sm">{errors.notas}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
