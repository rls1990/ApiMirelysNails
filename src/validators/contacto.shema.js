import { z } from "zod";

export const contactoShema = z.object({
  descripcion: z.string({ required_error: "La descripción es requerido." }),
  direccion: z.string({ required_error: "La direccion es requerida." }),
  telefonos: z.string({ required_error: "Los teléfonos son requeridos." }),
  correos: z.string({ required_error: "Los correos son requeridos." }),
});
