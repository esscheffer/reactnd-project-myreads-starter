import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from "./Bookshelf";
import {Link, Route} from 'react-router-dom';
import Search from "./icons/Search";

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        });
    }

    changeBookShelf = (bookToMove, destinyShelf) => {
        BooksAPI.update(bookToMove, destinyShelf).then(() => {
                bookToMove.shelf = destinyShelf;
                this.setState(
                    oldState => {
                        let newListOfBooks = oldState.books.filter((book) => bookToMove.id !== book.id);
                        if (destinyShelf !== "none") {
                            newListOfBooks = newListOfBooks.concat(bookToMove);
                        }

                        return {books: newListOfBooks}
                    }
                );
            }
        );
    };

    filterByShelf = (shelf) => {
        return this.state.books.filter(books => books.shelf === shelf)
    };


    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search currentBooks={this.state.books} changeBookShelf={this.changeBookShelf}/>
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf bookshelfBooks={this.filterByShelf("currentlyReading")}
                                           bookshelfTitle="Currently Reading"
                                           changeBookShelf={this.changeBookShelf}/>
                                <Bookshelf bookshelfBooks={this.filterByShelf("wantToRead")}
                                           bookshelfTitle="Want to Read"
                                           changeBookShelf={this.changeBookShelf}/>
                                <Bookshelf bookshelfBooks={this.filterByShelf("read")}
                                           bookshelfTitle="Read"
                                           changeBookShelf={this.changeBookShelf}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search"/>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
