import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from '../shared/books.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-api',
  templateUrl: './books-api.component.html',
  styleUrls: ['./books-api.component.css']
})
export class BooksApiComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  selectedBook: Book | null = null;
  loading = false;
  error: string | null = null;
  
  // Formulario para nuevo libro
  newBook: Book = new Book('', '', '', 0, '');
  
  private subscriptions: Subscription[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Cargar todos los libros de la API
   */
  loadBooks(): void {
    this.loading = true;
    this.error = null;
    
    const sub = this.booksService.getAll().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
        console.log('✅ Libros cargados:', books);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('❌ Error al cargar libros:', error);
      }
    });
    
    this.subscriptions.push(sub);
  }

  /**
   * Obtener un libro específico por ID
   */
  getBookById(id: number): void {
    this.loading = true;
    this.error = null;
    
    const sub = this.booksService.getOne(id).subscribe({
      next: (book) => {
        this.selectedBook = book;
        this.loading = false;
        console.log('✅ Libro obtenido:', book);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('❌ Error al obtener libro:', error);
      }
    });
    
    this.subscriptions.push(sub);
  }

  /**
   * Agregar un nuevo libro
   */
  addBook(): void {
    if (!this.newBook.isValid()) {
      this.error = 'Por favor, completa todos los campos requeridos';
      return;
    }

    this.loading = true;
    this.error = null;
    
    const sub = this.booksService.add(this.newBook).subscribe({
      next: (createdBook) => {
        this.books.push(createdBook);
        this.resetForm();
        this.loading = false;
        console.log('✅ Libro agregado:', createdBook);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('❌ Error al agregar libro:', error);
      }
    });
    
    this.subscriptions.push(sub);
  }

  /**
   * Editar un libro existente
   */
  editBook(book: Book): void {
    this.loading = true;
    this.error = null;
    
    const sub = this.booksService.edit(book).subscribe({
      next: (updatedBook) => {
        const index = this.books.findIndex(b => b.id_book === updatedBook.id_book);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
        this.loading = false;
        console.log('✅ Libro editado:', updatedBook);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('❌ Error al editar libro:', error);
      }
    });
    
    this.subscriptions.push(sub);
  }

  /**
   * Eliminar un libro
   */
  deleteBook(id: number): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      return;
    }

    this.loading = true;
    this.error = null;
    
    const sub = this.booksService.delete(id).subscribe({
      next: (deletedBook) => {
        this.books = this.books.filter(b => b.id_book !== id);
        this.loading = false;
        console.log('✅ Libro eliminado:', deletedBook);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('❌ Error al eliminar libro:', error);
      }
    });
    
    this.subscriptions.push(sub);
  }

  /**
   * Buscar libros
   */
  searchBooks(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.loadBooks();
      return;
    }

    this.loading = true;
    this.error = null;
    
    const sub = this.booksService.search(searchTerm).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
        console.log('✅ Resultados de búsqueda:', books);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('❌ Error en búsqueda:', error);
      }
    });
    
    this.subscriptions.push(sub);
  }

  /**
   * Resetear formulario
   */
  resetForm(): void {
    this.newBook = new Book('', '', '', 0, '');
  }

  /**
   * Limpiar errores
   */
  clearError(): void {
    this.error = null;
  }

  /**
   * Editar libro inline (simplificado para el ejemplo)
   */
  editBookInline(book: Book): void {
    const newTitle = prompt('Nuevo título:', book.title);
    const newAuthor = prompt('Nuevo autor:', book.author);
    const newGenre = prompt('Nuevo género:', book.genre);
    const newPages = prompt('Nuevas páginas:', book.pages.toString());
    
    if (newTitle && newAuthor && newGenre && newPages) {
      const updatedBook = new Book(newTitle, newAuthor, newGenre, parseInt(newPages), book.description);
      updatedBook.id_book = book.id_book;
      this.editBook(updatedBook);
    }
  }

  /**
   * Función de tracking para ngFor
   */
  trackByBookId(index: number, book: Book): number {
    return book.id_book || index;
  }
}