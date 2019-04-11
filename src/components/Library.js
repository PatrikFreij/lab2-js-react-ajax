import React from 'react'
import Book from './Book'

// Functional component - Bra!
const Library = props => {
  return props.books.map(book => (
    // Varje bok (element i en lista) behöver property key för att React ska kunna hålla reda på dem
    <Book
      key={book.id}
      delBook={props.delBook}
      modifyBook={props.modifyBook}
      // Jag skulle köra en 'spread' på book-objektet
      {...book}
    />
  ))
}

export default Library
