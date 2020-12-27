const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
var connection = require('./coneccion');
var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.listen(80, () => {
    console.log("Server Running");
    connection.connect(function(err) {
        if (err) throw err;
        console.log("CONEXION A LA BASE DE DATOS EXITOSA!");
    });

});
app.get("/", (req, res) => {
    res.send("SERVIDO API FUNCIONANDO!!")

});
app.post("/insert", (req, res) => {
    var sql = `INSERT INTO juego (nombre, imagen_juego) VALUES ('${req.body.nombre}','${req.body.url_imagen}')`;

    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(406);
        res.status(201).json({
            id: result.insertId
        });
    });
});
app.post("/insertusuario", (req, res) => {
    var sql = `INSERT INTO usuario (nombre_usuario, contasena) VALUES ('${req.body.nombre}','${req.body.contrasena}')`;
    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(404);
        res.send(result)
    });
});
app.post("/insertdescarga", (req, res) => {
    var sql = `INSERT INTO descarga (id_usuario, id_juego) VALUES ('${req.body.id_usuario}','${req.body.id_juego}')`;
    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(404);
        res.send(result)
    });
});

app.get("/getjuegos", (req, res) => {
    var sql = "SELECT * FROM juego;";
    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(404);
        res.send(result)
    });
});

app.get("/getdescargas", (req, res) => {
    var sql = "SELECT * FROM descarga;";
    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(404);
        res.send(result)
    });
});

app.get("/getusuario", (req, res) => {
    var sql = `SELECT * FROM usuario where id_usuario ('${req.body.nombre_usuario}')`;
    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(404);
        res.send(result)
    });
});

app.get("/getalldescargas", (req, res) => {
    var sql = `SELECT id_juego,id_usuario, COUNT(*) as total FROM descarga  WHERE id_usuario=${req.body.id_usuario} GROUP BY id_juego`;
    connection.query(sql, function(err, result) {
        if (err) res.sendStatus(404);
        res.send(result)
    });
});