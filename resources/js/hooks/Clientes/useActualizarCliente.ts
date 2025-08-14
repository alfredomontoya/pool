import { Cliente } from "@/interfaces/cliente.interface";
import { useForm } from "@inertiajs/react";

export function useActualizarCliente(cliente: Cliente, onSuccess?: () => void) {
  const { data, setData, put, processing, errors, reset } = useForm({
    tipo_documento: cliente.tipo_documento || "CI",
    tipo: cliente.tipo || "NATURAL",
    numero_documento: cliente.numero_documento || "",
    nombre_razon_social: cliente.nombre_razon_social || "",
    direccion: cliente.direccion || "",
    telefono: cliente.telefono || "",
    email: cliente.email || "",
    estado: cliente.estado?.toString() || "activo", // convertimos a string si es necesario
    notas: cliente.notas || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("clientes.update", cliente.id), {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  };

  return { data, setData, handleSubmit, processing, errors, reset };
}
