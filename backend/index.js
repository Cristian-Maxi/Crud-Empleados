const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

//Para solucionar el error de envio CORS.
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cris15401212",
    database: "node_crud"
})

app.post("/create", (req, res) => {
    const nombre = req.body.nombre
    const edad = req.body.edad
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query("INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)", [nombre, edad, pais, cargo, anios],
    (error, resultado) => {
        if(error) {
            console.log(error)
        } else {
            res.send(resultado)
        }
    })
});

app.put("/update", (req, res) => {
    const id_empleado = req.body.id_empleado;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query("UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id_empleado=?", [nombre, edad, pais, cargo, anios, id_empleado],
    (error, resultado) => {
        if(error) {
            console.log(error)
        } else {
            res.send(resultado)
        }
    })
});

app.get("/listar", (req, res) => {

    db.query("SELECT * FROM empleados", (error, resultado) => {
        if(error) {
            console.log(error)
        } else {
            res.send(resultado)
        }
    })
});

app.delete("/delete/:id_empleado", (req, res) => {
    const id_empleado = req.params.id_empleado

    db.query("DELETE FROM empleados WHERE id_empleado = ?", [id_empleado], 
    (error, resultado) => {
        if(error) {
            console.log(error)
        } else {
            res.send(resultado)
        }
    })
});



const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("Puerto iniciado")
})


//code: 'ER_NOT_SUPPORTED_AUTH_MODE', errno: 1251

//PARA EL ERROR DE ARRIBA USAR ESTO:
// ALTER USER 'root'@'localhost' IDENTIFIED BY 'Cris15401212' PASSWORD
//   EXPIRE NEVER; ALTER USER 'root'@'localhost' IDENTIFIED WITH
//   mysql_native_password BY 'Cris15401212';