CREATE TABLE `nota` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int DEFAULT NULL,
  `materia_id` int DEFAULT NULL,
  `nota1` int DEFAULT NULL,
  `nota2` int DEFAULT NULL,
  `nota3` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nota_materia_fk2_idx` (`materia_id`),
  KEY `nota_alumno_fk1_idx` (`alumno_id`),
  CONSTRAINT `nota_alumno_fk1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `nota_materia_fk2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
)