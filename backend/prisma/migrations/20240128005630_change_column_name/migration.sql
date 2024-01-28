/*
  Warnings:

  - You are about to drop the column `is_available` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "is_available",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
