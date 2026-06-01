-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "sex" "UserSex";
