// src/app/components/add-book-form/add-book-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent {
  @Output() bookAdded = new EventEmitter<Book>();

  book: Book = new Book('', '', '', 0, '');

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.bookAdded.emit(new Book(
        this.book.title,
        this.book.type,
        this.book.author,
        this.book.price,
        this.book.photo
      ));
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.book = new Book('', '', '', 0, '');
  }
}