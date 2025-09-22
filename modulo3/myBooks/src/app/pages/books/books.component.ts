import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../shared/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // Método para cargar libros desde el servicio
  loadBooks(): void {
    this.books = this.booksService.getAll();
  }

  // Método para eliminar un libro usando el servicio
  deleteBook(id: number): void {
    const success = this.booksService.delete(id);
    if (success) {
      this.loadBooks(); // Recargar la lista después de eliminar
      console.log(`Libro con ID ${id} eliminado correctamente`);
    } else {
      console.error(`No se pudo eliminar el libro con ID ${id}`);
    }
  }

  // Método para el trackBy de ngFor
  trackByBookId(index: number, book: Book): number {
    return book.id_book || index;
  }
}
