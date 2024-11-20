-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 10:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `square`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `pro_id` int(10) DEFAULT NULL,
  `pro_name` text DEFAULT NULL,
  `pro_qty` int(11) DEFAULT NULL,
  `pro_price` int(15) DEFAULT NULL,
  `pro_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `cate_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Processing','Completed','Cancelled') DEFAULT 'Pending',
  `shipping_address` text NOT NULL,
  `payment_method` enum('COD','Card','UPI','Net Banking') DEFAULT 'COD',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `items`, `total_amount`, `status`, `shipping_address`, `payment_method`, `created_at`, `updated_at`) VALUES
(4, 3, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'bilari', 'COD', '2024-11-16 14:01:56', '2024-11-16 14:01:56'),
(5, 3, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'bilari', 'COD', '2024-11-16 14:02:59', '2024-11-16 14:02:59'),
(6, 3, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'ff', 'COD', '2024-11-16 14:04:02', '2024-11-16 14:04:02'),
(7, 3, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'ff', 'COD', '2024-11-16 14:05:08', '2024-11-16 14:05:08'),
(8, 4, '[{\"productId\":17,\"quantity\":2,\"price\":384}]', 768.00, 'Pending', 'moradabad', 'COD', '2024-11-16 14:07:12', '2024-11-16 14:07:12'),
(9, 4, '[{\"productId\":20,\"quantity\":1,\"price\":5}]', 5.00, 'Pending', 'Mora', 'COD', '2024-11-16 14:55:28', '2024-11-16 14:55:28'),
(10, 4, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'hello\n', 'COD', '2024-11-16 15:11:42', '2024-11-16 15:11:42'),
(11, 4, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'fgh', 'COD', '2024-11-16 18:04:53', '2024-11-16 18:04:53'),
(12, 4, '[{\"productId\":17,\"quantity\":1,\"price\":384},{\"productId\":18,\"quantity\":1,\"price\":362}]', 746.00, 'Pending', 'Bilari', 'COD', '2024-11-16 19:38:53', '2024-11-16 19:38:53'),
(13, 6, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'Bilari', 'COD', '2024-11-16 20:39:59', '2024-11-16 20:39:59'),
(14, 4, '[{\"productId\":17,\"quantity\":2,\"price\":384},{\"productId\":18,\"quantity\":1,\"price\":362}]', 1130.00, 'Pending', 'Bilari', 'COD', '2024-11-16 20:42:01', '2024-11-16 20:42:01'),
(15, 4, '[{\"productId\":23,\"quantity\":1,\"price\":18}]', 18.00, 'Pending', 'Place', 'COD', '2024-11-17 10:03:52', '2024-11-17 10:03:52'),
(16, 4, '[{\"productId\":21,\"quantity\":1,\"price\":12}]', 12.00, 'Pending', 'Bilari', 'COD', '2024-11-19 07:16:51', '2024-11-19 07:16:51'),
(17, 4, '[{\"productId\":24,\"quantity\":1,\"price\":760}]', 760.00, 'Pending', 'BILARI', 'COD', '2024-11-19 14:52:53', '2024-11-19 14:52:53'),
(18, 17, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 384.00, 'Pending', 'Bilari', 'COD', '2024-11-19 16:36:32', '2024-11-19 16:36:32'),
(19, 17, '[{\"productId\":17,\"quantity\":1,\"price\":384}]', 307.20, 'Pending', 'BILARI', 'COD', '2024-11-19 16:44:13', '2024-11-19 16:44:13');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(15) NOT NULL,
  `description` text DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `popular` tinyint(1) DEFAULT 0,
  `discount` int(15) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `price`, `description`, `brand`, `model`, `color`, `category`, `popular`, `discount`) VALUES
