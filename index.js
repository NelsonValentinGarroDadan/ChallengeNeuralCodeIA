import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import createTables from './services/createTables.js'; 
import routes from './routes/index.js';
import pool from './services/db.js';
import errorHandler from './middlewares/errorHandler.js'

//variables de entorno
dotenv.config();

const app = express();

//configuramos middlewares (morgan para desarrollo)
app.use(express.json());
app.use(morgan("dev"));

//configuramos el router 
routes(app);

//configurando manejador de errores global
app.use(errorHandler);

//configurando puerto
const PORT = process.env.PORT || 8000;

//creamos las tablas si es que no existen
createTables();

//encendiendo el servidor
app.listen(PORT,()=>{
    console.log("Server on in port: ",PORT );
});

//cerramos la conexion con la db cuando se apague el servidor
process.on('SIGINT', async () => {
    console.log("Cerrando conexión con la base de datos...");
    await pool.end();
    process.exit();
});
