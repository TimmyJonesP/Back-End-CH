const Contenedor = require("./desafio2")
const express = require("express");
const fs = require("fs")

///serverside
const app = express();
const PORT = 8080;

app.listen(PORT, () => {console.log("servidor escuchando correctamente")})

const books = new Contenedor("./productos.txt")

app.get("/books", async (req, res) =>{
    const P = await books.getAll();
    res.send(P)
});

app.get("/random", async (req, res) => {
    const P = await books.getAll();
    let nu = Math.floor(Math.random() * P.length);
    res.send(P[nu]);
});
