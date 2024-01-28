-- DropForeignKey
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_product_id_fkey";

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
