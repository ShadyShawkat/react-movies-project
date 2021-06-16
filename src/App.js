import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import Search from "./search";
import BookShelf from "./bookShelf";

class BooksApp extends React.Component {
  state = {
    shelfs: {
      currentlyReading: [],
      read: [],
      wantToRead: [],
    },
  };

  componentDidMount() {
    BooksAPI.getAll("e").then((books) => {
      this.setState({
        shelfs: {
          currentlyReading: books.filter((b) => b.shelf === "currentlyReading"),
          read: books.filter((b) => b.shelf === "read"),
          wantToRead: books.filter((b) => b.shelf === "wantToRead"),
        },
      });
    });
    // console.log(this.state);
  }

  changeBookStatus = (book, shelf) => {
    // console.log('book', book);
    // console.log('shelf', shelf);

    return new Promise((resolve) => {
      const oldShelf = book.shelf || null;
      BooksAPI.update(book, shelf);
      book.shelf = shelf;

      this.setState((prevState) => {
        if (oldShelf) {
          const bookOnOldShelf = prevState.shelfs[oldShelf].find(
            (b) => b.id === book.id
          );
          const bookIndexOnOldShelf = prevState.shelfs[oldShelf].indexOf(
            bookOnOldShelf
          );
          prevState.shelfs[oldShelf].splice(bookIndexOnOldShelf, 1);
        }
        if (shelf !== "none" || oldShelf === "none") {
          prevState.shelfs[shelf].push(book);
          return prevState;
        }
      });

      resolve(book);
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search
                changeBookStatus={this.changeBookStatus}
                shelfs={this.state.shelfs}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {Object.keys(this.state.shelfs).map((shelfName) => {
                      const books = this.state.shelfs[shelfName];
                      return (
                        <BookShelf
                          key={shelfName}
                          shelf={{ shelfName: shelfName, books: books }}
                          changeBookStatus={this.changeBookStatus}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
