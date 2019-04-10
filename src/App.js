import React, {Component} from 'react'
import Header from './components/ui/Header/Header'
import Library from './components/Library';
import AddBook from './components/AddBook';
import KeyStorage from './components/KeyStorage';
import ErrorNotification from './components/ErrorNotification';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            count: 0,
            success: false,
            apiKey: localStorage.getItem("API-Key")
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

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${this.state.apiKey}&title=${title}&author=${author}`)
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

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${this.state.apiKey}&id=${id}`)
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
            title = this.state.books.filter(book => book.id === id)[0].title;
        }

        if(author === ""){
            author = this.state.books.filter(book => book.id === id)[0].author;
        }

        if (this.state.success) {
            this.setState({success: false, count: 0});
        }

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${this.state.apiKey}&id=${id}&title=${title}&author=${author}`)
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
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${this.state.apiKey}`)
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
        if(!this.state.apiKey){
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

export default App;
