import { z } from "zod";

export const preciosShema = z.object({
  titulo: z.string({ required_error: "El título es requerido." }),
  precio: z.string({ required_error: "El precio es requerido." }),
  duracion: z.string({
    required_error: "La duración de la seción es requerida.",
  }),
});
