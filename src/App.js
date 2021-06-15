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

  // componentDidMount() {
  //   BooksAPI.search('e')
  //     .then((books) => {
  //       console.log(books)
  //       // this.setState(() => ({
  //       //   contacts
  //       // }))
  //     })
  // }

  changeBookStatus = (book, shelf) => {
    // console.log('book', book);
    // console.log('shelf', typeof shelf);

    return new Promise((resolve) => {
      BooksAPI.update(book, shelf);
      book.shelf = shelf;
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
              // <Search search={this.search} books={this.state.books} changeBookStatus={this.changeBookStatus}/>
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