(16, 'Microsoft Xbox X/S Wireless Controller Robot White', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692255251854-xbox.jpg', 57, 'Experience the modernized design of the Xbox wireless controller in robot white, featuring sculpted surfaces and refined Geometry for enhanced comfort and effortless control during gameplay\r\nStay on target with textured grip on the triggers, bumpers, and back case and with a new hybrid D-pad for accurate, yet familiar input\r\nMake the controller your own by customizing button Mapping with the Xbox accessories app', 'microsoft', 'Xbox X/S', 'white', 'gaming', 1, 4),
(17, 'Logitech G733 Lightspeed Wireless Gaming Headset with Suspension Headband, LIGHTSYNC RGB, Blue VO!CE mic Technology and PRO-G Audio Drivers - White', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692257709689-logitech heaphone.jpg', 384, 'Total freedom with up to 20 m wireless range and LIGHTSPEED wireless audio transmission. Keep playing for up to 29 hours of battery life. 1 Play in stereo on PlayStation(R) 4.\r\nPersonalize your headset lighting across the full spectrum, 16. 8M colors. Play in colors with front-facing, dual-zone LIGHTSYNC RGB lighting and choose from preset animations or create your own with G HUB software.\r\nColorful, reversible suspension headbands are designed for comfort during long play sessions.\r\nAdvanced mic filters that make your voice sound richer, cleaner, and more professional. Customize with G HUB and find your sound.\r\nHear every audio cue with breathtaking clarity and get immerse in your game. PRO-G drivers are designed to significantly reduce distortion and reproduce precise, consistent, rich sound quality.\r\nSoft dual-layer memory foam that conforms to your head and reduces stress points for long-lasting comfort.\r\nG733 weighs only 278 g for long-lasting comfort.', 'logitech G', 'G733 LIGHTSPEED', 'white', 'gaming', 1, 3),
(18, 'Sony WH-1000XM5 Wireless Industry Leading Active Noise Cancelling Headphones, 8 Mics for Clear Calling, 30Hr Battery, 3 Min Quick Charge = 3 Hours Playback, Multi Point Connectivity, Alexa-Silver', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg', 362, 'Industry Leading noise cancellation-two processors control 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise cancelling is automatically optimized based on your wearing conditions and environment.\r\nIndustry-leading call quality with our Precise Voice Pickup Technology uses four beamforming microphones and an AI-based noise reduction algorithm\r\nMagnificent Sound, engineered to perfection with the new Integrated Processor V1\r\nCrystal clear hands-free calling with 4 beamforming microphones, precise voice pickup, and advanced audio signal processing.', 'song', 'WH1000XM5/SMIN', 'white', 'audio', 1, 11),
(19, 'Urbanista Los Angeles Sand Gold - World’s 1st Solar Powered Hybrid Active Noise Cancelling with Mic Premium Wireless Headphones, Unlimited Playtime', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691056487173-headphon2.jpg', 265, 'Welcome to the dawn of a new era with URBANISTA LOS ANGELES, the world’s first solar-charging premium wireless headphoneS powered by Powerfoyle solar cell material. Using ADVANCED GREEN TECHNOLOGY, Los Angeles converts all light, outdoor and indoor, into energy to deliver virtually infinite playtime. Los Angeles never stops charging when exposed to light, providing you with a nonstop audio experience. With Los Angeles, you’re always in complete control of your audio experience. Just the press of a button activates advanced hybrid Active Noise Cancelling, instantly reducing unwanted background noise, or switches on Ambient Sound Mode so you can stay aware of important surrounding sounds.', 'urbanista', 'Los Angeles', 'sand gold', 'audio', 1, 19),
(20, 'Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg', 5, 'Ergonomically angled to fit perfectly in your ear canal that provides long lasting comfort for every day usage.\r\nFeatures 1.25 meter long cable & L-shaped 3.5mm jack to connect with your phone. Due to the L-shape, the connector will deliver a strong & durable life. Earphones are compatible with Android, iOS & Windows devices with jack.\r\nPowerful 10 mm drivers & aluminum sound chamber for super extra bass and clear sound for the best music & calling experience.\r\nHigh-quality silicone earbuds, which are gentle on skin without compromising the comfortable fit on the ears.\r\nIn-line microphone with a durable multi-function button to play/pause your music, and answer/end your calls, all with just one tap.', 'xiaomi', 'Mi Earphones Basic Blue', 'Blue', 'audio', 0, 0),
(21, 'boAt Rockerz 370 On Ear Bluetooth Headphones with Upto 12 Hours Playtime, Cozy Padded Earcups and Bluetooth v5.0, with Mic (Buoyant Black)', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057718636-headphone5.jpg', 12, 'Rockerz 370 come equipped with latest Bluetooth v5.0 for instant wireless connectivity\r\nThe powerful 300mAh battery provides up to 8 Hours of audio bliss\r\n40mm Dynamic Drivers supply immersive High Definition sound\r\nThe headset has padded earcups for a comfortable experience\r\nThe headphone has been ergonomically and aesthetically designed for a seamless experience\r\nOne can connect to Rockerz 370 via dual modes for connectivity in the form of Bluetooth and AUX\r\n1 year warranty from the date of purchase.', 'boat', 'Rockerz 370', 'Black', 'audio', 0, 0),
(22, 'Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691073671025-galaxy S21 FE.jpg', 434, 'Pro-grade Camera with AI Single Take, Portrait Mode, Night Mode and 30X Space zoom. Dual Recording: Film in both wide and selfie angles at the same time | 12MP F1.8 Main Camera (Dual Pixel AF & OIS) + 12MP UltraWide Camera (123° FOV) + 8MP Telephoto Camera (3x Optic Zoom, 30X Space Zoom, OIS) | 32 MP F2.2 Front Camera.\r\n16.28cm (6.4-inch) Dynamic AMOLED 2X Display with120Hz Refresh rate for Smooth scrolling. Intelligent Eye Comfort Shield, New 19.5:9 Screen Ratio with thinner bezel, 1080x2340 (FHD+) Resolution.\r\n5G Ready with Octa-core Exynos 2100 (5nm) Processor. Android 12 operating system. Dual Sim.\r\nIconic Contour Cut Design with 7.9 mm thickness. Gorilla Glass Victus and IP68 Water Resistant .', 'samsung', 'Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Sto', 'Lavender', 'mobile', 0, 9),
(23, 'Amkette EvoFox Elite Ops Wireless Gamepad for Android TV | Google TV | 8+ Hours of Play Time | Zero Lag Connectivity Upto 12 Feets | USB Extender for TV Included | - Dusk Grey', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694100438525-51Prg4Smx-L._SL1500_.jpg', 18, 'The EvoFox Elite Ops Wireless Gamepad with Type C Charging is the ideal Android TV Gamepad. With all Android TVs supporting at least basic Gaming, a Gamepad at home is a must. Use the provided USB Extender Cable on your TV to ensure optimal wireless performance.\r\nThis Wireless Controller also supports Windows with X input and D input modes, and PS3s. It automatically detects and changes the gamepad mode based on your system. Simply Plug and Play!\r\nThe Elite Ops features Digital Triggers (not Analog), Accurate 360 degree concave thumbsticks, a Precise 8 way floating D-Pad. The gamepad also features dual rumble Vibration motors (for PC and PS3 only) and an easy to use Turbo Mode.\r\nThe gamepad comes with a Type C charging port and the 400mAh Rechargeable battery ensures 8 hours of non stop gameplay. The ergonomic and robust design with anti-sweat matte finish makes it easy on your hands, but tough on your enemies.', 'Amkette', 'Woburn II Bluetooth', 'gray', 'gaming', 0, 3),
(24, 'Samsung Galaxy S22 5G (Phantom White, 8GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers', 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074519203-galaxy S22 5G.jpg', 760, 'Pro-grade Camera that lets you make your nights epic with Nightography: It’s our brightest innovation yet. The sensor pulls in more light, the Super Clear Glass dials down lens flare, and fast-acting AI delivers near-instant intelligent processing.\r\nVisionBooster outshines the sun: Stunning 120Hz Dynamic AMOLED 2X display is crafted specifically for high outdoor visibility, keeping the view clear in bright daylight.\r\n4nm processor, our fastest chip yet: Our fastest, most powerful chip ever. That means, a faster CPU and GPU compared to Galaxy S21 Ultra. It’s an epic leap for smartphone technology.\r\nSleek design in a range of colors lets you express yourself how you like. The slim bezels flow into a symmetrical polished frame for an expansive, balanced display. Corning Gorilla Glass Victus+ on the screen and back panels.', 'samsung', 'Samsung Galaxy S22 5G', 'White', 'mobile', 0, 29);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `review_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `helpful` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `product_id`, `rating`, `review_text`, `created_at`, `updated_at`, `helpful`) VALUES
(1, 1, 21, 4, 'Good Product', '2024-11-19 12:29:32', '2024-11-19 12:29:32', 0),
(2, 1, 18, 5, 'Great product overall! The quality is excellent, but I wish the delivery was a bit faster.', '2024-11-19 12:50:04', '2024-11-19 12:50:04', 0),
(3, 1, 24, 3, 'Average\n', '2024-11-19 14:39:58', '2024-11-19 14:39:58', 0),
(4, 1, 24, 3, 'Review Test', '2024-11-19 14:42:11', '2024-11-19 14:42:11', 0),
(5, 1, 24, 5, 'Review Test 2', '2024-11-19 14:44:38', '2024-11-19 14:44:38', 0),
(6, 1, 24, 5, 'test 3', '2024-11-19 14:45:48', '2024-11-19 14:45:48', 0),
(7, 1, 24, 5, 'a', '2024-11-19 14:46:25', '2024-11-19 14:46:25', 0),
(8, 1, 24, 5, 'x', '2024-11-19 14:50:35', '2024-11-19 14:50:35', 0),
(9, 1, 24, 5, 'y', '2024-11-19 14:52:26', '2024-11-19 14:52:26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `revenue` decimal(10,2) NOT NULL DEFAULT 0.00,
  `orders` int(11) NOT NULL DEFAULT 0,
  `products` int(11) NOT NULL DEFAULT 0,
  `customers` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`id`, `revenue`, `orders`, `products`, `customers`, `updated_at`) VALUES
(1, 4509.20, 10, 9, 16, '2024-11-19 16:44:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(80) NOT NULL,
  `cart` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cart`)),
  `cart_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `cart`, `cart_count`) VALUES
(4, 'Vipin', 'Vipin@gmail.com', '$2y$10$HXHZDz9K2WUNbRUt066RTeNECgiAgV05fHqQh9Rzio/N647vCG0f.', NULL, 0),
(5, 'abc', 'abc@gmail.com', '$2y$10$pZNXS3yL0JBEYO2SXHspquK8o4MrdCrDUg8K2oIGjBe39aDBnZ8Tm', NULL, 0),
(6, 'xyz', 'xyz@gmail.com', '$2y$10$s.peK35xQDsOPxNUUJtrKeplzI9tGv2icxEex0XJJty0fPeLxvt9e', NULL, 0),
(7, 'mnb', 'mnb@gmail.com', '$2y$10$sEYkoZt8Z7ps5UQ6qB27w.bYfOESuJWi57RAwM49Gu4AA5bAqc4o6', NULL, 0),
(8, 'mnb', 'mnb2@gmail.com', '$2y$10$SxAtR1TrwXLhJQHqJe.UROWSa6M6v9bRaZYJ.b8jWfWkUGszE5WFG', NULL, 0),
(9, 'mnb', 'mnb3@gmail.com', '$2y$10$3qZaijeieil6UG4aySZCgeqceQzf44T2ebMUInYXvgmyOLu08ZrWy', NULL, 0),
(10, 'ksdfk', 'ladkdf@gmail.com', '$2y$10$KnwngS8wEbjGFuATwvPXvO240cB7GPTlpT5uY6rorFVO5NqM525xy', NULL, 0),
(11, 'sdklsdfkl', 'adslkfdkf@gmail.com', '$2y$10$H55v5FDwjueFfFAji.fmeuSbR1qCrD0yvI1GwcbVz2nnAQAZ.SoH.', NULL, 0),
(12, 'slkdflks', 'sdg@gmail.com', '$2y$10$Qd54s2R0yri40jnEXPgmRO7nIzieTzue5vZQyqJqjIM4khzym3ow.', NULL, 0),
(13, 'sdgsdg', 'adg@gmail.com', '$2y$10$XJAUfy3PT0cfj2EKjE9gQO7fGN6qq.K1wmNPXjKMxZLB0ymlG.tD6', NULL, 0),
(14, 'sdfkksldg', 'sdklg@gmail.com', '$2y$10$0p7YB8VqLKGX3LAGug/wr.wRGGU96dE31pi7bVTSC0H.IJXjdSIKO', NULL, 0),
(15, 'sdgkd', 'sdgkj@gmail.c', '$2y$10$ugEZ9o4e.rD6mBON.R4eTeMX4ayTwSwaClcpEnq6MSfIMuk3hsoly', NULL, 0),
(16, 'klxdf', 'mnb55@gmail.com', '$2y$10$oQtqFrXhZUSHVjGgfoCh8urc4FyP6ne6wGYfDqBGghmIeEsevk3Ai', NULL, 0),
(17, 'admin', 'admin@gmail.com', '$2y$10$s9E2qWzivpHMLLow6vIpe.3Nbp3Yi4tA/00652VklmZ3nxh3a2vSa', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
