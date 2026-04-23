export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ProStore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern E commerce platform built with Next.js and TypeScript";
export const SERVER_URL = process.env.NEXT_PUBLIC_SEVER_URL || "https://localhost:3000"
export const LATEST_PRODUCT_LIMIT = Number(process.env.LATEST_PRODUCT_LIMIT) || 4