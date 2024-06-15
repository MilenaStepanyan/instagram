-- MySQL dump 10.13  Distrib 8.2.0, for macos13 (arm64)
--
-- Host: localhost    Database: social_media
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `follower_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`follower_id`),
  KEY `follower_id` (`follower_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,17,1),(4,18,1);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delivered` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
INSERT INTO `Messages` VALUES (1,'dog','ruz','wassup dogie','2024-06-06 14:39:41','2024-06-06 10:39:41',1),(2,'ruz','dog','what?','2024-06-06 14:40:04','2024-06-06 10:40:04',1),(3,'dog','ruz','nothing wbu','2024-06-06 14:40:13','2024-06-06 10:40:13',1),(4,'ruz','dog','same bruh','2024-06-06 14:40:20','2024-06-06 10:40:20',1),(5,'ruz','p','hello','2024-06-06 14:57:22','2024-06-06 10:57:21',1),(6,'ruz','p','hello','2024-06-06 14:57:22','2024-06-06 10:57:21',1),(7,'ruz','dog','watsuppp','2024-06-06 15:00:23','2024-06-06 11:00:23',1),(8,'ruz','dog','watsuppp','2024-06-06 15:00:23','2024-06-06 11:00:23',1),(9,'ruz','p','hello boy','2024-06-06 15:00:32','2024-06-06 11:00:32',1),(10,'ruz','p','hello boy','2024-06-06 15:00:32','2024-06-06 11:00:32',1),(11,'p','ruz','hi wth','2024-06-06 15:00:59','2024-06-06 11:00:58',1),(12,'p','ruz','hi wth','2024-06-06 15:00:59','2024-06-06 11:00:58',1),(13,'p','p','hello','2024-06-06 15:03:58','2024-06-06 11:03:58',1),(14,'p','p','hello','2024-06-06 15:03:58','2024-06-06 11:03:58',1),(15,'dog','p','wassup','2024-06-06 15:08:22','2024-06-06 11:08:22',1),(16,'dog','p','wassup','2024-06-06 15:08:22','2024-06-06 11:08:22',1),(17,'p','p','nothin','2024-06-06 15:08:43','2024-06-06 11:08:43',1),(18,'p','p','nothin','2024-06-06 15:08:43','2024-06-06 11:08:43',1),(19,'dog','p','hello?','2024-06-06 15:08:59','2024-06-06 11:08:59',1),(20,'dog','p','hello?','2024-06-06 15:08:59','2024-06-06 11:08:59',1),(21,'p','dog','what','2024-06-06 15:09:17','2024-06-06 11:09:17',1),(22,'p','dog','what','2024-06-06 15:09:17','2024-06-06 11:09:17',1),(23,'dog','Whateverrrr……','hello dummy','2024-06-06 15:10:27','2024-06-06 11:10:27',1),(24,'dog','Whateverrrr……','hello dummy','2024-06-06 15:10:27','2024-06-06 11:10:27',1),(25,'Whateverrrr……','dog','ur dummy','2024-06-06 15:10:55','2024-06-06 11:10:55',1),(26,'Whateverrrr……','dog','ur dummy','2024-06-06 15:10:55','2024-06-06 11:10:55',1),(27,'Whateverrrr……','dog','what?','2024-06-06 15:12:27','2024-06-06 11:12:27',1),(28,'Whateverrrr……','dog','what?','2024-06-06 15:12:27','2024-06-06 11:12:27',1),(29,'dog','Whateverrrr……','yo','2024-06-06 15:14:15','2024-06-06 11:14:15',1),(30,'dog','Whateverrrr……','yooo','2024-06-06 15:14:27','2024-06-06 11:14:27',1),(31,'dog','Whateverrrr……','yo','2024-06-06 15:15:59','2024-06-06 11:15:59',1),(32,'dog','Whateverrrr……','yooo','2024-06-06 15:16:11','2024-06-06 11:16:11',1),(33,'Whateverrrr……','p','yooo','2024-06-13 22:16:44','2024-06-13 18:16:44',0),(34,'Whateverrrr……','Whateverrrr……','hello','2024-06-15 11:22:51','2024-06-15 07:22:51',1);
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image_url` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (38,'AC MILAN❤️🖤','/uploads/postImage-1718370538136-511563506.jpg',17,'2024-06-14 13:08:58'),(39,'IDK','/uploads/postImage-1718370551502-41836337.jpg',17,'2024-06-14 13:09:11'),(40,'WHA-','/uploads/postImage-1718370566553-541061760.jpg',17,'2024-06-14 13:09:26');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text,
  `website` varchar(255) DEFAULT NULL,
  `followers_count` int DEFAULT '0',
  `following_count` int DEFAULT '0',
  `posts_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,2,'/uploads/default.png','asdf',NULL,0,0,0,'2024-04-20 11:19:34','2024-04-20 11:19:34'),(2,3,'/uploads/wp4662592.jpg',NULL,NULL,0,0,0,'2024-04-20 11:47:07','2024-04-20 11:47:07'),(3,4,'/uploads/wp4662592.jpg',NULL,NULL,0,0,0,'2024-04-20 19:50:35','2024-04-20 19:50:35'),(4,5,'/uploads/wp4662592.jpg',NULL,NULL,0,0,0,'2024-04-20 19:51:43','2024-04-20 19:51:43'),(5,6,'/uploads/wp4662592.jpg',NULL,NULL,0,0,0,'2024-04-20 20:02:51','2024-04-20 20:02:51'),(6,7,NULL,'asd',NULL,0,0,0,'2024-04-20 20:05:12','2024-04-20 20:05:12'),(7,8,NULL,NULL,NULL,0,0,0,'2024-05-17 18:37:44','2024-05-17 18:37:44'),(8,9,NULL,NULL,NULL,0,0,0,'2024-05-17 22:00:34','2024-05-17 22:00:34'),(9,10,NULL,NULL,NULL,0,0,0,'2024-05-20 13:44:53','2024-05-20 13:44:53'),(10,11,NULL,NULL,NULL,0,0,0,'2024-05-20 14:50:06','2024-05-20 14:50:06'),(11,12,NULL,NULL,NULL,0,0,0,'2024-05-20 14:50:41','2024-05-20 14:50:41'),(12,13,NULL,NULL,NULL,0,0,0,'2024-05-20 14:58:33','2024-05-20 14:58:33'),(13,14,NULL,NULL,NULL,0,0,0,'2024-05-20 15:00:05','2024-05-20 15:00:05'),(14,15,NULL,NULL,NULL,0,0,0,'2024-05-20 15:00:58','2024-05-20 15:00:58'),(15,16,NULL,NULL,NULL,0,0,0,'2024-05-20 15:05:30','2024-05-20 15:05:30'),(16,17,NULL,NULL,NULL,0,0,0,'2024-05-26 13:30:00','2024-05-26 13:30:00'),(17,18,NULL,NULL,NULL,0,0,0,'2024-05-27 19:14:25','2024-05-27 19:14:25'),(18,19,NULL,NULL,NULL,0,0,0,'2024-05-27 19:18:06','2024-05-27 19:18:06'),(19,20,NULL,NULL,NULL,0,0,0,'2024-05-28 08:06:52','2024-05-28 08:06:52'),(20,21,NULL,NULL,NULL,0,0,0,'2024-05-30 12:59:11','2024-05-30 12:59:11'),(21,22,NULL,NULL,NULL,0,0,0,'2024-06-04 12:22:42','2024-06-04 12:22:42'),(22,23,NULL,NULL,NULL,0,0,0,'2024-06-14 12:38:56','2024-06-14 12:38:56');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fullname` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wht','$2b$10$.hz3M4ZuPD16NWAo/4QP8Ony7lQcSaixJnVoQTHrcY1.Qs6rg2rqW','2024-04-20 11:17:12','srsly.milena','077090898','/uploads/profilePicture-1717506111487-714824238.png','barevv'),(2,'mil','$2b$10$DXqdrhIex//IuqAz.0vqjeWgPfK6nTug7to.aZ9Pzhs68k1GZCvwW','2024-04-20 11:19:34','mil','0945958694',NULL,NULL),(3,'mle','$2b$10$JpPsNQxpfjmqNQB97O6r0OIyzjgLu6CoYXqqog5KB/MoUOX.Qv5hq','2024-04-20 11:47:07','mle','921310294835',NULL,NULL),(4,'m','$2b$10$yoFA4mEQzFfM2YhewvrRne/ExqJwm4RdFFtOVy/14e7uIL/9rfGjO','2024-04-20 19:50:35','m','m',NULL,NULL),(5,'a','$2b$10$3ZGY0dVbz5WZJbmuPh9abOwnPkfuc2KSjehUWUYEJpOQCKKCD8VnW','2024-04-20 19:51:43','a','a',NULL,NULL),(6,'s','$2b$10$nkHh/YnCmD8AzpIQzODGpercHZDGg4kQqPx4z/0gDKLvEzNsj1v0C','2024-04-20 20:02:51','s','s',NULL,NULL),(7,'i','$2b$10$V0bmA1vXqEeMt8mwtj1Coee0yEFXB9S9tefRlZqK16q4QzDCKHoUW','2024-04-20 20:05:12','i','i',NULL,NULL),(8,'milmil','$2b$10$4fQOZxq9388CnXF77oPv7e7Fl2ixDY3vlJ07CWLCwazHxX5YC8Ikm','2024-05-17 18:37:44','milmilmil','009809809809',NULL,'barevv'),(9,'hi','$2b$10$mm48rTvWsqtpCAUaLLhe1eVgRhWnAcx7/206lKGs6jgzjMTxFBsQ2','2024-05-17 22:00:34','hi','10298374',NULL,NULL),(10,'mimi','$2b$10$RPoUFu7ozhPZZGNpCVa1rOWfISDfb6YgvM1UsKPuTzKVfqqKP7jJG','2024-05-20 13:44:53','mimi','2-13045','/uploads/profilePicture-1716837097350-182819401.png','sjdkjd'),(11,'qwe','$2b$10$ApeKWXoD.XAVkUdE98uSXu9UyT5..YDUjF.zrh80M7kW71MCQEsEG','2024-05-20 14:50:06','qwsd','12345',NULL,NULL),(12,'+','$2b$10$yrTYEZFqjGCo5es7Qvts9eZo2V/OvM50NeCHaSy4AIz23u8rwp9b2','2024-05-20 14:50:41','m','099181818',NULL,NULL),(13,'sadf','$2b$10$UFRsmXae.uU3zPW4m/jZ9eDLjVtMdTJxfZuj1k4A1eLHNNgb2mmhS','2024-05-20 14:58:33','laksd','098765',NULL,NULL),(14,'w','$2b$10$tywW.u60Om0o85xYWzWr..Mz7/e61EznwPdcaWWJLuMg5qjmztfvC','2024-05-20 15:00:05','w','we1234',NULL,NULL),(15,'r','$2b$10$dUelnjAandvzbYpL9gG1OePBUJ8cJr.IGaGRtYdSYfORRBIRO/08m','2024-05-20 15:00:58','r','123',NULL,NULL),(16,'p','$2b$10$h3jT/Uw.tx4WJfAacHXui.ugn1aQ8DQMDyewIBp85hZUZpdBrD4zC','2024-05-20 15:05:30','p','12345678',NULL,NULL),(17,'Whateverrrr……','$2b$10$hH.MFHMvBYjADadsvYEUF.l2x9yhzmnpdmELBE8dKm1ao54rbBNlS','2024-05-26 13:30:00','srsly.milena_','098775677','/uploads/profilePicture-1718370092099-161794264.jpeg',NULL),(18,'ruz','$2b$10$ofnGtXRjfKri4lymydSq8uko6AAazusH6/w7163R9s1ikaIYSW1eC','2024-05-27 19:14:25','ruz','083901993','/uploads/profilePicture-1716837452520-609425779.png',NULL),(19,'ruzik','$2b$10$DqaOyfhk.R5FYTbiGkIkc.18wnw98sEWSb5EplXwWOWRgOHoHuiiu','2024-05-27 19:18:06','ruzik','094880002','/uploads/profilePicture-1716837561168-740164406.png',NULL),(20,'asdf','$2b$10$P/gv8dx4Z0XP04hv1c4r9eV37cItv0Uof7IN0vdXIznBlc.aMZ.fG','2024-05-28 08:06:52','qasdf','1234',NULL,NULL),(21,'billie','$2b$10$wPU81pYkM3QZxwENxQWk9.8AaCD89y66sAz5BrMdQLLcT1AH220fW','2024-05-30 12:59:11','billiee','12345123',NULL,NULL),(22,'helllo','$2b$10$9XJ4QZRgirV4QoyRazcXxOMTBSyGpOY8DMz2.FdLYHUkVNrWgXsmG','2024-06-04 12:22:42','hello','12341234',NULL,NULL),(23,'axjik','$2b$10$17m9c6HW0wTgwn6.1/tbcOqDgcMuvY1PxPvIhaWK3D1FtFURHOEXG','2024-06-14 12:38:56','axjik','023458901',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_user` AFTER INSERT ON `users` FOR EACH ROW BEGIN
  INSERT INTO profiles (user_id) VALUES (NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-15 15:38:54
