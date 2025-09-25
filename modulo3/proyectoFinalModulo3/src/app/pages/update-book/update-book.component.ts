import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BooksService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  updateBookForm!: FormGroup;
  bookToEdit: Book | undefined;
  bookId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Obtener el ID del libro desde la ruta
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.loadBook();
    });
  }

  private initForm(): void {
    this.updateBookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      photo: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  private loadBook(): void {
    this.bookToEdit = this.booksService.getOne(this.bookId);
    
    if (this.bookToEdit) {
      // Llenar el formulario con los datos del libro
      this.updateBookForm.patchValue({
        title: this.bookToEdit.title,
        type: this.bookToEdit.type,
        author: this.bookToEdit.author,
        price: this.bookToEdit.price,
        photo: this.bookToEdit.photo
      });
    } else {
      // Mostrar notificación de libro no encontrado
      this.toastr.error(`No se encontró el libro con ID ${this.bookId}`, 'Libro no encontrado');
    }
  }

  onSubmit(): void {
    if (this.updateBookForm.valid && this.bookToEdit) {
      const formValues = this.updateBookForm.value;
      
      // Crear libro actualizado
      const updatedBook = new Book(
        formValues.title,
        formValues.type,
        formValues.author,
        formValues.price,
        formValues.photo,
        this.bookToEdit.id_book,
        this.bookToEdit.id_user
      );

      // Actualizar usando el servicio
      const success = this.booksService.edit(updatedBook);
      
      if (success) {
        this.toastr.success(`El libro "${updatedBook.title}" ha sido actualizado correctamente`, 'Libro actualizado');
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 2000);
      } else {
        this.toastr.error('No se pudo actualizar el libro', 'Error de actualización');
      }
    }
  }
}
