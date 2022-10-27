class User {
    constructor(nombre, apellido, mascotas, libros) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros
    }
    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`);
    }
    addMascotas = (pet) => {
        this.mascotas.push(pet);
    }
    countMascotas() {
        console.log(this.mascotas.length);
    }
    addBook = (book) => {
        this.libros.push(book);
    }
    getBooks() {
        const speller = this.libros.map((a) => a.nombre);
        console.log(speller);
    }
}

const yo = new User(
    `Sandro`, "Carioli",
    [
        "Perro", "Gato", "Tortuga", "Pez", "Coballo"
    ],
    [{
        nombre: "La Comunidad del Anillo",
        autor: "J.R.R Tolkien"
    },
    {
        nombre: "Las Dos Torres",
        autor: "J.R.R Tolkien"
    },
    {
        nombre: "El Retorno del Rey",
        autor: "J.R.R Tolkien"
    }]
)
yo.getFullName();
yo.addMascotas("Perico");
yo.countMascotas();
yo.addBook({nombre: "El Hobbit", autor: "J.R.R Tolkien"});
yo.getBooks();