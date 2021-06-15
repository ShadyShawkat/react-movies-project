import React from "react";

const Book = ({book, changeBookStatus}) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage:`url(${book.imageLinks.smallThumbnail})`,
        }}
      />
      <div className="book-shelf-changer">
        <select 
          value={book.shelf || 'none'}
          onChange={(event)=>changeBookStatus(book,event.target.value)}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{Array.isArray(book.authors) && book.authors.join(', ')}</div>
  </div>
);

export default Book
