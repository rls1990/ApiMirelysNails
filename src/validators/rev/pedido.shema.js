import { z } from "zod";

const estad = ["pendiente", "revisado", "rechazado", "enviado", "facturado"];

export const pedidoShema = z.object({
  nombre: z
    .string({ required_error: "El nombre del pedido es requerido." })
    .min(1, { message: "El nombre debe contener más de un caracter." }),
  estado: z
    .string({ required_error: "El estado del pedido es requerido." })
    .refine((val) => estad.find((v) => v === val), {
      message: "El estado no es correcto.",
    })
    .optional(),
  importe: z
    .preprocess(
      (val) => Number(val),
      z.number({ invalid_type_error: "El importe debe ser un número." })
    )
    .optional(),
  usuario: z.string({
    required_error: "El usuario al que pertenece el pedido es requerido.",
  }),
});
