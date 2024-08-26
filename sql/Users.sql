-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 26 2024 г., 23:38
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Chat`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`username`, `password`, `email`, `id`) VALUES
('admin', '$2y$10$jQbsoDGBvAF9v/Co1qIOKedYSXdrgnj3ZqlJxwaVI88Yplrm72/V6', 'nicolas.zacer25@gmail.com', 1),
('nicolas', '$2y$10$cBDXVESmpNogGuuM9ZjjJOvi2Ey0A7KS3jCV/g.l.0.EA0JU8vP6y', 'nicolas.lazov25@gmail.com', 10),
('Леха', '$2y$10$V6DMNqHBltMeNKORhgKwl.Oh3sQWfHB1ImXpqd1B3Edt.KISxHHxC', 'nicolas.lazov25@mail.ru', 11),
('Maksos', '$2y$10$Yeb29pjFMD3fGpZ3zS0bpePea7WnKbIHrOKLHcADQfPuiPS4Q6QtK', 'nicolas.lazov25@mail.ru', 12),
('niggolas', '$2y$10$nHMgMQ.E4qmHm6BWtd9qr.I5b3guRdr8tOF4EPRc6M7ir7MeyiHLm', 'nicolas.lazov25@mail.ru', 13);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
