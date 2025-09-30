/**
 * Modelo Book compatible con la API REST
 * Módulo 4 - Tema 4: Integración con API REST
 */
export class Book {
  public id_book: number;
  public id_user: number;
  public title: string;
  public type: string;
  public author: string;
  public price: number;
  public photo: string;

  constructor(
    title: string,
    type: string,
    author: string,
    price: number,
    photo: string,
    id_book: number = 0,
    id_user: number = 0
  ) {
    this.id_book = id_book;
    this.id_user = id_user;
    this.title = title;
    this.type = type;
    this.author = author;
    this.price = price;
    this.photo = photo;
  }

  /**
   * Método para convertir el libro a formato JSON para la API
   */
  toApiFormat(): any {
    return {
      id_book: this.id_book,
      id_user: this.id_user,
      title: this.title,
      type: this.type,
      author: this.author,
      price: this.price,
      photo: this.photo
    };
  }

  /**
   * Método estático para crear un libro desde datos de la API
   */
  static fromApiData(apiData: any): Book {
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
   * Método para validar si el libro tiene datos válidos
   */
  isValid(): boolean {
    return !!(
      this.title &&
      this.type &&
      this.author &&
      this.price > 0
    );
  }

  /**
   * Método para obtener información resumida del libro
   */
  getBookInfo(): string {
    return `${this.title} por ${this.author} - ${this.price}€`;
  }
}