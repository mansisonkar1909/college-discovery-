-- AlterTable
ALTER TABLE "College" ADD COLUMN "accreditation" TEXT;
ALTER TABLE "College" ADD COLUMN "city" TEXT;
ALTER TABLE "College" ADD COLUMN "hostelFees" REAL;
ALTER TABLE "College" ADD COLUMN "location" TEXT;
ALTER TABLE "College" ADD COLUMN "placementRate" REAL;
ALTER TABLE "College" ADD COLUMN "totalReviews" INTEGER;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
