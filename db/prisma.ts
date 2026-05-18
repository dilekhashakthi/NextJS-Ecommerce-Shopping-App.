import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
// Only applies in Node.js runtime (not edge), to avoid WebSocket errors in server components.
if (typeof WebSocket === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require("ws");
}

const connectionString = `${process.env.DATABASE_URL}`;

// Instantiates the Prisma adapter using the Neon connection string to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon({ connectionString });

// Stores the Prisma client on the global object to prevent multiple instances during hot reload in development.
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient>;
  prismaBase: PrismaClient;
};

// Creates a new Prisma client with the Neon adapter and extends it with custom result transformers.
function createPrismaClient() {
  const base = new PrismaClient({ adapter });
  const extended = base.$extends({
    result: {
      product: {
        // Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
        price: {
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString();
          },
        },
      },
      cart: {
        itemsPrice: {
          needs: { itemsPrice: true },
          compute(cart) {
            return cart.itemsPrice.toString();
          },
        },
        shippingPrice: {
          needs: { shippingPrice: true },
          compute(cart) {
            return cart.shippingPrice.toString();
          },
        },
        taxPrice: {
          needs: { taxPrice: true },
          compute(cart) {
            return cart.taxPrice.toString();
          },
        },
        totalPrice: {
          needs: { totalPrice: true },
          compute(cart) {
            return cart.totalPrice.toString();
          },
        },
      },
      order: {
        itemsPrice: {
          needs: { itemsPrice: true },
          compute(cart) {
            return cart.itemsPrice.toString();
          },
        },
        shippingPrice: {
          needs: { shippingPrice: true },
          compute(cart) {
            return cart.shippingPrice.toString();
          },
        },
        taxPrice: {
          needs: { taxPrice: true },
          compute(cart) {
            return cart.taxPrice.toString();
          },
        },
        totalPrice: {
          needs: { totalPrice: true },
          compute(cart) {
            return cart.totalPrice.toString();
          },
        },
      },
      orderItem: {
        price: {
          compute(cart) {
            return cart.price.toString()
          },
        },
      },
    },
  });
  return { base, extended };
}

const clients = globalForPrisma.prisma ?? createPrismaClient();

// The extended client — use for most queries (has custom price/rating transformers)
export const prisma = clients.extended;

// The base client — use inside $transaction callbacks where extended types break
export const prismaBase = clients.base;

// Only cache the Prisma instance globally in development to avoid exhausting database connections.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = clients;
  globalForPrisma.prismaBase = clients.base;
}
