-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 25, 2026 at 09:03 PM
-- Server version: 8.0.44
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ad_movies`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `year_released` int NOT NULL,
  `genres` varchar(255) DEFAULT NULL,
  `director` varchar(255) NOT NULL,
  `logline` varchar(255) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `image_filename` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `year_released`, `genres`, `director`, `logline`, `country`, `image_filename`) VALUES
(1, 'The Babadook', 2014, 'Horror, Drama', 'Jennifer Kent', 'A widowed mother and her son are terrorized by a sinister presence after a disturbing children\'s book appears in their home.', 'Australia', 'the-babadook.jpg'),
(2, 'Hereditary', 2018, 'Horror, Drama, Mystery', 'Ari Aster', 'After the death of her secretive mother, a grieving family begins to unravel as terrifying and inherited forces close in on them.', 'United States', 'hereditary.jpg'),
(3, 'Get Out', 2017, 'Horror, Mystery, Thriller', 'Jordan Peele', 'A young Black man uncovers a horrifying secret when he visits his white girlfriend\'s family estate.', 'United States', 'get-out.jpg'),
(4, 'The Ring', 2002, 'Horror, Mystery', 'Gore Verbinski', 'A journalist investigates a cursed videotape that kills viewers seven days after watching it.', 'United States', 'the-ring.jpg'),
(5, 'A Quiet Place', 2018, 'Horror, Drama, Sci-Fi', 'John Krasinski', 'A family must live in near-total silence to survive monsters that hunt by sound.', 'United States', 'a-quiet-place.jpg'),
(6, 'Train to Busan', 2016, 'Action, Horror, Thriller', 'Yeon Sang-ho', 'Passengers fight to survive a zombie outbreak while trapped on a train from Seoul to Busan.', 'South Korea', 'train-to-busan.jpg'),
(7, 'The Conjuring', 2013, 'Horror, Mystery, Thriller', 'James Wan', 'Paranormal investigators help a family terrorized by a dark presence in their farmhouse.', 'United States', 'the-conjuring.jpg'),
(8, 'It Follows', 2014, 'Horror, Mystery', 'David Robert Mitchell', 'After a strange encounter, a teenager is stalked by an unstoppable supernatural entity.', 'United States', 'it-follows.jpg'),
(9, 'Midsommar', 2019, 'Horror, Drama', 'Ari Aster', 'A grieving woman joins a remote Swedish festival that becomes increasingly disturbing and violent.', 'Sweden', 'midsommar.jpg'),
(10, 'The Witch', 2015, 'Horror, Drama, Mystery', 'Robert Eggers', 'A Puritan family in 1630s New England faces paranoia and supernatural forces in the woods.', 'United States', 'the-witch.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `movie_subgenres`
--

CREATE TABLE `movie_subgenres` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `subgenre_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movie_subgenres`
--

INSERT INTO `movie_subgenres` (`id`, `movie_id`, `subgenre_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 5),
(6, 3, 3),
(7, 4, 6),
(8, 4, 7),
(9, 5, 8),
(10, 6, 9),
(11, 7, 6),
(12, 8, 6),
(13, 8, 3),
(14, 8, 7),
(15, 9, 10),
(16, 9, 3),
(17, 9, 4),
(18, 10, 10),
(19, 10, 3),
(20, 10, 11);

-- --------------------------------------------------------

--
-- Table structure for table `subgenres`
--

CREATE TABLE `subgenres` (
  `id` int NOT NULL,
  `subgenre_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subgenres`
--

INSERT INTO `subgenres` (`id`, `subgenre_name`) VALUES
(1, 'Psychological'),
(2, 'Occult'),
(3, 'Elevated'),
(4, 'Cult'),
(5, 'Social Thriller'),
(6, 'Supernatural'),
(7, 'Pass It Forward'),
(8, 'Creature Feature'),
(9, 'Zombie'),
(10, 'Folk Horror'),
(11, 'Witches');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_subgenres`
--
ALTER TABLE `movie_subgenres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `subgenre_id` (`subgenre_id`);

--
-- Indexes for table `subgenres`
--
ALTER TABLE `subgenres`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `movie_subgenres`
--
ALTER TABLE `movie_subgenres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `subgenres`
--
ALTER TABLE `subgenres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie_subgenres`
--
ALTER TABLE `movie_subgenres`
  ADD CONSTRAINT `movie_subgenres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `movie_subgenres_ibfk_2` FOREIGN KEY (`subgenre_id`) REFERENCES `subgenres` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
