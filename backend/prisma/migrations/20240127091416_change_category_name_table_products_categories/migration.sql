/*
  Warnings:

  - The primary key for the `products_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `products_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_name` to the `products_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_category_id_fkey";

-- AlterTable
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_pkey",
DROP COLUMN "category_id",
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD CONSTRAINT "products_categories_pkey" PRIMARY KEY ("product_id", "category_name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE;
