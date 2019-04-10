import React, { Component } from 'react'

export class KeyStorage extends Component {

    getAPIKey = () => {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
        .then(resp => resp.json())
        .then(data => localStorage.setItem("API-Key", data.key))
    };

    componentDidMount(){
        this.getAPIKey();
    }

  render() {
    return (
      <button onClick={this.getAPIKey} className="btn btn-success ml-5">
        Generera ny API-Nyckel
      </button>
    )
  }
}

export default KeyStorage
