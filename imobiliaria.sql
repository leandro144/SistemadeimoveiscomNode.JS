CREATE DATABASE  IF NOT EXISTS `heroku_dda72828eb2af8d` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_dda72828eb2af8d`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: us-cdbr-east-05.cleardb.net    Database: heroku_dda72828eb2af8d
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `homes`
--

DROP TABLE IF EXISTS `homes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(13) DEFAULT 'Null',
  `data_nascimento` varchar(10) DEFAULT 'Null',
  `cidade` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  UNIQUE KEY `id_unique` (`id`),
  UNIQUE KEY `email_unique` (`email`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homes`
--

LOCK TABLES `homes` WRITE;
/*!40000 ALTER TABLE `homes` DISABLE KEYS */;
INSERT INTO `homes` VALUES (0,'CadastroHeroku','teste@teste.com','$2b$08$ZfsKh.1XzaBEOuaQ9IdRNeGwqduK8kKRG4teW5.0pemp4bMlTOiV6','1234567891011','2022-02-17','jalapão','sp','rua dos limoes'),(1,'teste','teste@teste.com.br','','1999999-9999','31/07/1989','piracicaba','são paulo','rua das amoras, 1000'),(2,'teste','teste','','Null','Null','tes','tes','tes'),(3,'antonieta','miltretas@teste.com.br','','1999999-9999','31/07/1989','piracicaba','são paulo','rua das amoras, 1000'),(4,'asd','asd','','asd','2022-01-29','asd','asd','asd'),(5,'Thiago','thiago@teste.com.br','','19988888888','2022-01-29','jaguariuna','sp','la casa de pastel'),(6,'novoteste','novoteste','','novoteste','2022-01-23','novoteste','novoteste','novoteste'),(8,'novoteste2','novoteste2','','novoteste2','2022-01-23','novoteste2','novoteste2','novoteste2'),(9,'novoteste3','novoteste3','','novoteste3','2022-01-23','novoteste3','novoteste3','novoteste3'),(10,'teste4','teste4','','teste4','2022-01-11','teste4','teste4','teste4'),(11,'testecomsenha','testecomsenha','$2b$08$bpPdw9d.yUEJ3BJwG7c6V.z0WhFP6rSt43URttss3QXyMhX1gTV7.','testecomsenha','2022-01-03','testecomsenha','testecomsenha','testecomsenha'),(12,'thiago de paula','thiagoteste@teste.com.br','$2b$08$W6e24S/e7LFmyDb0QWPxzeB7Jm.BBu5nFAy6GE1gvC65BAOJrXlAO','19999889988','2022-01-31','piracicaba','sp','rua sem saida');
/*!40000 ALTER TABLE `homes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-05  1:20:26
