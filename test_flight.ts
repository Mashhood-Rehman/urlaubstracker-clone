import "dotenv/config";
import { PrismaClient } from './app/generated/prisma';
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Checking prisma.flight...");
    if ('flight' in prisma) {
        console.log("✅ flight exists on prisma object");
        // @ts-ignore
        const count = await prisma.flight.count();
        console.log(`Current flight count: ${count}`);
    } else {
        console.log("❌ flight does NOT exist on prisma object");
        console.log("Keys available on prisma:", Object.keys(prisma));
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
