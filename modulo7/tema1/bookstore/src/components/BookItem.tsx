import styles from './BookItem.module.css';

interface Book {
  id_book: number;
  id_user: number;
  title: string;
  type: string;
  author: string;
  price: number;
  photo: string;
}

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookItem = ({ book, onEdit, onDelete }: BookItemProps) => {
  const handleEditBook = () => {
    onEdit(book);
  };

  const handleDeleteBook = () => {
    onDelete(book.id_book);
  };

  return (
    <div className={styles.bookItem}>
      <img 
        src={book.photo} 
        alt={book.title}
        className={styles.bookImage}
      />
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>{book.author}</p>
        <p className={styles.bookType}>{book.type}</p>
        <div className={styles.bookFooter}>
          <span className={styles.bookPrice}>${book.price}</span>
        </div>
        <div className={styles.bookActions}>
          <button 
            onClick={handleEditBook}
            className={styles.btnEdit}
          >
            Editar
          </button>
          <button 
            onClick={handleDeleteBook}
            className={styles.btnDelete}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
