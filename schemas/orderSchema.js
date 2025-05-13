import { z } from "zod";

export const orderSchema = z.object({
  customer_name: z.string({required_error:"Este campo es obligatorio."}).min(1, "El nombre del comprador no puede estar vacío"),
  products: z.array(
    z.object({
      product_id: z.number({
        required_error: "product_id es obligatorio",
        invalid_type_error: "product_id debe ser un número",
      }),
      amount: z.number({
        required_error: "amount es obligatorio",
        invalid_type_error: "amount debe ser un número",
      }),
    }),
    {required_error:"Este campo es obligatorio."}
  ).min(1, "Debe incluir al menos un producto"),
});
