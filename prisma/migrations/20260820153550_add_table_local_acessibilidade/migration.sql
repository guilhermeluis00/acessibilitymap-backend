-- CreateTable
CREATE TABLE "localAcessibilidade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "accessibilityType" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visualization" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "localAcessibilidade_pkey" PRIMARY KEY ("id")
);
