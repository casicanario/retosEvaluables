import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() book!: Book;
  @Input() index: number = 0; // Índice para la directiva de colores
  @Output() deleteBook = new EventEmitter<number>();

  constructor(private router: Router) {}

  // Método para manejar el click del botón eliminar
  onDelete(): void {
    this.deleteBook.emit(this.book.id_book);
  }

  // Método para manejar el click del botón editar
  onEdit(): void {
    this.router.navigate(['/update-book', this.book.id_book]);
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
