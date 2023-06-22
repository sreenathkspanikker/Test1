import React from 'react';
import '../assets/css/Book.css';

function Book({ book, selectBook, selectedBooks }) {
  const isSelected = selectedBooks.some((selected) => selected.id === book.id);

  return (
    <div className="book">
      <div className="img-wrap">
        <label htmlFor={`book-${book.id}`}>
          <input
            type="checkbox"
            id={`book-${book.id}`}
            onChange={() => selectBook(book)}
            checked={isSelected}
            aria-label={book.title}
          />
          <img src={book.formats?.['image/jpeg']} alt={book.title} />
        </label>
      </div>
      <div>
        <h3>{book.title}</h3>
        <p>{book.authors.map((author) => author.name).join(', ')}</p>
      </div>
    </div>
  );
}

export default Book;
