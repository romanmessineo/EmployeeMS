import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10, // Ajusta según sea necesario
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems",
    port: 3306,
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









