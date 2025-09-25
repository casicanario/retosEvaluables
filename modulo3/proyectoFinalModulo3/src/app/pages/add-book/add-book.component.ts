import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BooksService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(
    private booksService: BooksService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Método para manejar el evento de libro añadido desde el formulario
  onBookAdded(book: Book): void {
    this.booksService.add(book);
    
    // Mostrar notificación de éxito
    this.toastr.success(`El libro "${book.title}" ha sido añadido exitosamente`, 'Libro añadido');
    
    // Redirigir a la página de libros después de 2 segundos
    setTimeout(() => {
      this.router.navigate(['/books']);
    }, 2000);
  }
}
