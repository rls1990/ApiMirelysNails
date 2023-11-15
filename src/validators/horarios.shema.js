import { z } from "zod";

export const horariosShema = z.object({
  titulo: z.string({ required_error: "El título es requerido." }),
  rango: z.string({ required_error: "El rango es requerido." }),
});
