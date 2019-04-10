import React from 'react';

const KeyStorage = () => {
    const getNewAPIKey = () => {

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
            .then(resp => resp.json())
            .then(data => localStorage.setItem("API-Key", data.key))
        console.log("New APIKey generated: " + localStorage.getItem("API-Key"));
    };

    return (
        <button onClick={getNewAPIKey} type="button" className="btn btn-success ml-5">
            Generera ny API-Nyckel
        </button>
    )
};

export default KeyStorage
