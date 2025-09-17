import Pagination from "@/components/Pagination";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Movimientos", href: "/movimientos" },
];
export default function Index({ movimientos, totalIngresos, totalEgresos, saldo }: any) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Movimientos</h1>

        {/* Totales */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="font-semibold text-green-800">Total Ingresos</h2>
            <p className="text-2xl font-bold text-green-600">
              {Number(totalIngresos).toFixed(2)}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h2 className="font-semibold text-red-800">Total Egresos</h2>
            <p className="text-2xl font-bold text-red-600">
              {Number(totalEgresos).toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="font-semibold text-blue-800">Saldo</h2>
            <p
              className={`text-2xl font-bold ${
                saldo >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {Number(saldo).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Botones Crear Ingreso / Egreso */}
        <div className="flex gap-2 mb-6">
          <Link
            href="/movimientos/create?tipo=ingreso"
            as="button"
            method="get"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Nuevo Ingreso
          </Link>
          <Link
            href="/movimientos/create?tipo=egreso"
            as="button"
            method="get"
            data={{ tipo: "egreso" }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Nuevo Egreso
          </Link>
        </div>

        {/* Tabla */}
        <table className="w-full mt-4 border">
          <thead>
            <tr>
              <th className="p-2 border">Nro</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">U. Medida</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.data.map((m: any) => (
              <tr key={m.id}>
                <td className="border p-2">{m.nro}</td>
                <td className="border p-2">{m.fecha}</td>
                <td className="border p-2">{m.nombre}</td>
                <td className="border p-2">{m.umedida}</td>
                <td className="border p-2">{m.cantidad}</td>
                <td className="border p-2">{m.precio}</td>
                <td className="border p-2">{m.total}</td>
                <td
                  className={`border p-2 ${
                    m.tipo === "ingreso" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.tipo}
                </td>
                <td className="border p-2">
                  <Link
                    href={`/movimientos/${m.id}/edit`}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/movimientos/${m.id}`}
                    className="text-red-500"
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex gap-2 mt-4">
          <Pagination links={movimientos?.links ?? []} />
        </div>
      </div>
    </AppLayout>
  );
}
