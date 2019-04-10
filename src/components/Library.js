import React from 'react';
import Book from './Book';

const Library = (props) => {
    return (
        props.books.map((book) => (
            <Book delBook={props.delBook} book={book}
                  modifyBook={props.modifyBook}/>
        ))
    )
};

export default Library;