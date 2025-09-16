import Form from "@/pages/Movimientos/Form";

export default function Edit({ movimiento }: any) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Movimiento</h1>
      <Form movimiento={movimiento} />
    </div>
  );
}
