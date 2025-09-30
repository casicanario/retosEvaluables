import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book.model';

// Interfaz para la respuesta de la API
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:3000/books'; // URL de la API REST
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * getAll(): Observable<Object>
   * Devuelve la llamada al endpoint GET "/books"
   */
  getAll(): Observable<Book[]> {
    return this.http.get<ApiResponse<Book[]>>(this.apiUrl)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.map(bookData => this.mapToBookModel(bookData));
          } else {
            throw new Error(response.message || 'Error al obtener los libros');
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * getOne(id_book: number): Observable<Object>
   * Devuelve la llamada al endpoint GET "/books/:id"
   */
  getOne(id_book: number): Observable<Book> {
    const url = `${this.apiUrl}/${id_book}`;
    return this.http.get<ApiResponse<any>>(url)
      .pipe(
        map(response => {
          if (response.success) {
            return this.mapToBookModel(response.data);
          } else {
            throw new Error(response.message || `Libro con ID ${id_book} no encontrado`);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * add(book: Book): Observable<Object>
   * Devuelve la llamada al endpoint POST "/books"
   */
  add(book: Book): Observable<Book> {
    const bookData = this.mapFromBookModel(book);
    return this.http.post<ApiResponse<any>>(this.apiUrl, bookData, this.httpOptions)
      .pipe(
        map(response => {
          if (response.success) {
            return this.mapToBookModel(response.data);
          } else {
            throw new Error(response.message || 'Error al crear el libro');
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * edit(book: Book): Observable<Object>
   * Devuelve la llamada al endpoint PUT "/books/:id"
   */
  edit(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id_book}`;
    const bookData = this.mapFromBookModel(book);
    return this.http.put<ApiResponse<any>>(url, bookData, this.httpOptions)
      .pipe(
        map(response => {
          if (response.success) {
            return this.mapToBookModel(response.data);
          } else {
            throw new Error(response.message || 'Error al actualizar el libro');
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * delete(id_book: number): Observable<Object>
   * Devuelve la llamada al endpoint DELETE "/books/:id"
   */
  delete(id_book: number): Observable<Book> {
    const url = `${this.apiUrl}/${id_book}`;
    return this.http.delete<ApiResponse<any>>(url)
      .pipe(
        map(response => {
          if (response.success) {
            return this.mapToBookModel(response.data);
          } else {
            throw new Error(response.message || 'Error al eliminar el libro');
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Método auxiliar para mapear datos de la API al modelo Book de Angular
   */
  private mapToBookModel(apiData: any): Book {
    return new Book(
      apiData.title,
      apiData.type,
      apiData.author,
      apiData.price,
      apiData.photo || '',
      apiData.id_book,
      apiData.id_user
    );
  }

  /**
   * Método auxiliar para mapear modelo Book de Angular a datos para la API
   */
  private mapFromBookModel(book: Book): any {
    return {
      id_user: book.id_user || 1, // Usuario por defecto si no se especifica
      title: book.title,
      type: book.type,
      author: book.author,
      price: book.price,
      photo: book.photo || ''
    };
  }

  /**
   * Manejo de errores HTTP
   */
  private handleError = (error: any): Observable<never> => {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor. Asegúrate de que la API esté ejecutándose en http://localhost:3000';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      }
    }
    
    console.error('Error en BooksService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Métodos adicionales para compatibilidad con funcionalidades existentes

  /**
   * Método para obtener libros por usuario (requiere llamada a getAll y filtrado local)
   */
  getBooksByUser(userId: number): Observable<Book[]> {
    return this.getAll().pipe(
      map(books => books.filter(book => book.id_user === userId))
    );
  }

  /**
   * Método para buscar libros (requiere llamada a getAll y filtrado local)
   */
  search(searchTerm: string): Observable<Book[]> {
    if (!searchTerm.trim()) {
      return this.getAll();
    }
    
    const term = searchTerm.toLowerCase();
    return this.getAll().pipe(
      map(books => books.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.type.toLowerCase().includes(term)
      ))
    );
  }
}