-- CreateTable
CREATE TABLE "addresses" (
    "address_id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("address_id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
