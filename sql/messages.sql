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
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `getter_id` int(11) NOT NULL,
  `message_text` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`message_id`, `sender_id`, `getter_id`, `message_text`, `timestamp`) VALUES
(1, 1, 10, 'привет, как дела', '2024-08-16 00:23:01'),
(6, 1, 10, 'ghbdt', '2024-08-17 12:42:04'),
(7, 1, 10, 'ghbdt', '2024-08-18 15:23:13'),
(8, 10, 1, 'привет', '2024-08-18 16:12:00'),
(9, 10, 12, 'привет', '2024-08-18 16:13:03'),
(10, 10, 11, 'ghb', '2024-08-18 16:44:47'),
(11, 10, 1, 'hjgjhkgfgfg', '2024-08-18 16:44:59'),
(12, 1, 10, 'мне нравиться что мой чат работает', '2024-08-18 17:19:55'),
(13, 1, 10, 'аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааа', '2024-08-18 17:21:04'),
(20, 1, 10, 'заебок', '2024-08-19 00:21:26'),
(21, 1, 10, 'ниггер', '2024-08-19 00:21:35'),
(22, 10, 13, 'Привет Niggolas!', '2024-08-19 19:43:23'),
(23, 10, 1, 'кайф', '2024-08-19 21:00:48'),
(24, 10, 1, 'все теперь дата работает, следующее что нужно сделать это чтобы в списке пользователей отображалось последнее отправленное сообщение и его дата', '2024-08-19 21:01:42'),
(25, 10, 1, 'кайф', '2024-08-19 23:44:29'),
(26, 10, 12, 'этот чат тоже работает', '2024-08-19 23:45:01'),
(27, 10, 1, 'ihhhiooh', '2024-08-19 23:56:27'),
(28, 1, 10, 'привет', '2024-08-20 13:23:41'),
(29, 1, 10, 'undefined[object HTMLImageElement]', '2024-08-21 00:18:39'),
(30, 1, 10, 'класс я добавил эмоджи 🥵', '2024-08-21 00:21:57'),
(31, 1, 10, '🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿🧔🏿', '2024-08-21 00:25:54'),
(32, 1, 12, 'ad', '2024-08-22 14:51:11'),
(33, 10, 1, 'ты че дебил, ты бы лучше доделал функционал бокового меню!', '2024-08-23 02:09:20'),
(34, 10, 12, '🫠', '2024-08-23 02:09:35'),
(35, 10, 1, 'привет', '2024-08-25 21:53:28'),
(36, 1, 13, '😁😁😁😁', '2024-08-25 22:18:21'),
(37, 1, 13, 'fsokfks', '2024-08-25 22:18:28'),
(38, 1, 10, 'привет', '2024-08-26 15:59:45'),
(39, 10, 1, 'привет', '2024-08-26 16:00:21');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
