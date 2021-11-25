-- AlterTable
ALTER TABLE `User` ADD COLUMN `postId` INTEGER NULL;

-- CreateTable
CREATE TABLE `_like` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_like_AB_unique`(`A`, `B`),
    INDEX `_like_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
