import { z } from "zod";
import {
  cartItemSchema,
  insertCardSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  insertReviewSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
};

export type Cart = z.infer<typeof insertCardSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = Omit<z.infer<typeof insertOrderSchema>, "userId"> & {
  id: string;
  userId: string | null;
  createdAt: Date | null;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string | null; email: string | null } | null;
};
export type PaymentResult = z.infer<typeof paymentResultSchema>
export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};
