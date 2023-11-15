import { z } from "zod";

export const testimoniosShema = z.object({
  nombre: z.string({ required_error: "El nombre es requerido." }),
  cometario: z.string({ required_error: "El cometario es requerida." }),
  roll: z.string({ required_error: "El roll es requerido." }),
});
