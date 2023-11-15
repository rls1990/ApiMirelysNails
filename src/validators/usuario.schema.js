import { z } from "zod";

export const userSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido.",
      invalid_type_error: "El nombre debe ser un texto.",
    })
    .nonempty({ message: "Escriba un nombre." }),
  password: z
    .string({
      required_error: "El password es requerido.",
      invalid_type_error: "El password debe ser un texto.",
    })
    .nonempty({ message: "El password no puede estar vacío." })
    .min(6, { message: "El password de tener minimo 6 caracteres." }),
  email: z
    .string({
      required_error: "El email es requerido.",
      invalid_type_error: "El email debe ser un texto.",
    })
    .nonempty({ message: "El email no puede estar vacío." })
    .email("El email no es válido."),
  roll: z
    .string({
      required_error: "El roll es requerido.",
      invalid_type_error: "El roll debe ser un texto.",
    })
    .nonempty({ message: "El roll no puede estar vacío" })
    .refine((val) => val === "admin" || val === "user", {
      message: "El roll no es válido.",
    }),
});

export const loginSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido.",
      invalid_type_error: "El nombre debe ser un texto.",
    })
    .nonempty({ message: "usuario: no puede estar vacío" }),
  password: z
    .string({
      required_error: "El password es requerido.",
      invalid_type_error: "El password debe ser un texto.",
    })
    .nonempty({ message: "password: no puede estar vacío" })
    .min(6, { message: "El password debe tener minimo de 6 caracteres." }),
});
