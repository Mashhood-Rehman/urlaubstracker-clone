-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "title_fr" TEXT NOT NULL,
    "desc_fr" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "price_per_night" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION,
    "currency" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "review_count" INTEGER,
    "amenities" JSONB NOT NULL,
    "check_in" TEXT NOT NULL,
    "check_out" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);
