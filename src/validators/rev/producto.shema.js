import { z } from "zod";

export const productoSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido.",
      invalid_type_error: "El nombre debe ser un texto.",
    })
    .nonempty({ message: "Escriba un nombre." }),
  modelo: z
    .string({
      required_error: "El modelo es requerido.",
      invalid_type_error: "El modelo debe ser un texto.",
    })
    .nonempty({ message: "Escriba un modelo." }),
  cantidad_total: z
    .preprocess((val) => {
      return Number(val);
    }, z.number({ invalid_type_error: "La cantidad total debe ser un número." }).min(1, { message: "La cantidad total debe ser mayor que cero." }))
    .optional(),
  precio_cliente: z
    .preprocess((val) => {
      return Number(val);
    }, z.number({ invalid_type_error: "El precio del cliente debe ser un número." }).min(1, { message: "La cantidad total debe ser mayor que cero." }))
    .optional(),
  costo_envio_cliente: z
    .preprocess((val) => {
      return Number(val);
    }, z.number({ invalid_type_error: "El costo de envio al cliente debe ser un número." }).min(1, { message: "El costo de envio al cliente debe ser mayor que cero." }))
    .optional(),
  costo_unidad: z
    .preprocess((val) => {
      return Number(val);
    }, z.number({ invalid_type_error: "El costo por unidad debe ser un número." }).min(1, { message: "El costo por unidad debe ser mayor que cero." }))
    .optional(),
  costo_transporte: z
    .preprocess((val) => {
      return Number(val);
    }, z.number({ invalid_type_error: "El costo de transporte debe ser un número." }).min(1, { message: "El costo de transporte debe ser mayor que cero." }))
    .optional(),
  peso_kg: z
    .preprocess((val) => {
      return Number(val);
    }, z.number({ invalid_type_error: "El peso en kg debe ser un número." }).min(1, { message: "El peso en kg debe ser mayor que cero." }))
    .optional(),
});

export const precioSchema = z.object({
  precio: z.preprocess((val) => {
    return Number(val);
  }, z.number({ invalid_type_error: "El precio debe ser un numero" }).min(1, { message: "El precio debe ser mayor que cero." })),
  ci: z.preprocess((val) => {
    return Number(val);
  }, z.number({ invalid_type_error: "La cantidad inicial debe ser un numero" }).min(1, { message: "La cantidad inicial debe ser mayor que cero." })),
  cf: z.preprocess((val) => {
    return Number(val);
  }, z.number({ invalid_type_error: "La cantidad final debe ser un numero" }).min(1, { message: "La cantidad final debe ser mayor que cero." })),
});

export const colorSchema = z.object({
  color: z
    .string({
      required_error: "El color es requerido.",
      invalid_type_error: "El color debe ser un texto.",
    })
    .nonempty({ message: "Escriba un color." }),
  cantidad: z.preprocess((val) => {
    return Number(val);
  }, z.number({ invalid_type_error: "La cantidad debe ser un numero" }).min(1, { message: "La cantidad debe ser mayor que cero." })),
});
