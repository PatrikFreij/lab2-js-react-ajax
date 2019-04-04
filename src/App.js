import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import Library from './components/Library';
import AddBook from './components/AddBook';

const apiKey = 'kJ0Ha';
let count = 0;


class App extends Component {

    state = {
        books: []
    }
    //Api nyckel: kJ0Ha
    componentDidMount = () => {
        this.selectBooks();
    }
    addBook = (title, author) => {
        const newBook = {
            title,
            author
        };
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${apiKey}&title=${newBook.title}&author=${newBook.author}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    count++;
                    this.addBook(title, author);
                }
                count = 0;
                this.selectBooks();
            });
    }

    delBook = (id) => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${apiKey}&id=${id}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    count++;
                    this.delBook(id);
                }
                count = 0;
                this.selectBooks();
            });
    }

    selectBooks = () => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${apiKey}`)
            .then(response => response.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    count++;
                    this.selectBooks();
                }
                count = 0;
                this.setState({ books: data.data });

            });
    };
    /*
        checkError = (operation, data) => {
            if (data.status !== "success") {
                switch(operation){
                    case "delete":
                        this.delBook(data.data.id);
                        break;
                    case "add":
                        this.addBook()
                }
                console.log("Failed to fetch data. Reason: " + data.message);
                count++;
                this.selectBooks();
            } else {
                console.log();
                this.setState({books:data.data});
            }
        }*/

    render() {
        return (
            <div className="App">
                <Header />
                <div className="container">
                    <div className="row form-section">
                        <AddBook addBook={this.addBook} />
                    </div>
                </div>
                <div className="display-books">
                    <div className="container">
                        <div className="col-12">
                            <ul className="list-group">
                                <Library delBook={this.delBook} books={this.state.books} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
