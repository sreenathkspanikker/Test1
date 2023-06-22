import React, { useState, useEffect } from 'react';
import Book from './components/Book';
import './assets/css/App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books?page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks((prevBooks) => [...prevBooks, ...data.results]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch books');
        setIsLoading(false);
      }
    };
  
    fetchBooks();
  }, [page]);  

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
      console.log('End of scroll reached');
      setPage((prevPage) => prevPage + 1);
    }
  };  

  const selectBook = (book) => {
    if (!selectedBooks.some((selected) => selected.id === book.id)) {
      setSelectedBooks([...selectedBooks, book]);
    } else {
      setSelectedBooks(selectedBooks.filter((selected) => selected.id !== book.id));
    }
  };

  return (
    <div className="App" >
      <h1>Books</h1>

      <div className='hearder'>
        <h2 data-testid="selected-books-count">{books.length} Books ({selectedBooks.length} selected)</h2>
        <button onClick={() => setSelectedBooks([])}>Clear Selection</button>
      </div>

      <div className="book-list" onScroll={handleScroll}>
        {books?.map((book) => (
          <Book key={book.id} book={book} selectBook={selectBook} selectedBooks={selectedBooks} />
        ))}
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
}

export default App;