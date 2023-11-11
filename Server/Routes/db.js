// Importar dotenv de manera condicional
if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}
import mysql from 'mysql';

import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT_NUMBER
} from '../config.js'

const pool = mysql.createPool({
    connectionLimit: 10, // Ajusta según sea necesario
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









