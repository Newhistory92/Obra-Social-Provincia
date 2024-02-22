-- CreateTable
CREATE TABLE `Afiliado` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `imageUrl` VARCHAR(800) NOT NULL,
    `dni` INTEGER NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operador` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `imageUrl` VARCHAR(800) NOT NULL,
    `dni` INTEGER NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `dataTime` DATETIME(3) NOT NULL,
    `area` VARCHAR(150) NOT NULL,
    `numeroOperador` INTEGER NOT NULL,
    `privilegios` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prestador` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `dni` INTEGER NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `imageUrl` VARCHAR(800) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `dataTime` DATETIME(3) NOT NULL,
    `matricula` INTEGER NOT NULL,
    `especialidad` VARCHAR(150) NOT NULL,
    `puntuacion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
