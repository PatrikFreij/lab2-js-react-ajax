import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import Library from './components/Library';
import AddBook from './components/AddBook';
import KeyStorage from './components/KeyStorage';
import ErrorNotification from './components/ErrorNotification';

let count = 1;
const apiKey = localStorage.getItem("API-Key");
// const apiKey = "kJ0Ha";

class App extends Component {

    state = {
        books: [],
        error: false
    }

    componentDidMount = () => {
        this.selectBooks();
    }

    addBook = (title, author) => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${apiKey}&title=${title}&author=${author}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    this.setState({ error: true });
                    this.addBook(title, author);
                    count++;
                    console.log("add book count: " + count);
                }
                this.selectBooks();
            });
    }

    delBook = (id) => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${apiKey}&id=${id}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    this.setState({ error: true });
                    count++;
                    this.delBook(id);
                }
                count = 0;
                this.selectBooks();
            });
    }

    modifyBook = (title, author, id) => {
        console.log(title, author, id);
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${apiKey}&id=${id}&title=${title}&author=${author}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    this.setState({ error: true });
                    this.modifyBook(title, author, id);
                    count++;
                    console.log("modify book count: " + count);
                }
                this.selectBooks();
            });
    }

    selectBooks = () => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${apiKey}`)
            .then(response => response.json())
            .then((data) => {
                if (data.status !== "success" && count <= 10) {
                    this.setState({ error: true });
                    count++;
                    console.log("select book count: " + count);
                    this.selectBooks();
                } else {
                    count = 0;
                    this.setState({ books: data.data });
                }

            });
    };

    render() {
        console.log("Sidan laddades");
        return (
            <div className="App">
                <Header />
                <KeyStorage />
                <ErrorNotification count={count} />
                <div className="container">
                    <div className="row form-section">
                        <AddBook addBook={this.addBook} />
                    </div>
                </div>
                <div className="display-books">
                    <div className="container">
                        <div className="col-12">
                            <ul className="list-group">
                                <Library delBook={this.delBook} books={this.state.books}
                                modifyBook={this.modifyBook} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
