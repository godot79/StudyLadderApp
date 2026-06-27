-- CreateTable
CREATE TABLE "EarnedReward" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL,
    "rewardKey" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "earnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EarnedReward_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "EarnedReward_childId_idx" ON "EarnedReward"("childId");

-- CreateIndex
CREATE INDEX "EarnedReward_sessionId_idx" ON "EarnedReward"("sessionId");
