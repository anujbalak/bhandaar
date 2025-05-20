/*
  Warnings:

  - A unique constraint covering the columns `[asset_id]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asset_id` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "asset_id" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_asset_id_key" ON "Folder"("asset_id");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_public_id_key" ON "Folder"("public_id");
