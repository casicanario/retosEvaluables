import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books: Book[] = [
    new Book('El Quijote', 'Novela', 'Miguel de Cervantes', 25.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 1, 1),
    new Book('1984', 'Distopía', 'George Orwell', 18.50, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 2, 1),
    new Book('Cien años de soledad', 'Realismo mágico', 'Gabriel García Márquez', 22.75, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 3, 2),
    new Book('Clean Code', 'Técnico', 'Robert C. Martin', 35.00, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 4, 2)
  ];

  constructor() { }

  // Método para obtener todos los libros
  getAll(): Book[] {
    return [...this.books]; // Retorna una copia del array para evitar mutaciones externas
  }

  // Método para añadir un libro
  add(book: Book): void {
    // Generar un nuevo ID único para el libro
    const newId = this.books.length > 0 ? Math.max(...this.books.map(b => b.id_book)) + 1 : 1;
    book.id_book = newId;
    book.id_user = 1; // Asignar a usuario por defecto
    this.books.push(book);
  }

  // Método para eliminar un libro por ID
  delete(id_book: number): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter(book => book.id_book !== id_book);
    return this.books.length < initialLength; // Retorna true si se eliminó algo
  }

  // Método auxiliar para obtener libros por usuario
  getBooksByUser(userId: number): Book[] {
    return this.books.filter(book => book.id_user === userId);
  }

  // Método para obtener un libro por ID (requerido por reto)
  getOne(id_libro: number): Book | undefined {
    return this.books.find(book => book.id_book === id_libro);
  }

  // Método auxiliar para obtener un libro por ID
  getById(id_book: number): Book | undefined {
    return this.books.find(book => book.id_book === id_book);
  }

  // Método para editar un libro (requerido por reto)
  edit(book: Book): boolean {
    const index = this.books.findIndex(b => b.id_book === book.id_book);
    if (index !== -1) {
      this.books[index] = { ...book };
      return true;
    }
    return false;
  }

  // Método para buscar libros por título, autor o tipo
  search(searchTerm: string): Book[] {
    if (!searchTerm.trim()) {
      return this.getAll();
    }
    
    const term = searchTerm.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.type.toLowerCase().includes(term)
    );
  }
}
