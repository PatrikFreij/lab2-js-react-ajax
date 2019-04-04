import React, {Component} from 'react'
import Header from './components/ui/Header/Header'
import Library from './components/Library';
import AddBook from './components/AddBook';

const apiKey = 'kJ0Ha';

class App extends Component {

    state = {
        books: [
        ]
    }

    addBook = (title, author) => {
        const newBook = {
            title,
            author
        };

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${apiKey}&title=${newBook.title}&author=${newBook.author}`, {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
        }).then((response) => console.log(response));
    }

    delBook = (id) => {
        this.setState({ books:
                [...this.state.books.filter(book => book.id !== id)]})
    }

    //Api nyckel: kJ0Ha
    componentDidMount(){
        //Select Books
        fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=' + apiKey)
            .then(response => response.json()
                .then(data => data.status === 'success' ? this.setState({books: data.data}) : 1 )
                .catch(error => console.log(error)));
    }

    render() {
        console.log(this.state.books);
        return (
            <div className="App">
                <Header/>
                <div className="container">
                    <div className="row form-section">
                        <AddBook addBook={this.addBook}/>
                    </div>
                </div>
                <div className="display-books">
                    <div className="container">
                        <div className="col-12">
                            <ul className="list-group">
                                <Library delBook={this.delBook} books={this.state.books}/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
