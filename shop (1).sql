-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2022 at 05:53 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `id` int(11) NOT NULL,
  `product_detail_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `cartitems`
--
DELIMITER $$
CREATE TRIGGER `update_cart` BEFORE INSERT ON `cartitems` FOR EACH ROW update carts set count = count + NEW.quantity, total = total + (NEW.quantity * NEW.product_price) where id = NEW.cart_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_cart_2` AFTER UPDATE ON `cartitems` FOR EACH ROW update carts set count = count + NEW.quantity - OLD.quantity, total = total + (NEW.quantity * NEW.product_price) - (OLD.quantity * OLD.product_price) where id = NEW.cart_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_cart_3` AFTER DELETE ON `cartitems` FOR EACH ROW update carts set count = count - OLD.quantity, total = total - (OLD.quantity * OLD.product_price) where id = OLD.cart_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `count`, `user_id`, `total`, `createdAt`, `updatedAt`) VALUES
(1, 0, 2, 0, '2022-05-06 09:15:36', '2022-05-06 09:15:36'),
(2, 0, 3, 0, '2022-05-06 09:15:39', '2022-05-06 09:15:39'),
(4, 0, 7, 0, '2022-05-06 10:21:13', '2022-05-06 10:21:13');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `group_category_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `code`, `slug`, `group_category_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo thun nam', 'ATN', 'ao-thun-nam', 1, '2022-05-06 05:36:49', '2022-05-06 05:36:49');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `value`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'Trắng', 'TRG', '2022-05-05 21:05:50', '2022-05-05 21:05:50'),
(2, 'Đen', 'DEN', '2022-05-05 21:06:16', '2022-05-05 21:10:12'),
(3, 'Đỏ', 'DDO', '2022-05-05 21:06:39', '2022-05-05 21:06:39'),
(4, 'Vàng', 'VAG', '2022-05-05 21:06:53', '2022-05-05 21:06:53'),
(5, 'Xanh', 'XAH', '2022-05-05 21:07:02', '2022-05-05 21:07:02'),
(6, 'Hồng', 'HOG', '2022-05-05 21:07:22', '2022-05-05 21:07:22'),
(7, 'Hồng đất', 'HDT', '2022-05-05 22:56:09', '2022-05-05 22:56:09'),
(8, 'Đen xám', 'DXM', '2022-05-09 07:51:10', '2022-05-09 07:51:10');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `percent` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `finish` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `value`, `percent`, `description`, `finish`, `createdAt`, `updatedAt`) VALUES
(1, 'Không', 0, 0, '', NULL, '2022-05-06 11:32:42', '2022-05-06 11:32:42');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `percent` float DEFAULT NULL,
  `finish` datetime DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Nam', 'nam', '2022-05-06 05:36:01', '2022-05-06 05:36:01'),
(2, 'Nữ', 'nu', '2022-05-06 05:36:09', '2022-05-06 05:36:09'),
(3, 'Trẻ em', 'tre-em', '2022-05-06 05:36:16', '2022-05-06 05:36:16');

-- --------------------------------------------------------

--
-- Table structure for table `groupcategories`
--

CREATE TABLE `groupcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupcategories`
--

INSERT INTO `groupcategories` (`id`, `name`, `slug`, `gender_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo nam', 'ao-nam', 1, '2022-05-06 05:36:36', '2022-05-06 05:36:36'),
(2, 'Quần nam', 'quan-nam', 1, '2022-05-09 15:10:39', '2022-05-09 15:10:39'),
(3, 'Phụ kiện nam', 'phu-kien-nam', 1, '2022-05-09 15:10:47', '2022-05-09 15:10:47'),
(4, 'Áo nữ', 'ao-nu', 2, '2022-05-09 15:10:56', '2022-05-09 15:10:56'),
(5, 'Quần nữ', 'quan-nu', 2, '2022-05-09 15:11:01', '2022-05-09 15:11:01'),
(6, 'Phụ kiện nữ', 'phu-kien-nu', 2, '2022-05-09 15:11:07', '2022-05-09 15:11:07'),
(7, 'Áo trẻ em', 'ao-tre-em', 3, '2022-05-09 15:11:17', '2022-05-09 15:11:17'),
(8, 'Quần trẻ em', 'quan-tre-em', 3, '2022-05-09 15:11:30', '2022-05-09 15:11:30'),
(9, 'Phụ kiện trẻ em', 'phu-kien-tre-em', 3, '2022-05-09 15:11:36', '2022-05-09 15:11:36');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product_id`, `color_id`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 1, 7, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021277/ppm4001-hdt-3_efhpqt.jpg', '2022-05-08 21:48:09', '2022-05-08 21:48:09'),
(2, 1, 7, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021187/ppm4001-hdt-2_fg5orr.webp', '2022-05-08 21:48:18', '2022-05-08 21:48:18'),
(3, 1, 7, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021186/ppm4001-hdt-qam4003-den-2_xwk1sq.webp', '2022-05-08 21:48:25', '2022-05-08 21:48:25'),
(4, 1, 7, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021186/ppm4001-hdt-qam4003-den-1-1d87b4a5-dbec-4eb8-b986-394b9b4964fe_wbtnjc.webp', '2022-05-08 21:48:32', '2022-05-08 21:48:32'),
(5, 1, 7, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021187/ppm4001-hdt-4_b16axd.webp', '2022-05-08 21:48:38', '2022-05-08 21:48:38'),
(6, 1, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021540/ppm4001-den-sjm3065-xah-2_ufhsnz.webp', '2022-05-08 21:52:32', '2022-05-08 21:52:32'),
(7, 1, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021539/ppm4001-den-sjm3065-xah-1_jdoho6.webp', '2022-05-08 21:52:39', '2022-05-08 21:52:39'),
(8, 1, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652021541/ppm4001-den-sjm3065-xah-ppn4134-den-sjn3070-xdm-1_lvkzz0.webp', '2022-05-08 21:52:45', '2022-05-08 21:52:45'),
(9, 2, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651119843/xkefepjonxj29j01uef0.webp', '2022-05-09 07:23:28', '2022-05-09 07:23:28'),
(10, 2, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651119861/l34rgvuiz18e90ras94g.webp', '2022-05-09 07:23:36', '2022-05-09 07:23:36'),
(11, 2, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651119848/q9uu3ky6mw9dconh3wzx.webp', '2022-05-09 07:23:43', '2022-05-09 07:23:43'),
(12, 2, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651119865/fsmepkn4utl53ycv2asl.webp', '2022-05-09 07:23:50', '2022-05-09 07:23:50'),
(13, 2, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1651119854/lu15s8tzhqwcq0xnpctf.webp', '2022-05-09 07:23:57', '2022-05-09 07:23:57'),
(14, 3, 5, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057420/stm5041-xah-2_i0pek5.webp', '2022-05-09 07:51:54', '2022-05-09 07:51:54'),
(15, 3, 5, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057419/stm5041-xah-1_z27gfl.webp', '2022-05-09 07:52:05', '2022-05-09 07:52:05'),
(16, 3, 5, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057420/stm5041-xah-4_gse9dq.webp', '2022-05-09 07:52:15', '2022-05-09 07:52:15'),
(17, 3, 5, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057421/stm5041-xah-5_cj6bh0.webp', '2022-05-09 07:52:22', '2022-05-09 07:52:22'),
(18, 3, 8, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057419/stm5041-dch-2_yj01f7.webp', '2022-05-09 07:52:41', '2022-05-09 07:52:41'),
(19, 3, 8, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057420/stm5041-dch-3_fub964.webp', '2022-05-09 07:52:49', '2022-05-09 07:52:49'),
(20, 3, 8, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057420/stm5041-dch-1_nmlgxw.webp', '2022-05-09 07:52:56', '2022-05-09 07:52:56'),
(21, 3, 8, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057420/stm5041-dch-4_isk7lt.webp', '2022-05-09 07:53:03', '2022-05-09 07:53:03'),
(22, 4, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057769/tsm5053-den-2_smmafr.webp', '2022-05-09 07:56:59', '2022-05-09 07:56:59'),
(23, 4, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057769/tsm5053-den-1_mtk3y6.webp', '2022-05-09 07:57:07', '2022-05-09 07:57:07'),
(24, 4, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057773/tsm5053-den-5_vvduqw.jpg', '2022-05-09 07:57:14', '2022-05-09 07:57:14'),
(25, 4, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057770/tsm5053-tra-3_qt7i9c.jpg', '2022-05-09 07:57:25', '2022-05-09 07:57:25'),
(26, 4, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057772/tsm5053-tra-1_az9yp0.jpg', '2022-05-09 07:57:40', '2022-05-09 07:57:40'),
(27, 4, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652057778/tsm5053-tra-4_rq48vw.jpg', '2022-05-09 07:57:47', '2022-05-09 07:57:47'),
(28, 5, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-tra-4_oevvgw.webp', '2022-05-09 08:00:33', '2022-05-09 08:00:33'),
(29, 5, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-tra-1_rrj30j.webp', '2022-05-09 08:00:43', '2022-05-09 08:00:43'),
(30, 5, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-tra-5_ixyqaw.webp', '2022-05-09 08:00:50', '2022-05-09 08:00:50'),
(31, 5, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-den-4_mukkya.webp', '2022-05-09 08:00:58', '2022-05-09 08:00:58'),
(32, 5, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-den-1_yybjra.webp', '2022-05-09 08:01:04', '2022-05-09 08:01:04'),
(33, 5, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-den-6_z6f9ad.webp', '2022-05-09 08:01:11', '2022-05-09 08:01:11'),
(34, 6, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652059649/tsm5125-tra-2_iptuof.webp', '2022-05-09 08:27:45', '2022-05-09 08:27:45'),
(35, 6, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652059649/tsm5125-tra-1_hkoft6.webp', '2022-05-09 08:27:52', '2022-05-09 08:27:52'),
(36, 6, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652058023/tsm5097-tra-5_ixyqaw.webp', '2022-05-09 08:27:58', '2022-05-09 08:27:58'),
(37, 6, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652059649/tsm5125-den-2_xksgie.webp', '2022-05-09 08:28:07', '2022-05-09 08:28:07'),
(38, 6, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652059649/tsm5125-den-1_y3nwvi.webp', '2022-05-09 08:28:16', '2022-05-09 08:28:16'),
(39, 6, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652059649/tsm5125-den-6_zvgpth.webp', '2022-05-09 08:28:24', '2022-05-09 08:28:24'),
(40, 7, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109195/stm5023-den2_sxdibw.webp', '2022-05-09 22:14:24', '2022-05-09 22:14:24'),
(41, 7, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109195/stm5023-den3_id9vzy.webp', '2022-05-09 22:14:33', '2022-05-09 22:14:33'),
(42, 7, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109195/stm5023-den5_vknycc.webp', '2022-05-09 22:14:39', '2022-05-09 22:14:39'),
(43, 7, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109195/stm5023-tra3_vbdslt.webp', '2022-05-09 22:14:50', '2022-05-09 22:14:50'),
(44, 8, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109195/tsm5031-den-1-jpg_lel5ru.webp', '2022-05-09 22:15:14', '2022-05-09 22:15:14'),
(45, 8, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109196/tsm5031-den-6_t7nbzb.webp', '2022-05-09 22:15:59', '2022-05-09 22:15:59'),
(46, 8, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109196/tsm5031-tra-1-jpg_fpncgh.webp', '2022-05-09 22:16:11', '2022-05-09 22:16:11'),
(47, 8, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109195/tsm5031-tra-3_by8llw.webp', '2022-05-09 22:16:18', '2022-05-09 22:16:18'),
(48, 8, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109196/tsm5031-tra-7_aaeg95.webp', '2022-05-09 22:16:30', '2022-05-09 22:16:30'),
(49, 9, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109198/tsm5131-tra-4-058ee407-fa45-4996-8e2b-6e7b0c3596d8_zmxl6r.webp', '2022-05-09 22:16:49', '2022-05-09 22:16:49'),
(50, 9, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109197/tsm5131-tra-1-8060932d-e346-4d7d-96ff-cf1cb9dbe380_tpqern.webp', '2022-05-09 22:16:56', '2022-05-09 22:16:56'),
(51, 9, 1, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109198/tsm5131-tra-6_g286xq.webp', '2022-05-09 22:17:04', '2022-05-09 22:17:04'),
(52, 9, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109196/tsm5131-den-2_tfiwxk.webp', '2022-05-09 22:17:15', '2022-05-09 22:17:15'),
(53, 9, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109196/tsm5131-den-1_p5cl4r.webp', '2022-05-09 22:17:26', '2022-05-09 22:17:26'),
(54, 9, 2, 'https://res.cloudinary.com/dwhjftwvw/image/upload/v1652109198/tsm5131-den-6_s6bpwz.webp', '2022-05-09 22:17:32', '2022-05-09 22:17:32');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'Sandex', '2022-05-07 16:12:32', '2022-05-07 16:12:32'),
(2, 'Cotton', '2022-05-07 16:12:40', '2022-05-07 16:12:40');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_detail_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `order_id`, `product_detail_id`, `quantity`, `product_price`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 249000, '2022-05-06 12:04:37', '2022-05-06 12:07:28'),
(2, 1, 6, 1, 249000, '2022-05-06 12:16:45', '2022-05-06 12:16:45'),
(3, 3, 41, 1, 269000, '2022-05-09 16:15:43', '2022-05-09 16:15:43');

--
-- Triggers `orderitems`
--
DELIMITER $$
CREATE TRIGGER `update_amount_2` AFTER DELETE ON `orderitems` FOR EACH ROW update productdetails set amount = amount + OLD.quantity where id = OLD.product_detail_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_detail_amount` AFTER INSERT ON `orderitems` FOR EACH ROW update productdetails set amount = amount - NEW.quantity where id = NEW.product_detail_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_detail_amount_1` AFTER UPDATE ON `orderitems` FOR EACH ROW update productdetails set amount = amount - NEW.quantity + OLD.quantity where id = NEW.product_detail_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `address`, `telephone`, `order_status_id`, `coupon_id`, `createdAt`, `updatedAt`) VALUES
(1, 7, 498000, '115/20 Hoàng Hoa Thám, Phường 2, Thành phố Tân An, tỉnh Long An', '0385981198', 1, 1, '2022-05-06 12:13:35', '2022-05-06 12:15:15'),
(3, 7, 269000, '115/20 Hoàng Hoa Thám, Phường 2, Thành phố Tân An, Tỉnh Long An', '0385981196', 1, 1, '2022-05-09 16:15:43', '2022-05-09 16:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `orderstatuses`
--

CREATE TABLE `orderstatuses` (
  `id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderstatuses`
--

INSERT INTO `orderstatuses` (`id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Pending', 'Đang xử lý', '2022-05-06 11:38:42', '2022-05-06 11:38:42'),
(2, 'Confirmed', 'Đã xác nhận', '2022-05-06 11:39:00', '2022-05-06 11:48:33'),
(3, 'Deliveried', 'Đã giao', '2022-05-06 11:39:20', '2022-05-06 11:47:44'),
(4, 'Cancelled', 'Đã huỷ', '2022-05-06 11:39:33', '2022-05-06 11:48:48');

