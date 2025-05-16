-- DropIndex
DROP INDEX "Folder_parentFolderId_key";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "home" BOOLEAN NOT NULL DEFAULT true;
