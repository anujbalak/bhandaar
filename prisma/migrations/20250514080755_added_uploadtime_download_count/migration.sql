-- AlterTable
ALTER TABLE "File" ADD COLUMN     "downloadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uploadtime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
