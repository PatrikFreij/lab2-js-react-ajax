import React, { Component } from 'react';
import Book from './Book';

class Library extends Component {
    render(){
        return this.props.books.map((book) => (
            <Book delBook={this.props.delBook} book={book}/>
        ))
    }
}

export default Library;