-- Oppretter movies tabellen
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    director VARCHAR(255),
    genre VARCHAR(100)
);


-- Oppretter actors tabellen
CREATE TABLE IF NOT EXISTS actors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_year INT,
    moviesDirected VARCHAR(255)
);


-- Putter inn filmer i movies tabellen
INSERT INTO movies (title, release_year, director, genre) VALUES ('The Matrix', 1999, 'The Wachowskis', 'Science Fiction');
INSERT INTO movies (title, release_year, director, genre) VALUES ('The Matrix Reloaded', 2003, 'The Wachowskis', 'Science Fiction');
INSERT INTO movies (title, release_year, director, genre) VALUES ('The Matrix Revolutions', 2003, 'The Wachowskis', 'Science Fiction');
INSERT INTO movies (title, release_year, director, genre) VALUES ('The Matrix Resurrections', 2021, 'The Wachowskis', 'Science Fiction');


-- Putter inn skuespillere i actors tabellen
INSERT INTO actors (name, birth_year, moviesDirected) VALUES ('Keanu Reeves', 1964, 'The Matrix');
INSERT INTO actors (name, birth_year, moviesDirected) VALUES ('Carrie-Anne Moss', 1967, 'The Matrix');
INSERT INTO actors (name, birth_year, moviesDirected) VALUES ('Laurence Fishburne', 1961, 'The Matrix');
INSERT INTO actors (name, birth_year, moviesDirected) VALUES ('Hugo Weaving', 1960, 'The Matrix');
