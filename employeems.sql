-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2023 a las 21:10:42
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `employeems`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(2, 'Desarrollador'),
(3, 'Diseño'),
(4, 'Comercio'),
(5, 'Programador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `cuit` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `sector` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `company`
--

INSERT INTO `company` (`id`, `name`, `cuit`, `address`, `sector`) VALUES
(1, 'TechX Innovations, Inc.', '20-56894522-2', '234 Elm Street, Suite 567, Anytown, USA', 'Informática'),
(2, 'GreenWave Solutions, Ltd.', '12-56890820-7', '42 Maple Avenue, Cityville, United Kingdom', 'Telecomunicaciones'),
(3, 'StellarWidgets Co.', '12-56890222-1', '789 Pine Street, Apt 101, Metropolis, Canada', 'Marketing'),
(5, 'NovaTech Ventures, LLC', '12-50620890-1', '567 Oak Lane, Suite 101, Newville, Australia', 'Transporte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(150) NOT NULL,
  `salary` int(11) NOT NULL,
  `address` varchar(30) NOT NULL,
  `image` varchar(60) NOT NULL,
  `category_id` int(11) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `cuil` varchar(20) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `password`, `salary`, `address`, `image`, `category_id`, `last_name`, `cuil`, `company_id`) VALUES
(31, 'Andrea', 'andrea@gmail.com', '$2b$10$W4oh3h7sJbfOsWowVsD/N.2u8O4vtYWDCnA.t7kDHuS2yAIn6LZ5S', 250, 'Velez 596', 'id_1699233802816.jpg', 2, 'Ponce', '20-45897645-2', 1),
(36, 'Pedro', 'pedro@gmail.com', '$2b$10$hKUaNWWGGbxR8hB8ruZZZu.cB6h47c7i7dW/aYI4p3kDM8KC7fWrC', 250, 'Ozono 420', 'id_1699236473427.jpg', 4, 'Pascal', '20-15269784-7', 1),
(40, 'Nestor', 'nestor@gmail.com', '$2b$10$cf6MdODPRyDqo5drdOOzJ.U2F2uicsZEzRao.9.Uwk0p/KnlBWEfy', 330, 'Azul 1233', 'id_1699236663356.jpg', 2, 'Lochaco', '20-569789-1', 2),
(43, 'Franco', 'franco@gmail.com', '$2b$10$Bc0dG8xIV3rxQmNx0CRUKeFOUNEZWFS01DuMBKWZJd.6xQamdigv.', 350, 'California 23321', 'id_1699236721824.jpg', 2, 'Zurro', '20-45897412-2', 2),
(44, 'Emilia', 'emilia@gmail.com', '$2b$10$JaoCB3xpRU0eIsPzQ57LxO9ohph7nkKc.IS7gF0riYMqAXOkBSBS2', 320, 'Suipacha 123', 'id_1699236750375.jpg', 3, 'Gallardo', '20-5682756-2', 3),
(46, 'Laura', 'laura@gmail.com', '$2b$10$y2ruk/uZRQ2tzctmqLL.XelLS8/yUsYkLSPPr0LNDT4AK0p.RObCi', 525, 'Ocampo 6410', 'id_1699236791920.jpg', 2, 'Lopez', '20-30569857-1', 1),
(47, 'Luis', 'luis@gmail.com', '$2b$10$Bs88jKN0LXDfO7553nCIeOHM9iK6WsgHtw.3hbsImOX9d3Vfcr/.S', 350, 'Cuenca 3420', 'id_1699237011163.jpg', 4, 'Quiroga', '20-569485124-1', 1),
(48, 'Fabian', 'fabian@gmail.com', '$2b$10$2LsGNTk6rflo.ZRhH0zLRO8e68gg.QOOfDWDTqlNI3d6cqXmbzycq', 320, 'Salta 245', 'id_1699376107492.jpg', 2, 'Gallardo', '12-30569822-1', 2),
(49, 'Ricardo', 'ricardo@gmail.com', '$2b$10$sEEfxISI96h1VEX5mlSDpuyEe1w8zYVq3HggZRjqup14AV3m1oCGK', 220, 'Santa Fe 720', 'id_1699377959319.jpg', 2, 'Perez', '12-30598654-3', 2),
(50, 'Lorenzo', 'lorenzo@gmail.com', '$2b$10$CRx7JS2hhmYWNIWJPA0zgu9/mkdhCwlYFaIEdPXM8GP8arOJ8Paxa', 230, 'Lacasa 460', 'id_1699385435252.jpg', 2, 'Bustos', '12-31230566-2', 2),
(54, 'María', 'maria@gmail.com', '$2b$10$fGpRuZoYCtdOV3lcyCM95e9OOFO3Gk8OxX1.iA/8RW6T5A/JPHZza', 320, 'Avenida Principal 456', 'id_1699394520489.jpg', 3, 'Rodríguez', '20321234568', 1),
(55, 'Laura', 'laura1@gmail.com', '$2b$10$hOGUYtI8J5s2i.chx3vqnuVCn/9b7cai9di67uYjuRcGQ8UvuJe3a', 350, 'Avenida Norte 1011', 'id_1699394594405.jpg', 2, 'López', '20321234570', 1),
(56, 'Carlos', 'carlos@gmail.com', '$2b$10$qkHR8vU1dv8aBz7UI5/I1eBHStSmKLXDlrmZ9NenwaJyxJFwiQwEm', 560, ' Calle del Bosque 1213', 'id_1699394666598.jpg', 2, 'González', '20321234571', 1),
(57, 'Ana', 'ana@gmail.com', '$2b$10$92SgPB52S7t1d6sUEzL04.W7DUsbEoYTj7.QY5MQvWw7aoGRU5Bhq', 520, 'Avenida del Río 1415', 'id_1699394722275.jpg', 4, 'Martínez', '20321234572', 2),
(58, 'Carlos', 'carlos1@gmail.com', '$2b$10$R6NRJDH5mM7EPJnUMb51fuBdoH4EjN162gct0h/dRHMZsj.LQ4H5a', 250, 'Calle de la Luna 654', 'id_1699394857096.jpg', 3, 'García', '20321234573', 3),
(59, 'asd', 'asd@asd.com', '$2b$10$/G4HdJi7ouzKpb/F8OR3t.PnLRzwrpkEi5OAaXj/yC2ucgR5NTeLy', 250, 'asd 55', 'id_1699466803080.jpg', 2, 'asd', 'asdasd', 1),
(60, 'Sebastian ', 'sebastian@gmail.com', '$2b$10$2laE08w9ZOyv6QT8/QQbeuViLmDNbq86p7xKOSDEREyV93e52NY4W', 450, 'Salta 2300', 'id_1699480266948.jpg', 3, 'Randisi', '20-30624890-1', 2),
(61, 'Matias', 'matias@gmail.com', '$2b$10$XVCrxMZQy0cLYd3SZoflPeZ9btKnGYkQOVW.tCBZqWhYTfGxb4XFC', 520, 'Urquiza 1600', 'id_1699480729723.jpg', 2, 'Molino', '20-41580960-2', 3),
(62, 'German', 'german@gmail.com', '$2b$10$OSDWmpcC4vcQ7pzkGu.I6ususReIqv2EMm30D36XIBEgLN5XZy.Pu', 210, 'Catamarca 441', 'id_1699482554689.jpg', 2, 'Agnello', '12-29560824-1', 5),
(63, 'Michael ', 'michael@gmail.com', '$2b$10$bx3bjUVVS5VX3JPNO602ce8y0NfQooUHxGyYa7gsbyB1jHfKLDDIq', 8000, 'thriller 84', 'id_1699503005392.jpg', 3, 'Jackson', '1-11111111-1', 5),
(64, 'Kiko', 'kiko@gmail.com', '$2b$10$WcAUPhkhWL93zar4alrfkedzf3yIC.lrlPzhdZt9ih4GpZBSW9/hS', 450, 'casilla 14', 'id_1699504822845.jpg', 2, 'Federico', '21-56646-5', 1),
(65, 'Raul', 'raul@gmail.com', '$2b$10$YXNM37SevaMP/Yck9VFsbeCZfxJU1tn4AemxuKM3vgYbFp/.7DMcS', 220, 'Cafferata 1496', 'id_1699542126688.jpg', 5, 'Santoro', '12-50620892-1', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receipts`
--

CREATE TABLE `receipts` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `upload_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `receipts`
--

INSERT INTO `receipts` (`id`, `employee_id`, `file_name`, `upload_date`) VALUES
(45, 31, 'receipt_id_31_1699235139320.pdf', '2023-11-05'),
(46, 31, 'receipt_id_31_1699235784747.pdf', '2023-11-05'),
(47, 36, 'receipt_id_36_1699236617171.pdf', '2023-11-05'),
(48, 36, 'receipt_id_36_1699237033100.pdf', '2023-11-05'),
(49, 36, 'receipt_id_36_1699240455280.pdf', '2023-11-06'),
(50, 36, 'receipt_id_36_1699240460274.pdf', '2023-11-06'),
(51, 31, 'receipt_id_31_1699331606054.pdf', '2023-11-07'),
(52, 44, 'receipt_id_44_1699332219448.pdf', '2023-11-07'),
(53, 48, 'receipt_id_48_1699376596251.pdf', '2023-11-07'),
(54, 31, 'receipt_id_31_1699376909943.pdf', '2023-11-07'),
(55, 48, 'receipt_id_48_1699377040319.pdf', '2023-11-07'),
(56, 47, 'receipt_id_47_1699377169381.pdf', '2023-11-07'),
(57, 46, 'receipt_id_46_1699377309553.pdf', '2023-11-07'),
(58, 43, 'receipt_id_43_1699377339453.pdf', '2023-11-07'),
(59, 43, 'receipt_id_43_1699377348964.pdf', '2023-11-07'),
(60, 43, 'receipt_id_43_1699377387824.pdf', '2023-11-07'),
(61, 40, 'receipt_id_40_1699377444835.pdf', '2023-11-07'),
(62, 44, 'receipt_id_44_1699377484692.pdf', '2023-11-07'),
(63, 43, 'receipt_id_43_1699377663368.pdf', '2023-11-07'),
(64, 49, 'receipt_id_49_1699377997557.pdf', '2023-11-07'),
(65, 49, 'receipt_id_49_1699378002642.pdf', '2023-11-07'),
(66, 49, 'receipt_id_49_1699378007779.pdf', '2023-11-07'),
(67, 36, 'receipt_id_36_1699378013823.pdf', '2023-11-07'),
(68, 47, 'receipt_id_47_1699378021681.pdf', '2023-11-07'),
(69, 43, 'receipt_id_43_1699378027085.pdf', '2023-11-07'),
(70, 40, 'receipt_id_40_1699378280462.pdf', '2023-11-07'),
(71, 31, 'receipt_id_31_1699378464983.pdf', '2023-11-07'),
(72, 40, 'receipt_id_40_1699378591901.pdf', '2023-11-07'),
(73, 31, 'receipt_id_31_1699378750109.pdf', '2023-11-07'),
(74, 40, 'receipt_id_40_1699379324930.pdf', '2023-11-07'),
(75, 46, 'receipt_id_46_1699502855586.pdf', '2023-11-09'),
(76, 36, 'receipt_id_36_1699502862108.pdf', '2023-11-09'),
(77, 60, 'receipt_id_60_1699502883281.pdf', '2023-11-09'),
(78, 61, 'receipt_id_61_1699502890001.pdf', '2023-11-09'),
(79, 65, 'receipt_id_65_1699542180906.pdf', '2023-11-09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `company_name` (`company_id`);

--
-- Indices de la tabla `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receipts_employee` (`employee_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Filtros para la tabla `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `fk_receipts_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
