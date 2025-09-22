import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BooksService } from '../../shared/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(
    private booksService: BooksService,
    private router: Router
  ) { }

  // Método para manejar el evento de libro añadido desde el formulario
  onBookAdded(book: Book): void {
    this.booksService.add(book);
    
    // Mostrar mensaje de éxito
    alert('¡Libro añadido exitosamente!');
    
    // Opcional: redirigir a la página de libros
    this.router.navigate(['/books']);
  }
}
