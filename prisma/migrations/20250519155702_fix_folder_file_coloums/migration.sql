/*
  Warnings:

  - You are about to drop the column `asset_id` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[asset_id]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asset_id` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Folder_asset_id_key";

-- DropIndex
DROP INDEX "Folder_public_id_key";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "asset_id" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "asset_id",
DROP COLUMN "public_id",
DROP COLUMN "url";

-- CreateIndex
CREATE UNIQUE INDEX "File_asset_id_key" ON "File"("asset_id");

-- CreateIndex
CREATE UNIQUE INDEX "File_public_id_key" ON "File"("public_id");
