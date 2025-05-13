import pool from './db.js';
import { fileURLToPath } from 'url';
import { join } from 'path';
import {readFile} from 'fs/promises';

const createTables = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    // Ahora puedes usar __dirname
    const filePath = join(__dirname, '../db/schema.sql');
    const tables = await readFile(filePath, 'utf-8'); 
  try {
    //mandamos la query de creacion
    await pool.query(tables);
    console.log("Tablas creadas correctamente");
  } catch (err) {
    //mostramos por consola el error
    console.error("Error creando tablas:", err); 
  }
};
export default createTables;