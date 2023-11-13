import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT_NUMBER
} from './config.js'

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT_NUMBER
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos");
        connection.release(); // Libera la conexión para que pueda ser utilizada por otros
    }
});

export default pool;
