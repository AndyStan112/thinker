/*
  Warnings:

  - You are about to drop the column `experience` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `sourceType` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finished` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('deck', 'task');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('Question', 'Flashcard', 'MultipleChoice');

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sourceType" "SourceType" NOT NULL;

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "experience";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "finished" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "answer" TEXT,
    "experience" INTEGER NOT NULL,
    "timesShown" INTEGER NOT NULL,
    "timesCorrect" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeckToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeckToSubject_AB_unique" ON "_DeckToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_DeckToSubject_B_index" ON "_DeckToSubject"("B");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeckToSubject" ADD CONSTRAINT "_DeckToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeckToSubject" ADD CONSTRAINT "_DeckToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
