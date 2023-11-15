import { z } from "zod";

const list_estado = ["pendiente", "procesado"];

export const articuloSchema = z.object({
  cantidad: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "La cantidad es requerida.",
        invalid_type_error: "La cantidad debe ser un numero.",
      })
      .min(1, { message: "La cantidad mínima debe ser 1." })
  ),
  precio: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "El precio es requerida.",
        invalid_type_error: "El precio debe ser un numero.",
      })
      .min(1, { message: "El precio mínima debe ser 1." })
  ),
  estado: z
    .string()
    .refine((val) => list_estado.find((v) => val === v), {
      message: "El estado es inválido.",
    }),
});
