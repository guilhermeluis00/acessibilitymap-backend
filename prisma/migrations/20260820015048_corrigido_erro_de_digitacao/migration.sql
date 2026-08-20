/*
  Warnings:

  - You are about to drop the column `localizationLongetude` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "localizationLongetude",
ADD COLUMN     "localizationLongitude" TEXT;
