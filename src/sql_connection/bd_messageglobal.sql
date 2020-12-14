-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Dez-2020 às 06:21
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`name`, `email`, `password`) VALUES
('Caio', 'caio@gmail.com', 'admin'),
('Eduardo', 'eduardo@gmail.com', 'admin'),
('LucasDev', 'lucasdevsoftware@gmail.com', 'admin'),
('Lucas Sales', 'lucassalesmoreira161@gmail.com', '102414'),
('Pupilo', 'pupilo@gmail.com', 'admin'),
('Zeus', 'zeus@gmail.com', 'admin');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`email_user`) REFERENCES `user` (`email`),
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`email_contact`) REFERENCES `user` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
