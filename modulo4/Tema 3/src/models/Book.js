/**
 * Clase Book para representar un libro
 * Módulo 4 - Tema 3: API REST
 */
class Book {
    /**
     * Constructor de la clase Book
     * @param {number} id_book - ID del libro
     * @param {number} id_user - ID del usuario
     * @param {string} title - Título del libro
     * @param {string} type - Tipo de libro
     * @param {string} author - Autor del libro
     * @param {number} price - Precio del libro
     * @param {string} photo - URL de la foto del libro
     */
    constructor(id_book, id_user, title, type, author, price, photo) {
        this.id_book = id_book;
        this.id_user = id_user;
        this.title = title;
        this.type = type;
        this.author = author;
        this.price = price;
        this.photo = photo;
    }

    /**
     * Método para obtener información del libro como string
     * @returns {string} Información formateada del libro
     */
    getBookInfo() {
        return `${this.title} por ${this.author} - Precio: ${this.price}€`;
    }

    /**
     * Método para convertir el libro a objeto JSON
     * @returns {Object} Objeto con las propiedades del libro
     */
    toJSON() {
        return {
            id_book: this.id_book,
            id_user: this.id_user,
            title: this.title,
            type: this.type,
            author: this.author,
            price: this.price,
            photo: this.photo
        };
    }
}

module.exports = Book;