
import { PrismaClient } from './app/generated/prisma/client'

try {
    const prisma = new PrismaClient({} as any)
    console.log('Successfully instantiated PrismaClient with {}')
} catch (e) {
    console.error(e)
}
