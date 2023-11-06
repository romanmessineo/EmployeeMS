import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect(function (err) {
    if (err) {
        console.log("Error de conexión")
    } else {
        console.log("Conectado")
    }
})

export default con;










