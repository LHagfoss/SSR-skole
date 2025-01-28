import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

// Definerer tabellen 'movies'
export const movies = pgTable('movies', {
  id: serial('id').primaryKey(), // Primærnøkkel for identifikasjon av film
  title: text('title').notNull(), // Tittelen på filmen, ikke null
  release_year: integer('release_year').notNull(), // Året filmen ble utgitt, ikke null
  director: text('director').notNull(), // Regissøren av filmen, ikke null
  genre: text('genre'), // Filmenes genre, kan være null
});

export const actors = pgTable('actors', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  birth_year: integer('birth_year').notNull(),
  moviesdirected: text('moviesdirected').notNull(),
});