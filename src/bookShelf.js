import React from "react";
import Book from "./book";
const BookShelf = ({ shelf, changeBookStatus }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelf.shelfName}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {shelf.books.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              changeBookStatus={changeBookStatus}
              shelf={book.shelf}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default BookShelf;
