-- CreateTable
CREATE TABLE "Rental" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainHeading" TEXT NOT NULL,
    "mainDescription" TEXT NOT NULL,
    "offer" JSONB NOT NULL,
    "whySuperDeal" TEXT NOT NULL,
    "thingsToDo" JSONB NOT NULL,
    "additionalInfo" JSONB NOT NULL,
    "ecoTip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);
