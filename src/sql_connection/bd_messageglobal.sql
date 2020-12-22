-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Dez-2020 às 04:11
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
('d95bcbae7404d0d324a1da97a06649a6979e0c722d396ce3ac1d6771b1c4ecf9', 'lucasdevsoftware@gmail.com'),
('b8710817baf65d5c7d2e9c14151d39779c6cbaedbedd1e706f9be8068ef2431b', 'lucassalesmoreira161@gmail.com');

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

--
-- Limitadores para a tabela `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
