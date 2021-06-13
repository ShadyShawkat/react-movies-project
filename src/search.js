import React, { Component} from 'react';
import Book from './book.js'

class Search extends Component 
{

    state = {
        searchQuery : ''
    }

    search = (query) => {
        console.log(query);
        this.setState({searchQuery: query.trim()});
        this.props.search(query)
    }

    render () {
        return ( 
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => {}}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                  {this.props.books && Array.isArray(this.props.books) && (
                      this.props.books.map((book) => (
                    <Book key={book.id} book={book}/>
                  )))}
                
              </ol>
            </div>
          </div>
        )
    }
}

export default Search