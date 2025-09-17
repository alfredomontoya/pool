import AppLayout from "@/layouts/app-layout";
import Form from "@/pages/Movimientos/Form";
import { BreadcrumbItem } from "@/types";

interface Props {
  tipo: "ingreso" | "egreso"; // el tipo se pasa al crear
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Movimientos", href: "/movimientos" },
];

export default function Create({ tipo }: Props) {
    console.log('Create')
    console.log({ tipo });
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Nuevo Movimiento ({tipo === "ingreso" ? "Ingreso" : "Egreso"})
      </h1>
      <Form tipo={tipo} />
    </div>
    </AppLayout>
  );
}
