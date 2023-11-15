import { z } from "zod";

export const serviciosShema = z.object({
  nombre: z.string({ required_error: "El nombre del servicio es requerido." }),
  descripcion: z.string({ required_error: "La descripción es requerida." }),
});
