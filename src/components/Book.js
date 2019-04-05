import React, { Component } from 'react';

class Book extends React.Component{
    render(){
        console.log("En book laddades");
        const {id, title, author, updated} = this.props.book;
        return (
            <li className="list-item list-group-item d-flex align-items-center">
                <strong className="title">{title}</strong>

                <div className="author">{author}</div>

                <div className="buttons">
                    <button type="button" className="btn btn-success">
                        Editera
                    </button>
                    <button onClick={this.props.delBook.bind(this,id)} type="button" className="btn btn-danger">
                        Ta bort
                    </button>
                </div>
            </li>
        )
    }
}

export default Book;