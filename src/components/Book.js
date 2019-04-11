import React, { Component } from 'react'

class Book extends Component {
  constructor(props) {
    super(props)

    this.state = {
      change: false,
      title: '',
      author: '',
      id: ''
    }
  }

  onChangeTitle = e => this.setState({ title: e.target.value })
  onChangeAuthor = e => this.setState({ author: e.target.value })

  render() {
    // Snyggt att ni använder destructuring för att deklarera variabler från props
    const {
      id,
      title: defaultTitle,
      author: defaultAuthor,
      modifyBook,
      delBook
    } = this.props
    const { title, author } = this.state
    return (
      <li className="list-item list-group-item d-flex align-items-center">
        {this.state.change === false ? (
          <div className="title-author-container">
            <div>
              <strong className="title">{defaultTitle}</strong>
            </div>
            <div className="author">{defaultAuthor} </div>
          </div>
        ) : (
          <div className="title-author-container">
            <div>
              <input placeholder={defaultTitle} onChange={this.onChangeTitle} />
            </div>
            <div>
              <input
                placeholder={defaultAuthor}
                onChange={this.onChangeAuthor}
              />
            </div>
          </div>
        )}
        <div className="buttons">
          {this.state.change === false ? (
            <button
              type="button"
              onClick={() => this.setState({ change: !this.state.change })}
              className="btn btn-success"
            >
              Editera
            </button>
          ) : (
            <button
              onClick={() => {
                this.setState({ change: !this.state.change })
                modifyBook(title, author, id)
                this.setState({ title: '', author: '' })
              }}
              type="button"
              className="btn btn-success"
            >
              Spara
            </button>
          )}
          <button
            onClick={e => delBook(id)}
            type="button"
            className="btn btn-danger"
          >
            Ta bort
          </button>
        </div>
      </li>
    )
  }
}

export default Book
