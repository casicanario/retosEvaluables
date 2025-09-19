import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadSampleBooks();
  }

  // Método para cargar libros de ejemplo
  loadSampleBooks(): void {
    this.books = [
      new Book('El Quijote', 'Novela', 'Miguel de Cervantes', 25.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 1, 1),
      new Book('1984', 'Distopía', 'George Orwell', 18.50, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 2, 1),
      new Book('Cien años de soledad', 'Realismo mágico', 'Gabriel García Márquez', 22.75, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 3, 2),
      new Book('Clean Code', 'Técnico', 'Robert C. Martin', 35.00, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 4, 2)
    ];
  }

  // Método para manejar el evento de libro añadido desde el formulario
  onBookAdded(book: Book): void {
    // Generar un nuevo ID único para el libro
    const newId = this.books.length > 0 ? Math.max(...this.books.map(b => b.id_book)) + 1 : 1;
    book.id_book = newId;
    book.id_user = 1; // Asignar a usuario por defecto
    this.books.push(book);
  }

  // Método para eliminar un libro
  deleteBook(id: number): void {
    this.books = this.books.filter(book => book.id_book !== id);
  }

  // Método para obtener libros por usuario
  getBooksByUser(userId: number): Book[] {
    return this.books.filter(book => book.id_user === userId);
  }

  // Método para el trackBy de ngFor
  trackByBookId(index: number, book: Book): number {
    return book.id_book || index;
  }
}
