/*
  Warnings:

  - The primary key for the `History` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `historyId` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "History" DROP CONSTRAINT "History_pkey",
DROP COLUMN "historyId",
ADD COLUMN     "historyId" SERIAL NOT NULL,
ADD CONSTRAINT "History_pkey" PRIMARY KEY ("historyId");
