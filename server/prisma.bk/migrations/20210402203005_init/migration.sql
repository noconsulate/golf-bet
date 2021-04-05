-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "players" INTEGER NOT NULL,
    "holes" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "scoringStyle" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
