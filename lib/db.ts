import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// check if global has prisma first, use it, global is excluded from hot reload
export const db = globalThis.prisma || new PrismaClient();

// for non production we use global prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
