const { promises: fs } = require("fs");

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        try {
            ///lectura, y vista de todos los objetos dentro del file.
            const data = await fs.readFile(this.fileName, "utf-8");
            return JSON.parse(data)
        } catch (err) {
            return []
        }
    }

    async save(book) {
        const data = await this.getAll()

        let newId
        data.length == 0 ? newId = 1 : (newId = data[data.length - 1].id + 1)

        const newBook = { ...book, id: newId }
        data.push(newBook)

            try {
                await fs.writeFile(this.fileName, JSON.stringify(data, null))
                return newId
            }catch(err){
                throw new Error(err)
            }
    }

    async getById(id) {
            const data = await this.getAll()
            const seeker = (data.find(p => p.id == id))
            return seeker
    }


    async deleteById(id) {
        const data = await this.getAll()
        ///Limpia la coincidencia
        const i = data.filter(p => p.id !== id)

        try {
            ///la escribe en el archivo como es el nuevo array.-
            await fs.writeFile(this.fileName, JSON.stringify(i, null, 2));
            return { id }
        }
        catch (error) {
            throw new Error(`${error}`)
        }

    }

    async deleteAll() {
        await fs.writeFile(this.fileName, JSON.stringify([], null, 2))
    }
}



///pruebas
let libro1 = { title: "El señor de los anillos: La comunidad del anillo", price: 150, img: "./producto1.jpg" };
let libro2 = { title: "El señor de los anillos: Las dos torres", price: 200, img: "./producto2.jpg" };
let libro3 = { title: "El señor de los anillos: El retorno del rey", price: 250, img: "./producto3.jpg" };

///asignacion de ruta
const books = new Contenedor("./productos.txt");

///test run

action = () => {

    books.getAll()
        .then(() => books.save(libro1))
        .then(() => books.save(libro2))
        .then(() => books.save(libro3))
        .then(() => books.deleteById(2))
        .then(() => console.log(books.getById(1)))
}
///exe
action();