import { z } from "zod";

export const mailShema = z.object({
  nombre: z.string({ required_error: "El nombre es requerido" }),
  correo: z.string({ required_error: "El correo es requerido" }),
  telefono: z.string({ required_error: "El telefono es requerido" }),
  mensage: z.string({ required_error: "El mensage es requerido" }),
});
