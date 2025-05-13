import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío"),
  price: z.number().positive("El precio debe ser un número positivo"),
  stock: z.number().int().positive("El stock debe ser un número entero positivo"),
});