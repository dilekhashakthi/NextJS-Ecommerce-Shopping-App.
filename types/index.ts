import { z } from "zod";
import { cartItemSchema, insertCardSchema, insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
};

export type Cart = z.infer<typeof insertCardSchema>
export type CartItem = z.infer<typeof cartItemSchema>
