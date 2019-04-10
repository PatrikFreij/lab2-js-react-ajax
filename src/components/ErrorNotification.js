import React from 'react'

const ErrorNotification = (props) => {
    return (
        <div className="error-notification">
            {props.count > 0 ? <h4>Operationen misslyckades {props.count} gång(er).</h4> : <h4>Operationen lyckades på första försöket.</h4> }
        </div>
    )
};

export default ErrorNotification;