-- DropIndex
DROP INDEX "public"."Account_userId_idx";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "refresh_token" TEXT;
