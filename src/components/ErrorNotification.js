import React from 'react'

const ErrorNotification = (props) => {
    return (
        <div>
            {props.count > 0 ? <div>Operationen misslyckades {props.count} gång(er).</div> : <div>Operationen lyckades på första försöket.</div> }
        </div>
    )
};

export default ErrorNotification;