import React from "react";
// import { Alert } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Alerts({ title, message, state }) {
    return (
        <Alert severity={state}>
            <AlertTitle>{title}</AlertTitle>
            <p className="my-2">{message}</p>
        </Alert>
    );
}

export default Alerts;
