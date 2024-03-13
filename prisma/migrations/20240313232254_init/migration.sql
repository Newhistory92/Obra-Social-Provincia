/*
  Warnings:

  - You are about to drop the column `createdAt` on the `afiliado` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `afiliado` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `operador` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `operador` table. All the data in the column will be lost.
  - You are about to drop the column `dni` on the `operador` table. All the data in the column will be lost.
  - You are about to drop the column `privilegios` on the `operador` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `operador` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `prestador` table. All the data in the column will be lost.
  - You are about to drop the column `dni` on the `prestador` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `prestador` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `prestador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - Added the required column `dataTime` to the `Afiliado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `Prestador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Prestador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `afiliado` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `addressId` VARCHAR(191) NULL,
    ADD COLUMN `dataTime` DATETIME(3) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `operador` DROP COLUMN `area`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `dni`,
    DROP COLUMN `privilegios`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `addressId` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'employee',
    MODIFY `numeroOperador` VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `prestador` DROP COLUMN `createdAt`,
    DROP COLUMN `dni`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `addressId` VARCHAR(191) NULL DEFAULT 'No Fidelizado',
    ADD COLUMN `apellido` VARCHAR(20) NOT NULL,
    ADD COLUMN `descripcion` VARCHAR(600) NOT NULL,
    ADD COLUMN `phoneopc` VARCHAR(13) NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'provider',
    MODIFY `name` VARCHAR(20) NOT NULL,
    MODIFY `matricula` VARCHAR(5) NOT NULL,
    MODIFY `puntuacion` INTEGER NULL;

-- CreateTable
CREATE TABLE `Publicacion` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `contenido` VARCHAR(191) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opinion` (
    `id` VARCHAR(191) NOT NULL,
    `contenido` VARCHAR(191) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Denuncia` (
    `id` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NULL,
    `locality` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Afiliado` ADD CONSTRAINT `Afiliado_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestador` ADD CONSTRAINT `Prestador_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operador` ADD CONSTRAINT `Operador_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Operador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Opinion` ADD CONSTRAINT `Opinion_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Afiliado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Denuncia` ADD CONSTRAINT `Denuncia_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Afiliado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
