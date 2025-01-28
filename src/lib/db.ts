// Importerer nødvendige biblioteker for å opprette en databaseforbindelse
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Oppretter en ny pool for å håndtere databaseforbindelsen
const pool = new Pool({
  host: process.env.DB_HOST || 'db', // Bruker miljøvariabel eller standardverdi
  port: Number(process.env.DB_PORT) || 5432, // Bruker miljøvariabel eller standardverdi
  user: process.env.DB_USER || 'jegerenkulbruker', // Bruker miljøvariabel eller standardverdi
  password: process.env.DB_PASSWORD || 'mittkulepassord', // Bruker miljøvariabel eller standardverdi
  database: process.env.DB_NAME || 'minkuledatabase', // Bruker miljøvariabel eller standardverdi
});

// Oppretter en drizzle-instans med poolen som argument for å opprette en ORM-forbindelse
export const db = drizzle(pool);