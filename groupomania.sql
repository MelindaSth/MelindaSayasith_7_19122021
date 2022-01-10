-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`_prisma_migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`_prisma_migrations` (
  `id` VARCHAR(36) NOT NULL,
  `checksum` VARCHAR(64) NOT NULL,
  `finished_at` DATETIME(3) NULL DEFAULT NULL,
  `migration_name` VARCHAR(255) NOT NULL,
  `logs` TEXT NULL DEFAULT NULL,
  `rolled_back_at` DATETIME(3) NULL DEFAULT NULL,
  `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` INT UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(191) NOT NULL,
  `firstname` VARCHAR(191) NOT NULL,
  `jobtitle` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `isAdmin` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `content` VARCHAR(191) NOT NULL,
  `imageUrl` VARCHAR(191) NULL DEFAULT NULL,
  `viewCount` INT NOT NULL DEFAULT '0',
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Post_userId_fkey` (`userId` ASC) VISIBLE,
  CONSTRAINT `Post_userId_fkey`
    FOREIGN KEY (`userId`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `content` VARCHAR(191) NOT NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Comment_userId_fkey` (`userId` ASC) VISIBLE,
  INDEX `Comment_postId_fkey` (`postId` ASC) VISIBLE,
  CONSTRAINT `Comment_postId_fkey`
    FOREIGN KEY (`postId`)
    REFERENCES `groupomania`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Comment_userId_fkey`
    FOREIGN KEY (`userId`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
