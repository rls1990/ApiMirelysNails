import { z } from "zod";

export const equipoShema = z.object({
  nombre: z.string({ required_error: "El nombre es requerido." }),
  roll: z.string({ required_error: "El roll es requerido." }),
  cometario: z.string({ required_error: "El comentario es requerido." }),
});
