CREATE DATABASE IF NOT EXISTS `locations_db`;
use `locations_db`

CREATE TABLE IF NOT EXISTS `locations`(
    `id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `coordinates` GEOMETRY NOT NULL 
);


INSERT INTO 
    `locations` (`city`, `country`, `coordinates` ) 
VALUES 
("London", "United Kingdom", ST_GeomFromText('POINT(51.5144636 -0.142571)') ),
("Beirut", "Lebanon", ST_GeomFromText('POINT(33.879879 35.514409)') );


DROP FUNCTION IF EXISTS GetCoordinates;
CREATE FUNCTION GetCoordinates (coordinates GEOMETRY) RETURNS CHAR(255) DETERMINISTIC
    RETURN CONCAT(ST_X(coordinates), ",", ST_Y(coordinates));
