const express = require("express");
const fs = require("fs")

///serverside
const app = express();
const PORT = 8080;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set("views", "./views")
app.set("view engine", "pug")

const productos = [];

app.post('/products', (req, res) => {
    const data = req.body
    const id = productos.length + 1;
    productos.push({id, ...data})
    res.render("form.pug", {title:"Agregado con exito."})
})

app.get('/', (req, res) => {
    res.render("form.pug", {title: "Agregar un producto"})
})

app.get('/:id', (req, res) => {
    let id = req.params.id
    let resultado = productos.filter(function (productos) {
        return productos.id == id})
    let resultado1 = (resultado.length > 0) ? resultado[0] : res.json("Producto no encontrado")

    res.json(resultado1)
});

app.put('/:id', (req, res) => {
    const id = req.params.id
    const replaced = req.body

    if (isNaN(id)) {
        return res.json( {error: "el valor ingresado no es un numero"})
    }
    
    const find = productos.find(element => element.id === id)

    const index = productos.indexOf(find)

    productos.splice(index, 1, replaced)
    res.json({ok: refreshed})
})

app.delete('/:id', (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        return res.json( {error: "el valor ingresado no es un numero"})
    }

    const index = productos.indexOf(productos.find(element => element.id ===id))
    productos.splice(index,1)

    res.json({
        result: 'ok',
        id: req.params.id
    })

})


app.use('/api/productos', routerProductos)

app.listen(PORT, () => { console.log("servidor escuchando correctamente") })