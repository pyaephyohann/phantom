/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Gender` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Size` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "Gender" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "isArchived";
