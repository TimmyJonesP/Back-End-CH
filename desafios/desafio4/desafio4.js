const express = require("express");
const fs = require("fs")

///serverside
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', express.static('public'))

const productos = [];

const routerProductos = express.Router();

routerProductos.post('/', (req, res) => {
    let nuevoProducto = {}
    if (productos.length == 0) {
        nuevoProducto = { ...req.body, id: 1 }
        productos.push(nuevoProducto);
        res.json(`Se creo exitosamente el nuevo producto =` + JSON.stringify(nuevoProducto));
    } else {
        const ultimoId = productos.reverse()
        nuevoProducto = { ...req.body, id: ultimoId[0].id + 1 }
        productos.push(nuevoProducto);
        res.json(`Se creo exitosamente el nuevo producto =` + JSON.stringify(nuevoProducto));
    }
})

routerProductos.get('/', (req, res) => {
    res.json(productos)
})

routerProductos.get('/:id', (req, res) => {
    let id = req.params.id
    let resultado = productos.filter(function (productos) {
        return productos.id == id})
    let resultado1 = (resultado.length > 0) ? resultado[0] : res.json("Producto no encontrado")

    res.json(resultado1)
});

routerProductos.put('/:id', (req, res) => {
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

routerProductos.delete('/:id', (req, res) => {
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