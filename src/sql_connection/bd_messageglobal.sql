-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28-Dez-2020 às 05:21
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_messageglobal`
--
CREATE DATABASE IF NOT EXISTS `bd_messageglobal` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bd_messageglobal`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `authentication`
--

DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication` (
  `code` varchar(5) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONAMENTOS PARA TABELAS `authentication`:
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `email_user` varchar(30) DEFAULT NULL,
  `email_contact` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONAMENTOS PARA TABELAS `contacts`:
--   `email_user`
--       `user` -> `email`
--   `email_contact`
--       `user` -> `email`
--

--
-- Extraindo dados da tabela `contacts`
--

INSERT INTO `contacts` (`email_user`, `email_contact`, `id`) VALUES
('lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 2),
('lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 3),
('lucassalesmoreira161@gmail.com', 'arlinda@gmail.com', 4),
('arlinda@gmail.com', 'lucassalesmoreira161@gmail.com', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_email` varchar(30) DEFAULT NULL,
  `inputer_email` varchar(30) DEFAULT NULL,
  `text` varchar(700) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONAMENTOS PARA TABELAS `messages`:
--

--
-- Extraindo dados da tabela `messages`
--

INSERT INTO `messages` (`id`, `sender_email`, `inputer_email`, `text`, `date`) VALUES
(185, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 17:43:03'),
(186, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '0000-00-00 00:00:00'),
(187, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 17:58:37'),
(188, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:38'),
(189, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:39'),
(190, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:40'),
(191, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:40'),
(192, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:40'),
(193, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:42'),
(194, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:43'),
(195, 'lucasdevsoftware@gmail.com', 'arlinda@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:03:44'),
(196, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:07'),
(197, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:09'),
(198, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:09'),
(199, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:09'),
(200, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:09'),
(201, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:09'),
(202, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:10'),
(203, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'HHHHHHHHHHHH', '2020-12-26 18:16:12'),
(206, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'oiii', '2020-12-26 18:24:18'),
(207, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'fala gay', '2020-12-26 18:24:40'),
(208, 'lucassalesmoreira161@gmail.com', 'arlinda@gmail.com', 'Dale feia', '2020-12-26 18:24:50'),
(209, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', ' uuuu', '2020-12-26 18:25:28'),
(210, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'HHHHHHHHHHHH', '2020-12-27 18:45:00'),
(211, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'HHHHHHHHHHHH', '2020-12-27 18:45:01'),
(212, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'HHHHHHHHHHHH', '2020-12-27 18:45:02'),
(213, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'HHHHHHHHHHHH', '2020-12-27 18:45:03'),
(214, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'HHHHHHHHHHHH', '2020-12-27 18:45:03'),
(215, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', '2020-12-27 21:03:47'),
(216, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', '', '2020-12-27 21:03:52'),
(217, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'Eu sou foda', '2020-12-27 23:15:45'),
(218, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'hi', '2020-12-27 23:18:43'),
(219, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'oii', '2020-12-28 01:00:15'),
(220, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'aaaa', '2020-12-28 01:00:21'),
(221, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'ta pegandooo', '2020-12-28 01:00:30'),
(222, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'eu sei manoo', '2020-12-28 01:00:49'),
(223, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'aaa', '2020-12-28 01:01:16'),
(224, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'iae', '2020-12-28 01:02:42'),
(225, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'blz?', '2020-12-28 01:02:47'),
(226, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'caralhoooo', '2020-12-28 01:03:00'),
(227, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'aaaaa', '2020-12-28 01:04:50'),
(228, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'ta pegando caralhoooo', '2020-12-28 01:04:59'),
(229, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'conversando sozinho de um estilo diferente né ', '2020-12-28 01:05:04'),
(230, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'kkkkkkkk', '2020-12-28 01:05:11'),
(231, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'kkkkkkkkkk', '2020-12-28 01:05:15'),
(232, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'para pow', '2020-12-28 01:05:16'),
(233, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'hilário', '2020-12-28 01:05:24'),
(234, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'agr vem cá', '2020-12-28 01:05:34'),
(235, 'lucassalesmoreira161@gmail.com', 'lucasdevsoftware@gmail.com', 'já ia dizer pra tu voltar ', '2020-12-28 01:05:42'),
(236, 'lucasdevsoftware@gmail.com', 'lucassalesmoreira161@gmail.com', 'oxi', '2020-12-28 01:05:48');

-- --------------------------------------------------------

--
-- Estrutura da tabela `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `token` varchar(300) NOT NULL,
  `email` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONAMENTOS PARA TABELAS `session`:
--   `email`
--       `user` -> `email`
--

--
-- Extraindo dados da tabela `session`
--

INSERT INTO `session` (`token`, `email`) VALUES
('09dd95267d28cc7f286a9b137fc6a455e9f291e7636d2cfc681c14118b3003f0', 'arlinda@gmail.com'),
('30359aa93aaff51bc0c9285a5254f88b8829432cfe0fd9150120010b70bec189', 'lucasdevsoftware@gmail.com'),
('a21f7f7431621920ceb6dafa729b6e233cbaf6f8e0aad2b7bf87f73c3c085116', 'lucassalesmoreira161@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONAMENTOS PARA TABELAS `user`:
--

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`name`, `email`, `password`) VALUES
('Arlinda', 'arlinda@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),
('LucasDev', 'lucasdevsoftware@gmail.com', '87274af01876341455b32d805946f272871bb42effa6604dccf28bb027afa82b'),
('Lucas Sales', 'lucassalesmoreira161@gmail.com', 'a80cab26209c849092bd82f87b3ef9f277cc8d46c0ae055430d4170255bbb8a5');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`code`);

--
-- Índices para tabela `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_user` (`email_user`),
  ADD KEY `email_contact` (`email_contact`);

--
-- Índices para tabela `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`token`),
  ADD KEY `email` (`email`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`email_user`) REFERENCES `user` (`email`),
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`email_contact`) REFERENCES `user` (`email`);

--
-- Limitadores para a tabela `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
