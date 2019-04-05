import React, { Component } from 'react'

export class ErrorNotification extends Component {

    render() {
        return (
            <div>Operationen lyckades efter {this.props.count} gånger.</div>
        )
    }
}

export default ErrorNotification
