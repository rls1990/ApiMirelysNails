import { z } from "zod";

export const paqueteShema = z.object({
  tipo: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "El tipo de paquete es requerido.",
        invalid_type_error: "El tipo de paquete debe ser un número.",
      })
      .refine(
        (val) =>
          val === 1.5 || val === 3 || val === 5 || val === 10 || val === 20,
        { message: "El tipo de paquete no es válido." }
      )
  ),

  via: z
    .string({
      required_error: "La via de envío del paquete es requerida.",
    })
    .refine((val) => val === "aereo" || val === "maritimo", {
      message: "La vía de envío no es válida.",
    }),

  costo_envio: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "El costo de envío es requerido.",
        invalid_type_error: "El costo de envío debe ser un número.",
      })
      .min(1, { message: "El costo de envío debe ser mayor que 0." })
  ),
  ancho: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "El ancho debe ser un número." })
      .min(1, { message: "El ancho debe ser mayor que 0." })
      .optional()
  ),
  largo: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "El largo debe ser un número." })
      .min(1, { message: "El largo debe ser mayor que 0." })
      .optional()
  ),
  alto: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "El alto debe ser un número." })
      .min(1, { message: "El alto debe ser mayor que 0." })
      .optional()
  ),
});
