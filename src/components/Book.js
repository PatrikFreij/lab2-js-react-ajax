import React, { Component } from 'react';

class Book extends Component {
    constructor(props){
        super(props);

        this.state = {
            change: false,
            title: '',
            author: '',
            id: ''
        };
    }

    onChangeTitle = (e) => this.setState({ title: e.target.value });
    onChangeAuthor = (e) => this.setState({ author: e.target.value });

    render() {
        const { id, title, author} = this.props.book;
        return (
            <li className="list-item list-group-item d-flex align-items-center">
                {
                    this.state.change === false ?
                        <div className="title-author-container">
                            <div><strong className="title">{title}</strong></div>
                            <div className="author">{author} </div>
                        </div>
                        :
                        <div className="title-author-container">
                            <div><input placeholder={title} onChange={this.onChangeTitle} /></div>
                            <div><input placeholder={author} onChange={this.onChangeAuthor} /></div>
                        </div>
                }
                <div className="buttons">
                    {
                        this.state.change === false ?
                            <button type="button" onClick={() => this.setState({ change: !this.state.change })} className="btn btn-success">Editera</button>
                            :
                            <button onClick={() => {
                                this.setState({ change: !this.state.change });
                                this.props.modifyBook(this.state.title, this.state.author, id);
                                this.setState({ title: '', author: '' });

                            }
                            } type="button" className="btn btn-success">
                                Spara
                    </button>
                    }
                    <button onClick={this.props.delBook.bind(this, id)} type="button" className="btn btn-danger">
                        Ta bort
                    </button>
                </div>
            </li>
        )
    }
}

export default Book;