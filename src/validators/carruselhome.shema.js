import { z } from "zod";

export const carruselhomeShema = z.object({
  titulo: z.string({ required_error: "El titulo es requerido." }),
  descripcion: z.string({ required_error: "La descripción es requerida." }),
});
