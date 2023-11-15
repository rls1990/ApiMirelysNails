import { z } from "zod";

export const preguntasShema = z.object({
  pregunta: z.string({ required_error: "La pregunta es requrida." }),
  respuesta: z.string({ required_error: "La respuesta es requerida." }),
});
