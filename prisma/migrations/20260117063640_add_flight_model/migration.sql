-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "arrivalCity" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "flightClass" TEXT NOT NULL,
    "baggage" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "whyAdore" JSONB NOT NULL,
    "flexibleDates" BOOLEAN NOT NULL DEFAULT false,
    "extras" JSONB,
    "tips" JSONB,
    "offerLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);
