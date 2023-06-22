import { render, screen, fireEvent } from '@testing-library/react';
import Book from './Book';

test('renders book title and authors', () => {
  const book = {
    id: 1,
    title: 'Sample Book',
    authors: [{ name: 'Author 1' }, { name: 'Author 2' }],
    formats: { 'image/jpeg': 'book.jpg' }
  };
  render(<Book book={book} selectBook={() => {}} selectedBooks={[]} />);
  
  const titleElement = screen.getByText('Sample Book');
  expect(titleElement).toBeInTheDocument();
  
  const authorsElement = screen.getByText('Author 1, Author 2');
  expect(authorsElement).toBeInTheDocument();
});

test('selects and deselects book', () => {
  const book = {
    id: 1,
    title: 'Sample Book',
    authors: [{ name: 'Author' }],
    formats: { 'image/jpeg': 'book.jpg' }
  };
  const selectBook = jest.fn();
  render(<Book book={book} selectBook={selectBook} selectedBooks={[]} />);
  
  const checkboxElement = screen.getByLabelText('Sample Book');
  fireEvent.click(checkboxElement);
  expect(selectBook).toHaveBeenCalledWith(book);
  
  fireEvent.click(checkboxElement);
  expect(selectBook).toHaveBeenCalledWith(book);
});
