import React, { Component } from "react";
import Book from "./book.js";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    books: [],
    searchQuery: "",
  };

  search = (query) => {
    this.setState({
      searchQuery: query.trim(),
    });
    BooksAPI.search(query)
      .then((books) => {
        if (Array.isArray(books)) {
          for (const shelf in this.props.shelfs) {
            this.props.shelfs[shelf].forEach((book) => {
              const bookShownInSearch = books.find((b) => b.id === book.id);
              if (bookShownInSearch) bookShownInSearch.shelf = shelf;
            });
          }
        }
        return books;
      })
      .then((books) => {
        this.setState({
          books: books,
        });
      });
  };

  changeBookStatus = (book, status) => {
    this.props.changeBookStatus(book, status).then((book) => {
      const bookInPrevState = this.state.books.find((b) => b.id === book.id);
      const bookIndex = this.state.books.indexOf(bookInPrevState);
      this.setState((prevState) => {
        prevState.books.splice(bookIndex, 1, book);
        return { books: prevState.books };
      });
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search"> Close </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.search(e.target.value)}
              value={this.state.searchQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books &&
              Array.isArray(this.state.books) &&
              this.state.books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  changeBookStatus={this.changeBookStatus}
                  shelf={book.shelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
