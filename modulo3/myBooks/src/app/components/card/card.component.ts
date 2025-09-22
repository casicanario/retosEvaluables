import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() book!: Book;
  @Output() deleteBook = new EventEmitter<number>();

  // Método para manejar el click del botón eliminar
  onDelete(): void {
    this.deleteBook.emit(this.book.id_book);
  }

  // Método para obtener la clase CSS del botón según el precio
  getButtonClass(price: number): string {
    if (price < 15) {
      return 'btn-green';
    } else if (price < 25) {
      return 'btn-blue';
    } else {
      return 'btn-teal';
    }
  }
}
