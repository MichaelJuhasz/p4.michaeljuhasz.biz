-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2013 at 03:18 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `michae58_p4_michaeljuhasz_biz`
--

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
  `card_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `unit` int(11) NOT NULL,
  `english` varchar(255) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `farsi` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`card_id`),
  KEY `user_id` (`user_id`),
  KEY `unit` (`unit`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`card_id`, `user_id`, `unit`, `english`, `farsi`) VALUES
(10, 1, 1, 'Horn ', 'بوق'),
(12, 1, 2, 'Net, lace ', 'تور'),
(13, 1, 3, 'Firework', 'اتش بازی'),
(14, 1, 3, 'Decision', 'تصمیم'),
(15, 1, 2, 'Serious', 'جدی'),
(16, 1, 1, 'Lock', 'قفل'),
(17, 1, 4, 'Pickle', 'ترشی'),
(18, 2, 1, 'Example', 'نمونه');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `created` int(11) NOT NULL,
  `modified` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `created`, `modified`, `token`, `password`, `email`, `first_name`, `last_name`) VALUES
(1, 1386437652, 1386437652, 'f7962f55efcd2fe0a07b5be5006770468f2e3bb2', 'c8d984f93a9b68699a260e1dec71205a2cec8665', 'michael.juhasz@gmail.com', 'Michael', 'Juhasz'),
(2, 1387143239, 1387143239, '59c4eb7ace4e5c2525507f15b6c90fee1579b20a', 'ae210ca82bce5f616c9c055960dfbce0e50c7904', 'test@test.test', 'Testy', 'Testerson');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;