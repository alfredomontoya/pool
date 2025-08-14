import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ClienteForm from "./ClienteForm"; // formulario reutilizable
import { Cliente } from "@/interfaces/cliente.interface";
import { useActualizarCliente } from "@/hooks/Clientes/useActualizarCliente";

interface Props {
  open: boolean;
  onClose: () => void;
  cliente: Cliente;
  onSuccess?: () => void; // callback cuando se actualiza correctamente
}

export default function ClienteUpdateModal({ open, onClose, cliente, onSuccess }: Props) {
  const { data, setData, handleSubmit, processing, errors, reset } = useActualizarCliente(cliente, () => {
    if (onSuccess) onSuccess(); // disparar callback externo
    onClose(); // cerrar el modal
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Actualizar Cliente</DialogTitle>
          <DialogDescription>Modifica los datos del cliente y guarda los cambios.</DialogDescription>
        </DialogHeader>

        <ClienteForm
          data={data}
          setData={setData}
          errors={errors}
          processing={processing}
          onSubmit={handleSubmit}
        />

        {/* Botón adicional para limpiar
        <div className="mt-2 flex justify-end">
          <Button variant="outline" onClick={() => reset()}>Limpiar</Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
