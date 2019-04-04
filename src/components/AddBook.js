import React, { Component } from 'react';

class AddBook extends React.Component{

    state = {
        title: '',
        author: ''
    }

    onSubmit = (e) => {
        console.log(this.state.author, this.state.title);
        e.preventDefault();
        this.props.addBook(this.state.title, this.state.author);
        this.setState({title: '', author: ''});
    }

    onChangeTitle = (e) => this.setState({title: e.target.value});
    onChangeAuthor = (e) => this.setState({author: e.target.value});

    render(){
        return(
            <form className="book-form col-6" onSubmit={this.onSubmit}>
                <legend>Lägg till dina favoritböcker</legend>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="title"
                        placeholder="Lägg till titel"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        rows="3"
                        data-gramm="true"
                        data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                        data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                        data-gramm_editor="true"
                        placeholder="Lägg till författare"
                        value={this.state.author}
                        onChange={this.onChangeAuthor}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"

                >
                    Skicka
                </button>
            </form>
        )

    }
}

export default AddBook;