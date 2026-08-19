/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PerfilUsuario" AS ENUM ('DEFICIENCIA_VISUAL', 'DEFICIENCIA_FISICA', 'DEFICIENCIA_AUDITIVA', 'DEFICIENCIA_MOTORA', 'NENHUMA');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "PerfilUsuario" NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localizationLatitude" TEXT,
    "localizationLongetude" TEXT,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
