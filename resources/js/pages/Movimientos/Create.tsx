import Form from "@/pages/Movimientos/Form";

interface Props {
  tipo: "ingreso" | "egreso"; // el tipo se pasa al crear
}

export default function Create({ tipo }: Props) {
    console.log('Create')
    console.log({ tipo });
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Nuevo Movimiento ({tipo === "ingreso" ? "Ingreso" : "Egreso"})
      </h1>
      <Form tipo={tipo} />
    </div>
  );
}
