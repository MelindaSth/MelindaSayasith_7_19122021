/*
  Warnings:

  - You are about to alter the column `userId` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - Made the column `content` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `comment` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL,
    MODIFY `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
