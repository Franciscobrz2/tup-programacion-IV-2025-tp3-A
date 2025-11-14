CREATE TABLE `nota` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int NOT NULL,
  `materia_id` int NOT NULL,
  `nota1` decimal(3,1) NOT NULL,
  `nota2` decimal(3,1) NOT NULL,
  `nota3` decimal(3,1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nota_materia_fk2_idx` (`materia_id`),
  KEY `nota_alumno_fk1_idx` (`alumno_id`),
  CONSTRAINT `nota_alumno_fk1` FOREIGN KEY (`alumno_id`) REFERENCES `alumno` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nota_materia_fk2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)