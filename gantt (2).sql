-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 18, 2018 at 12:06 PM
-- Server version: 5.7.22
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gantt`
--

-- --------------------------------------------------------

--
-- Table structure for table `gantt_links`
--

CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gantt_links`
--

INSERT INTO `gantt_links` (`id`, `source`, `target`, `type`) VALUES
(1, 2, 21, '1'),
(2, 2, 22, '1'),
(3, 2, 23, '1'),
(4, 2, 24, '1'),
(5, 3, 31, '1'),
(6, 3, 32, '1'),
(7, 3, 33, '1'),
(8, 3, 34, '1'),
(9, 4, 41, '1'),
(10, 41, 42, '0'),
(11, 42, 43, '0');

-- --------------------------------------------------------

--
-- Table structure for table `gantt_tasks`
--

CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gantt_tasks`
--

INSERT INTO `gantt_tasks` (`id`, `text`, `start_date`, `duration`, `progress`, `parent`) VALUES
(1, 'Create QA orientation', '2018-06-11 00:00:00', 22, 0.7, 0),
(2, 'Making MA available for everybody', '2018-07-02 00:00:00', 53, 0.09, 0),
(3, 'Improve MA to 80%', '2018-08-24 00:00:00', 58, 0, 0),
(4, 'Nightly performance tests running', '2018-10-21 00:00:00', 71, 0, 0),
(21, 'QA-ers interview', '2018-07-09 00:00:00', 13, 0.2, 2),
(22, 'Perform manual and automatic tests', '2018-07-22 00:00:00', 8, 0, 2),
(23, 'Determine how to calculate MA', '2018-07-30 00:00:00', 9, 0.05, 2),
(24, 'Create react app to share MA', '2018-08-13 00:00:00', 11, 0.1, 2),
(31, 'Inventorize which tests need to be manual', '2018-08-24 00:00:00', 8, 0, 3),
(32, 'Inventorize which tests can be automated', '2018-09-02 00:00:00', 6, 0, 3),
(33, 'Research how to convert manual testing to automated testing', '2018-09-08 00:00:00', 14, 0, 3),
(34, 'Perform actions to convert manual testing to automated testing', '2018-09-22 00:00:00', 30, 0, 3),
(41, 'Set up tests in JMeter', '2018-10-21 00:00:00', 39, 0, 4),
(42, 'Run JMeter Performance test in Jenkins', '2018-11-30 00:00:00', 15, 0, 4),
(43, 'Push result of JMeter perf. to React app', '2018-12-14 00:00:00', 17, 0, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gantt_links`
--
ALTER TABLE `gantt_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gantt_tasks`
--
ALTER TABLE `gantt_tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gantt_links`
--
ALTER TABLE `gantt_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `gantt_tasks`
--
ALTER TABLE `gantt_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
