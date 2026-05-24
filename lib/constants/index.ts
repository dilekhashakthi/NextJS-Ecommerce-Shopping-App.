export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ProStore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern E commerce platform built with Next.js and TypeScript";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SEVER_URL || "https://localhost:3000";

export const LATEST_PRODUCT_LIMIT =
  Number(process.env.LATEST_PRODUCT_LIMIT) || 4;

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "Jone Deo",
  streetAddress: "123 Main st",
  city: "Anytown",
  postalCode: "12345",
  country: "USA",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: '',
  slug: '',
  categoty: '',
  image: [],
  brand: '',
  description: '',
  price: '0',
  stock: '0',
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
}