import React from 'react';
import {Menu} from 'primereact/menu';

const Book = props => {
    let {book, changeBookShelf} = props;
    let menu;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")`
                    }}/>

                    <div className="book-shelf-changer" onClick={(event) => menu.toggle(event)}/>

                    <Menu popup={true} ref={el => menu = el} appendTo={document.body}
                          model={[
                              {
                                  label: 'Move to...',
                                  items: [
                                      {
                                          label: "Currently Reading",
                                          icon: book.shelf === "currentlyReading" ? "pi pi-check" : "",
                                          command: () => changeBookShelf(book, "currentlyReading"),
                                          disabled: book.shelf === "currentlyReading"
                                      },
                                      {
                                          label: "Want to Read",
                                          icon: book.shelf === "wantToRead" ? "pi pi-check" : "",
                                          command: () => changeBookShelf(book, "wantToRead"),
                                          disabled: book.shelf === "wantToRead"
                                      },
                                      {
                                          label: "Read",
                                          icon: book.shelf === "read" ? "pi pi-check" : "",
                                          command: () => changeBookShelf(book, "read"),
                                          disabled: book.shelf === "read"
                                      },
                                      {
                                          label: "None",
                                          icon: book.shelf === "none" ? "pi pi-check" : "",
                                          command: () => changeBookShelf(book, "none"),
                                          disabled: book.shelf === "none"
                                      }
                                  ]
                              },
                              {
                                  label: "Go to...",
                                  items: [
                                      {
                                          label: "Book info",
                                          command: () => window.open(book.infoLink, "_blank")
                                      }
                                  ]
                              }
                          ]}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(", ") : ''}</div>
            </div>
        </li>
    );
};

export default Book;
