import React from 'react';
import Book from "./Book";

const Bookshelf = props => {
    let {bookshelfBooks, bookshelfTitle, changeBookShelf} = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {bookshelfBooks.map((book) => (
                        <Book key={book.id} book={book} changeBookShelf={changeBookShelf}/>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Bookshelf;
