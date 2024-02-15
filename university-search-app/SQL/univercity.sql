CREATE DATABASE university_db;

USE university_db;

CREATE TABLE favourites(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  state VARCHAR(255),
  web_pages VARCHAR(255) NOT NULL
);
