import AppLayout from "@/layouts/app-layout";
import Form from "@/pages/Movimientos/Form";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Movimientos", href: "/movimientos" },
];

export default function Edit({ movimiento }: any) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Movimiento</h1>
      <Form movimiento={movimiento} />
    </div>
    </AppLayout>
  );
}
