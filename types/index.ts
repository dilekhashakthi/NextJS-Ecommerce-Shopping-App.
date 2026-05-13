import { z } from "zod";
import {
  cartItemSchema,
  insertCardSchema,
  insertProductSchema,
  shippingAddressSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
};

export type Cart = z.infer<typeof insertCardSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
