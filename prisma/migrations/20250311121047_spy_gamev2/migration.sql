-- CreateTable
CREATE TABLE "SpyGameWordCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SpyGameWord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "SpyGameWord_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SpyGameWordCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
