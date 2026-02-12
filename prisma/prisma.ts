/**
 * Responsável por criar cache do client do prisma.
 * Evita que toda vez que chamar o serviço do Prisma fique recriando o client
 */
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });

export const prismaClient =
  globalForPrisma.prisma || new PrismaClient({ adapter });

globalForPrisma.prisma = prismaClient;
