import React, {Component} from 'react'
import Header from './components/ui/Header/Header'
import Library from './components/Library';
import AddBook from './components/AddBook';
import KeyStorage from './components/KeyStorage';
import ErrorNotification from './components/ErrorNotification';

const apiKey = localStorage.getItem("API-Key");

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            count: 0,
            success: false
        }
    }

    componentDidMount = () => {
        this.selectBooks();
        this.getInitialAPIKey();
    };

    addBook = (title, author) => {
        if (this.state.success) {
            this.setState({success: false, count: 0});
        }

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${apiKey}&title=${title}&author=${author}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && this.state.count < 10) {
                    this.addBook(title, author);
                    this.setState({count: this.state.count + 1});
                } else if (this.state.count < 10) {
                    this.setState({success: true});
                    this.selectBooks();
                }
            });
    };

    delBook = (id) => {

        if (this.state.success) {
            this.setState({success: false, count: 0});
        }

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${apiKey}&id=${id}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && this.state.count < 10) {
                    this.setState({count: this.state.count + 1});
                    this.delBook(id);
                } else {
                    this.setState({success: true});
                    this.selectBooks();
                }
            });
    };

    modifyBook = (title, author, id) => {
        if(title === ""){
            for (let i = 0; i < this.state.books.length; i++) {
                if (this.state.books[i].id === id) {
                    title = this.state.books[i].title;
                }
            }
        }

        if(author === ""){
            for (let i = 0; i < this.state.books.length; i++) {
                if (this.state.books[i].id === id) {
                    author = this.state.books[i].author;
                }
            }
        }

        if (this.state.success) {
            this.setState({success: false, count: 0});
        }

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${apiKey}&id=${id}&title=${title}&author=${author}`)
            .then(resp => resp.json())
            .then((data) => {
                if (data.status !== "success" && this.state.count < 10) {
                    this.setState({count: this.state.count + 1});
                    this.modifyBook(title, author, id);
                } else if (this.state.count < 10) {
                    this.setState({success: true});
                    this.selectBooks();
                }
            });
    };

    selectBooks = () => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${apiKey}`)
            .then(response => response.json())
            .then((data) => {
                if (data.status !== "success" && this.state.count < 10) {
                    this.setState({count: this.state.count + 1});
                    this.selectBooks();
                } else if (this.state.count < 10) {
                    this.setState({success: true});
                    this.setState({books: data.data});
                }
            });
    };

    getInitialAPIKey = () => {
        if(!apiKey){
            fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
                .then(resp => resp.json())
                .then(data => localStorage.setItem("API-Key", data.key))
        }
    };

    render() {
        return (
            <div className="App">
                <Header/>
                <KeyStorage />
                <ErrorNotification count={this.state.count}/>
                <div className="container">
                    <div className="row form-section">
                        <AddBook addBook={this.addBook}/>
                    </div>
                </div>
                <div className="display-books">
                    <div className="container">
                        <div className="col-12">
                            <ul className="list-group">
                                <Library delBook={this.delBook} books={this.state.books}
                                         modifyBook={this.modifyBook}/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
