import "dotenv/config";
import { PrismaClient } from "./app/generated/prisma";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

// Create a connection pool for Neon
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

// Create the Neon adapter
const adapter = new PrismaNeon(pool);

// Instantiate Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.$connect();
    console.log("✅ Prisma connected successfully");
    await prisma.$disconnect();
}

main().catch(console.error);
