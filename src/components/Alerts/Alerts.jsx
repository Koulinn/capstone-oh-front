import React from 'react'
import { Alert } from 'react-bootstrap';

function Alerts({title, message, state}) {
    return (
        <Alert variant={state}>
            <Alert.Heading>{title}</Alert.Heading>
            <p className="my-2">
                {message}
            </p>
        </Alert>
    )
}

export default Alerts