-- --------------------------------------------------------

--
-- Table structure for table `productdetails`
--

CREATE TABLE `productdetails` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productdetails`
--

INSERT INTO `productdetails` (`id`, `product_id`, `color_id`, `size_id`, `amount`, `sku`, `createdAt`, `updatedAt`) VALUES
(1, 1, 7, 3, 5, 'ATN7601-HDT-S', '2022-05-06 06:35:24', '2022-05-06 06:37:21'),
(2, 1, 7, 4, 5, 'ATN7601-HDT-M', '2022-05-06 06:37:33', '2022-05-06 06:40:05'),
(3, 1, 7, 5, 5, 'ATN7601-HDT-L', '2022-05-06 06:37:38', '2022-05-06 06:40:13'),
(4, 1, 7, 6, 5, 'ATN7601-HDT-XL', '2022-05-06 06:37:41', '2022-05-06 06:40:17'),
(5, 1, 7, 7, 5, 'ATN7601-HDT-2XL', '2022-05-06 06:37:45', '2022-05-06 06:40:25'),
(6, 1, 2, 3, 5, 'ATN7601-DEN-S', '2022-05-06 06:46:00', '2022-05-06 06:46:00'),
(7, 1, 2, 4, 5, 'ATN7601-DEN-M', '2022-05-06 06:46:12', '2022-05-06 06:46:12'),
(8, 1, 2, 5, 5, 'ATN7601-DEN-L', '2022-05-06 06:46:17', '2022-05-06 06:46:17'),
(9, 1, 2, 6, 5, 'ATN7601-DEN-XL', '2022-05-06 06:46:21', '2022-05-06 06:46:21'),
(10, 1, 2, 7, 5, 'ATN7601-DEN-2XL', '2022-05-06 06:46:25', '2022-05-06 06:46:25'),
(11, 2, 2, 3, 5, 'ATN7602-DEN-S', '2022-05-09 07:22:54', '2022-05-09 07:22:54'),
(12, 2, 2, 4, 5, 'ATN7602-DEN-M', '2022-05-09 07:22:57', '2022-05-09 07:22:57'),
(13, 2, 2, 5, 5, 'ATN7602-DEN-L', '2022-05-09 07:23:01', '2022-05-09 07:23:01'),
(14, 2, 2, 6, 5, 'ATN7602-DEN-XL', '2022-05-09 07:23:06', '2022-05-09 07:23:06'),
(15, 3, 5, 4, 5, 'ATN7603-XAH-M', '2022-05-09 07:53:18', '2022-05-09 07:53:18'),
(16, 3, 5, 5, 5, 'ATN7603-XAH-L', '2022-05-09 07:53:21', '2022-05-09 07:53:21'),
(17, 3, 5, 6, 5, 'ATN7603-XAH-XL', '2022-05-09 07:53:24', '2022-05-09 07:53:24'),
(18, 3, 5, 7, 5, 'ATN7603-XAH-2XL', '2022-05-09 07:53:28', '2022-05-09 07:53:28'),
(19, 3, 8, 4, 5, 'ATN7603-DXM-M', '2022-05-09 07:53:33', '2022-05-09 07:53:33'),
(20, 3, 8, 5, 5, 'ATN7603-DXM-L', '2022-05-09 07:53:36', '2022-05-09 07:53:36'),
(21, 3, 8, 6, 5, 'ATN7603-DXM-XL', '2022-05-09 07:53:39', '2022-05-09 07:53:39'),
(22, 3, 8, 7, 5, 'ATN7603-DXM-2XL', '2022-05-09 07:53:43', '2022-05-09 07:53:43'),
(23, 4, 2, 4, 5, 'ATN7604-DEN-M', '2022-05-09 07:57:58', '2022-05-09 07:57:58'),
(24, 4, 2, 5, 5, 'ATN7604-DEN-L', '2022-05-09 07:58:01', '2022-05-09 07:58:01'),
(25, 4, 2, 6, 5, 'ATN7604-DEN-XL', '2022-05-09 07:58:05', '2022-05-09 07:58:05'),
(26, 4, 2, 7, 5, 'ATN7604-DEN-2XL', '2022-05-09 07:58:08', '2022-05-09 07:58:08'),
(27, 4, 1, 4, 5, 'ATN7604-TRG-M', '2022-05-09 07:58:12', '2022-05-09 07:58:12'),
(28, 4, 1, 5, 5, 'ATN7604-TRG-L', '2022-05-09 07:58:15', '2022-05-09 07:58:15'),
(29, 4, 1, 6, 5, 'ATN7604-TRG-XL', '2022-05-09 07:58:18', '2022-05-09 07:58:18'),
(30, 4, 1, 7, 5, 'ATN7604-TRG-2XL', '2022-05-09 07:58:21', '2022-05-09 07:58:21'),
(31, 5, 1, 4, 5, 'ATN7605-TRG-M', '2022-05-09 08:01:40', '2022-05-09 08:01:40'),
(32, 5, 1, 5, 5, 'ATN7605-TRG-L', '2022-05-09 08:01:44', '2022-05-09 08:01:44'),
(33, 5, 1, 6, 5, 'ATN7605-TRG-XL', '2022-05-09 08:02:06', '2022-05-09 08:02:06'),
(34, 5, 1, 7, 5, 'ATN7605-TRG-2XL', '2022-05-09 08:02:10', '2022-05-09 08:02:10'),
(35, 5, 2, 4, 5, 'ATN7605-DEN-M', '2022-05-09 08:02:15', '2022-05-09 08:02:15'),
(36, 5, 2, 5, 5, 'ATN7605-DEN-L', '2022-05-09 08:02:18', '2022-05-09 08:02:18'),
(37, 5, 2, 6, 5, 'ATN7605-DEN-XL', '2022-05-09 08:02:22', '2022-05-09 08:02:22'),
(38, 5, 2, 7, 5, 'ATN7605-DEN-2XL', '2022-05-09 08:02:26', '2022-05-09 08:02:26'),
(40, 6, 1, 4, 5, 'ATN0006-TRG-M', '2022-05-09 08:33:23', '2022-05-09 08:33:23'),
(41, 6, 1, 5, 4, 'ATN0006-TRG-L', '2022-05-09 08:33:28', '2022-05-09 08:33:28'),
(42, 6, 1, 6, 5, 'ATN0006-TRG-XL', '2022-05-09 08:33:32', '2022-05-09 08:33:32'),
(43, 6, 1, 7, 5, 'ATN0006-TRG-2XL', '2022-05-09 08:33:36', '2022-05-09 08:33:36'),
(44, 6, 2, 4, 5, 'ATN0006-DEN-M', '2022-05-09 08:34:41', '2022-05-09 08:34:41'),
(45, 6, 2, 5, 5, 'ATN0006-DEN-L', '2022-05-09 08:34:44', '2022-05-09 08:34:44'),
(46, 6, 2, 6, 5, 'ATN0006-DEN-XL', '2022-05-09 08:34:48', '2022-05-09 08:34:48'),
(47, 6, 2, 7, 5, 'ATN0006-DEN-2XL', '2022-05-09 08:34:52', '2022-05-09 08:34:52'),
(48, 7, 2, 4, 5, 'ATN0007-DEN-M', '2022-05-09 21:59:58', '2022-05-09 21:59:58'),
(49, 7, 2, 5, 5, 'ATN0007-DEN-L', '2022-05-09 22:00:02', '2022-05-09 22:00:02'),
(50, 7, 2, 6, 5, 'ATN0007-DEN-XL', '2022-05-09 22:00:05', '2022-05-09 22:00:05'),
(51, 7, 2, 7, 5, 'ATN0007-DEN-2XL', '2022-05-09 22:00:08', '2022-05-09 22:00:08'),
(52, 7, 1, 4, 5, 'ATN0007-TRG-M', '2022-05-09 22:00:16', '2022-05-09 22:00:16'),
(53, 7, 1, 5, 5, 'ATN0007-TRG-L', '2022-05-09 22:00:18', '2022-05-09 22:00:18'),
(54, 7, 1, 6, 5, 'ATN0007-TRG-XL', '2022-05-09 22:00:22', '2022-05-09 22:00:22'),
(55, 7, 1, 7, 5, 'ATN0007-TRG-2XL', '2022-05-09 22:00:25', '2022-05-09 22:00:25'),
(56, 8, 2, 4, 5, 'ATN0008-DEN-M', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(57, 8, 2, 5, 5, 'ATN0008-DEN-L', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(58, 8, 2, 6, 5, 'ATN0008-DEN-XL', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(59, 8, 2, 7, 5, 'ATN0008-DEN-2XL', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(60, 8, 1, 4, 5, 'ATN0008-TRG-M', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(61, 8, 1, 5, 5, 'ATN0008-TRG-L', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(62, 8, 1, 6, 5, 'ATN0008-TRG-XL', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(63, 8, 1, 7, 5, 'ATN0008-TRG-2XL', '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(64, 9, 2, 4, 5, 'ATN0009-DEN-M', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(65, 9, 2, 5, 5, 'ATN0009-DEN-L', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(66, 9, 2, 6, 5, 'ATN0009-DEN-XL', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(67, 9, 2, 7, 5, 'ATN0009-DEN-2XL', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(68, 9, 1, 4, 5, 'ATN0009-TRG-M', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(69, 9, 1, 5, 5, 'ATN0009-TRG-L', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(70, 9, 1, 6, 5, 'ATN0009-TRG-XL', '2022-05-09 22:05:32', '2022-05-09 22:05:32'),
(71, 9, 1, 7, 5, 'ATN0009-TRG-2XL', '2022-05-09 22:05:32', '2022-05-09 22:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `slug`, `category_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo Thun Nam Cotton Cổ Tròn', 249000, '<p>Chất liệu: Cotton với thành phần 95% cotton + 5% spandex.</p><p>Cảm giác thoải mái, nhẹ nhàng và đặc biệt thấm hút mồ hôi vượt trội.</p><p>Khả năng đàn hồi và độ bền chắc được cải tiến nhờ vào sợi spandex có trong chất vải.</p><p>Thiết kế trẻ trung, dáng suông, không cổ và đường may chắc chắn</p><p>YODY - Look good. Feel good</p>', 'ao-thun-nam-cotton-co-tron', 1, '2022-05-06 05:37:39', '2022-05-06 05:37:39'),
(2, 'Áo T-Shirt Nam In Chữ Running Thể Thao', 299000, '<p>Chất liệu&nbsp;&nbsp;84% Nylon + 16% Spandex</p>\n<p>Form &aacute;o su&ocirc;ng gi&uacute;p tạo sự thoải m&aacute;i cho người d&ugrave;ng&nbsp;</p>\n<p>Hoạt động cường độ cao với chất liệu vải bền bỉ co gi&atilde;n&nbsp;4 chiều</p>\n<p>Thấm h&uacute;t v&agrave; tho&aacute;t&nbsp;mồ h&ocirc;i tạo cảm gi&aacute;c thoải m&aacute;i</p>\n<p>M&agrave;u sắc thanh lịch ph&ugrave; hợp với những hoạt động ngo&agrave;i trời&nbsp;</p>\n<p>YODY - Look good. Feel good</p>', 'ao-t-shirt-nam-in-chu-running-the-thao', 1, '2022-05-07 15:46:57', '2022-05-07 15:46:57'),
(3, 'Áo T-Shirt Nam Thể Thao Melange Năng Động', 249000, '<p>Chất liệu&nbsp; 93% Polyeste + 7% Spandex</p>\n<p>Sự kết hợp t&iacute;nh bền bỉ của Polyester v&agrave; co gi&atilde;n tối đa từ Spandex</p>\n<p>&nbsp;Khả năng thấm h&uacute;t mồ h&ocirc;i tốt</p>\n<p>Cảm gi&aacute;c kh&ocirc; r&aacute;o thoải m&aacute;i cho mặc với khả năng tho&aacute;t nhiệt nhanh ch&oacute;ng</p>\n<p>&Aacute;o thể thao&nbsp;d&aacute;ng &ocirc;m th&iacute;ch hợp với tất cả c&aacute;c d&aacute;ng người</p>\n<p>Hi&ecirc;u ứng dệt m&ecirc; lăng phối sợi m&agrave;u trẻ trung năng động</p>\n<p>YODY SPORT - Look good. Feel good</p>', 'ao-t-shirt-nam-the-thao-melange-nang-dong', 1, '2022-05-07 15:47:46', '2022-05-07 15:47:46'),
(4, 'Áo Phông Nam Cotton Compact In Túi Giả', 269000, '<p>Chất liệu 100% Cotton Compact</p>\n<p>Sợi b&ocirc;ng cao cấp&nbsp;được sản xuất từ c&ocirc;ng nghệ k&eacute;o sợi Compact ti&ecirc;n tiến nhất hiện nay</p>\n<p>Khắc phục được hạn chế x&ugrave; l&ocirc;ng của sợi th&ocirc;ng thường gi&uacute;p cho bề mặt vải mềm mịn v&agrave; độ bền tăng cao</p>\n<p>Thấm h&uacute;t mồ h&ocirc;i cực tốt, tho&aacute;ng m&aacute;t rất th&iacute;ch hợp với thời tiết n&oacute;ng ẩm của Việt Nam</p>\n<p>Vải c&oacute; khả năng co gi&atilde;n tốt</p>\n<p>Kiểu d&aacute;ng su&ocirc;ng rộng&nbsp;ph&ugrave; hợp mọi v&oacute;c d&aacute;ng</p>\n<p>YODY - Look good. Feel good</p>', 'ao-phong-nam-cotton-compact-in-tui-gia', 1, '2022-05-07 15:48:29', '2022-05-07 15:48:29'),
(5, ' Áo Phông Nam Cotton Compact Không Cổ In Essentials', 269000, '<p>Chất liệu 100% Cotton Compact</p>\n<p>Sợi b&ocirc;ng cao cấp&nbsp;được sản xuất từ c&ocirc;ng nghệ k&eacute;o sợi Compact ti&ecirc;n tiến nhất hiện nay</p>\n<p>Khắc phục được hạn chế x&ugrave; l&ocirc;ng của sợi th&ocirc;ng thường gi&uacute;p cho bề mặt vải mềm mịn v&agrave; độ bền tăng cao</p>\n<p>Thấm h&uacute;t mồ h&ocirc;i cực tốt, tho&aacute;ng m&aacute;t rất th&iacute;ch hợp với thời tiết n&oacute;ng ẩm của Việt Nam</p>\n<p>Vải c&oacute; khả năng co gi&atilde;n tốt, th&iacute;ch hợp với chuyển động của cơ thể khi hoạt động</p>\n<p>Kiểu d&aacute;ng su&ocirc;ng ph&ugrave; hợp mọi v&oacute;c d&aacute;ng</p>\n<p>YODY - Look good. Feel good</p>', 'ao-phong-nam-cotton-compact-khong-co-in-essentials', 1, '2022-05-07 15:49:12', '2022-05-07 15:49:12'),
(6, 'Áo Phông Nam Cổ Tròn Cotton Compact', 269000, '<p>Chất liệu 100% Cotton Compact</p>\n<p>Sợi b&ocirc;ng cao cấp&nbsp;được sản xuất từ c&ocirc;ng nghệ k&eacute;o sợi Compact ti&ecirc;n tiến nhất hiện nay</p>\n<p>Khắc phục được hạn chế x&ugrave; l&ocirc;ng của sợi th&ocirc;ng thường gi&uacute;p cho bề mặt vải mềm mịn v&agrave; độ bền tăng cao</p>\n<p>Thấm h&uacute;t mồ h&ocirc;i cực tốt, tho&aacute;ng m&aacute;t rất th&iacute;ch hợp với thời tiết n&oacute;ng ẩm của Việt Nam</p>\n<p>Vải c&oacute; khả năng co gi&atilde;n tốt, th&iacute;ch hợp với chuyển động của cơ thể khi hoạt động</p>\n<p>Kiểu d&aacute;ng su&ocirc;ng ph&ugrave; hợp mọi v&oacute;c d&aacute;ng</p>\n<p>YODY - Look good. Feel good</p>', 'ao-phong-nam-co-tron-cotton-compact', 1, '2022-05-07 15:52:31', '2022-05-07 15:52:31'),
(7, 'Áo T-Shirt Nam Thể Thao Cổ Tròn Dáng Suông', 299000, '<p>Th&agrave;nh phần vải:&nbsp;84% Nylon + 16% Spandex</p>\n<p>Bề mặt vải mềm mịn, thoải m&aacute;i.&nbsp;</p>\n<p>Khả năng thấm h&uacute;t mồ h&ocirc;i tốt, th&ocirc;ng tho&aacute;ng ph&ugrave; hợp với c&aacute;c hoạt động trong m&ugrave;a h&egrave;.&nbsp;</p>\n<p>Co gi&atilde;n tốt, khả năng giữ form cao.&nbsp;</p>\n<p>C&oacute; độ bền cao, bền m&agrave;u với thời gian.</p>\n<p>YODY - Look good. Feel good</p>', 'ao-t-shirt-nam-the-thao-co-tron-dang-suong', 1, '2022-05-09 21:57:03', '2022-05-09 21:57:03'),
(8, 'Áo Phông Nam Cổ Tròn In Unlimit', 269000, '<p>Chất liệu&nbsp;100% Cotton Organic</p>\n<p>Vải mềm mại, bền bỉ, th&acirc;m h&uacute;t mồ h&ocirc;i vượt trội</p>\n<p>Thoải m&aacute;i khi mặc,&nbsp;Lựa chọn &ldquo;xanh&rdquo; cho người d&ugrave;ng&nbsp;v&agrave; m&ocirc;i trường sinh th&aacute;i.</p>\n<p>Thấm h&uacute;t mồ h&ocirc;i cực tốt, tho&aacute;ng m&aacute;t rất th&iacute;ch hợp với thời tiết n&oacute;ng ẩm của Việt Nam</p>\n<p>Kiểu d&aacute;ng su&ocirc;ng rộng&nbsp;ph&ugrave; hợp mọi v&oacute;c d&aacute;ng</p>\n<p>Form d&aacute;ng su&ocirc;ng&nbsp;tạo sự thoải m&aacute;i cử động cho người mặc</p>\n<p>YODY - Look good. Feel good</p>', 'ao-phong-nam-co-tron-in-unlimit', 1, '2022-05-09 22:01:29', '2022-05-09 22:01:29'),
(9, 'Áo Thun Nam Cotton Compact In More Self Love', 269000, '<p>Chất liệu 100% Cotton Compact</p>\n<p>Sợi b&ocirc;ng cao cấp&nbsp;được sản xuất từ c&ocirc;ng nghệ k&eacute;o sợi Compact ti&ecirc;n tiến nhất hiện nay</p>\n<p>Khắc phục được hạn chế x&ugrave; l&ocirc;ng của sợi th&ocirc;ng thường gi&uacute;p cho bề mặt vải mềm mịn v&agrave; độ bền tăng cao</p>\n<p>Thấm h&uacute;t mồ h&ocirc;i cực tốt, tho&aacute;ng m&aacute;t rất th&iacute;ch hợp với thời tiết n&oacute;ng ẩm của Việt Nam</p>\n<p>Vải c&oacute; khả năng co gi&atilde;n tốt</p>\n<p>Kiểu d&aacute;ng su&ocirc;ng rộng&nbsp;ph&ugrave; hợp mọi v&oacute;c d&aacute;ng</p>\n<p>YODY - Look good. Feel good</p>', 'ao-thun-nam-cotton-compact-in-more-self-love', 1, '2022-05-09 22:05:32', '2022-05-09 22:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2022-05-05 19:57:46', '2022-05-05 20:06:07'),
(3, 'user', '2022-05-05 20:08:09', '2022-05-05 20:08:09');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220505085920-create-user.js'),
('20220505122853-create-role.js'),
('20220505135421-create-color.js'),
('20220505135434-create-size.js'),
('20220505143706-create-material.js'),
('20220505145905-create-product.js'),
('20220505150213-create-discount.js'),
('20220505152050-create-gender.js'),
('20220505152534-create-group-category.js'),
('20220505152552-create-category.js'),
('20220505225054-create-product-detail.js'),
('20220506002629-create-cart.js'),
('20220506002804-create-cart-item.js'),
('20220506040753-create-order.js'),
('20220506040842-create-order-status.js'),
('20220506040948-create-order-item.js'),
('20220506041126-create-coupon.js'),
('20220506053929-create-image.js');

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `value`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'Không có', '', '2022-05-05 21:12:38', '2022-05-07 15:58:25'),
(2, 'XS', 'XS', '2022-05-05 21:20:12', '2022-05-05 21:23:20'),
(3, 'S', 'S', '2022-05-05 21:20:21', '2022-05-05 21:23:25'),
(4, 'M', 'M', '2022-05-05 21:20:28', '2022-05-05 21:23:31'),
(5, 'L', 'L', '2022-05-05 21:20:36', '2022-05-05 21:23:38'),
(6, 'XL', 'XL', '2022-05-05 21:20:40', '2022-05-05 21:23:44'),
(7, '2XL', '2XL', '2022-05-05 21:20:44', '2022-05-05 21:23:51'),
(8, '3XL', '3XL', '2022-05-05 21:20:50', '2022-05-05 21:24:09'),
(9, '4XL', '4XL', '2022-05-05 21:20:54', '2022-05-05 21:24:16'),
(10, '2', '2', '2022-05-05 21:20:58', '2022-05-05 21:24:22'),
(11, '4', '4', '2022-05-05 21:21:04', '2022-05-05 21:24:26'),
(12, '6', '6', '2022-05-05 21:21:09', '2022-05-05 21:24:32'),
(13, '8', '8', '2022-05-05 21:21:17', '2022-05-05 21:24:37'),
(14, '10', '10', '2022-05-05 21:21:21', '2022-05-05 21:24:45'),
(15, '12', '12', '2022-05-05 21:21:58', '2022-05-05 21:26:07'),
(16, '14', '14', '2022-05-05 21:26:15', '2022-05-05 21:26:15'),
(17, '24', '24', '2022-05-05 21:26:19', '2022-05-05 21:26:19'),
(18, '25', '25', '2022-05-05 21:26:25', '2022-05-05 21:26:44'),
(19, '26', '26', '2022-05-05 21:26:36', '2022-05-05 21:26:36'),
(20, '27', '27', '2022-05-05 21:26:50', '2022-05-05 21:26:50'),
(21, '28', '28', '2022-05-05 21:26:54', '2022-05-05 21:26:54'),
(22, '29', '29', '2022-05-05 21:26:58', '2022-05-05 21:26:58'),
(23, '30', '30', '2022-05-05 21:40:58', '2022-05-05 21:43:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `middle_name`, `password`, `role_id`, `createdAt`, `updatedAt`) VALUES
(2, 'Duy', 'Phan', 'duychomap123@gmail.com', 'Khánh', '$2a$10$fFcrWvPkYgIsNSfPon3o6e3z0IIS6oZH6yv8DX4qTF.MWLD4ngDg2', 1, '2022-05-05 20:16:12', '2022-05-05 20:16:12'),
(3, 'Duy', 'Phan', 'duychomap1234@gmail.com', 'Khánh', '123456', 3, '2022-05-05 20:17:10', '2022-05-09 09:28:02'),
(7, 'Khánh', 'Vũ', 'user4@gmail.com', 'Thị Ngọc', '$2a$10$mAIFNjMnGiqtKR/dUmICeO/wVKa/po8YiE1YTfxW5qLCm7.n.wJlC', 3, '2022-05-06 10:21:13', '2022-05-09 09:27:51');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `delete_cart` AFTER DELETE ON `users` FOR EACH ROW delete from carts where user_id=OLD.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `new_cart` AFTER INSERT ON `users` FOR EACH ROW insert carts (user_id,total,count,createdAt, updatedAt) values (NEW.id, 0,0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupcategories`
--
ALTER TABLE `groupcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderstatuses`
--
ALTER TABLE `orderstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `groupcategories`
--
ALTER TABLE `groupcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderstatuses`
--
ALTER TABLE `orderstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productdetails`
--
ALTER TABLE `productdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
