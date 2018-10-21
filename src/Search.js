import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends Component {
    state = {
        query: '',
        foundBooks: []
    };

    searchBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then(books => {
                if (!books.error) {
                    books.forEach(book => book.shelf = "none");
                    this.setState({
                        foundBooks: books
                    });
                } else {
                    this.setState({
                        foundBooks: []
                    });
                }
            })
        }
    };

    // Don't show books that are already on some shelf
    filterOutShelfBooks = () => {
        return this.state.foundBooks.filter(
            (foundBook) => !this.props.currentBooks.some((currentBook) => currentBook.id === foundBook.id)
        );
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/"/>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={(e) => this.searchBooks(e.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.foundBooks.length === 0 ?
                        <h1>No books found</h1> :
                        <ol className="books-grid">
                            {this.filterOutShelfBooks().map((book) => (
                                <Book key={book.id} book={book} changeBookShelf={this.props.changeBookShelf}/>
                            ))}
                        </ol>
                    }
                </div>
            </div>
        );
    }
}

export default Search;
