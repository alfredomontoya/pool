import { ClienteCrear } from "@/interfaces/cliente.interface";
import { useForm } from "@inertiajs/react";


// Tipo para crear cliente: excluye campos automáticos

export function useCrearCliente(onSuccess?: () => void) {
  const { data, setData, post, processing, errors, reset } = useForm<ClienteCrear>({
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
        reset();
        if (onSuccess) onSuccess();
      },
    });
  };

  return { data, setData, handleSubmit, processing, errors, reset };
}
