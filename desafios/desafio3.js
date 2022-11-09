const express = require("express");
const fs = require("fs");

class Contenedor {
    productArray = new Array();
    typeId;


    constructor(fileName) {
        this.fileName = fileName;

        if (fs.existsSync(fileName)) {
            ///si existe el .txt, lo trae. Segun el largo del array, asigna nuevo ID al objeto con el "#", y aclara que se existe el archiv.
            this.productArray = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            this.typeId = this.#detId();
            console.log("Archivo Existente");
        } else {
            ///asigna a 0 el primer ID y crea el nuevo archivo con el nombre asignado en el "new Contenedor("")"
            this.typeId = 0;
            fs.writeFileSync(this.fileName, JSON.stringify(this.productArray));
            console.log("Archivo no encontrado... se creará.");
        }
    };

    ///asignador de ID 
    #detId() {
        if (this.productArray.length > 0) {
            let riseId = this.productArray.reduce((acc, item) => {
                return Math.max(acc, item.id)
            }, 0)
            return riseId + 1;
        } else {
            return 0;
        }
    };

    async save(Object) {
        try {
            if (!this.#thisIs(Object)) {
                Object["id"] = this.typeId + 1;
                this.typeId++;
                this.productArray.push(Object);
                ///escribe en el archivo el objeto con ID asignado.
                await fs.promises.writeFile(this.fileName, JSON.stringify(this.productArray));
                console.log(`Se guardó el libro n° ${Object.id}`);
                return Promise.resolve(Object.id);
            }
            else {
                console.log("Se han guardado los cambios");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    #thisIs(a) {
        let resp = false;
        this.productArray.filter(e => {
            if (e.title == a.title && e.price == a.price && e.img == a.img) {
                resp = true;
            }
        });
        return resp;
    }

    getById(id) {
        ///retorna el encontrado por id ý sino un "null"
        return this.productArray.find(p => p.id == id) || null
    }

    async getAll() {
        try {
            ///lectura, asignación y vista de todos los objetos dentro del file.
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            const newArray = JSON.parse(data)
            return newArray
        }catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        ///Limpia la coincidencia
        this.productArray = this.productArray.filter(p => p.id !== id)

        try {
            ///la escribe en el archivo como es el nuevo array.-
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.productArray));
            return { id }
        }
        catch (error) {
            console.log(error);
        }

    }

    async deleteAll() {
        ///envía un array vacío y luego lo escribe en la ruta correspondiente.
        this.productArray = [];
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.productArray))  //escribe en un archivo
            console.log("Todo borrado");
        }
        catch (error) {
            console.log(error);
        }
    }
}



///pruebas
let libro1 = { title: "El señor de los anillos: La comunidad del anillo", price: 150, img: "./producto1.jpg" };
let libro2 = { title: "El señor de los anillos: Las dos torres", price: 200, img: "./producto2.jpg" };
let libro3 = { title: "El señor de los anillos: El retorno del rey", price: 250, img: "./producto3.jpg" };

///asignacion de ruta
const books = new Contenedor("./productos.txt");
///serverside
const app = express();
const PORT = 8080;

app.listen(PORT, () => {console.log("servidor escuchando correctamente")})


app.get("/books", async (req, res) =>{
    const P = await books.getAll();
    res.send(P)
});

app.get("/random", async (req, res) => {
    const P = await books.getAll();
    let nu = Math.floor(Math.random() * P.length);
    res.send(P[nu]);
});
