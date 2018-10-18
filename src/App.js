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
        bookToMove.shelf = destinyShelf;
        this.setState((oldState) => oldState.books.filter((book) => bookToMove.id === book.id).concat(bookToMove));
    };

    filterByShelf = (shelf) => {
        return this.state.books.filter(books => books.shelf === shelf)
    };


    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search/>
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
                            <Link to="/search" />
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
