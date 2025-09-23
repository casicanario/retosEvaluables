import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // Método para cargar libros desde el servicio
  loadBooks(): void {
    this.books = this.booksService.getAll();
    this.filteredBooks = [...this.books]; // Copia inicial
  }

  // Método para buscar libros
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredBooks = [...this.books];
    } else {
      this.filteredBooks = this.booksService.search(this.searchTerm);
      if (this.filteredBooks.length === 0) {
        this.toastr.info(`No se encontraron libros para "${this.searchTerm}"`, 'Búsqueda sin resultados');
      }
    }
  }

  // Método para limpiar búsqueda
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredBooks = [...this.books];
  }

  // Método para eliminar un libro usando el servicio
  deleteBook(id: number): void {
    // Mostrar confirmación antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      const success = this.booksService.delete(id);
      if (success) {
        this.loadBooks(); // Recargar la lista después de eliminar
        this.onSearch(); // Actualizar filtros si hay búsqueda activa
        this.toastr.success('Libro eliminado correctamente', 'Eliminación exitosa');
      } else {
        this.toastr.error('No se pudo eliminar el libro', 'Error');
      }
    }
  }

  // Método para el trackBy de ngFor
  trackByBookId(index: number, book: Book): number {
    return book.id_book || index;
  }
}
