import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import requests from "../../lib/requests-authenticated";
import Button from "@mui/material/Button";

const { updateUserData } = requests;
function FormMeta({
    inputsFields,
    name,
    surname,
    email,
    phone_primary,
    setIsEdit,
}) {
    const [inputs, setInputs] = useState([]);
    const [formValue, setFormValue] = useState({
        name: name,
        surname: surname,
        email: email,
        phone_primary: phone_primary,
    });
    const formBuilder = () => {
        const formInputs = inputsFields.map((field) => {
            return {
                id: field,
                label:
                    field === "phone_primary"
                        ? "Phone"
                        : field.charAt(0).toUpperCase() + field.slice(1),
            };
        });
        setInputs(formInputs);
    };

    const formHandler = (value, id) => {
        setFormValue({
            ...formValue,
            [id]: value,
        });
    };

    const sendForm = async (e) => {
        try {
            e.preventDefault();
            // eslint-disable-next-line no-unused-vars
            const res = await updateUserData(formValue);

            setIsEdit(false);
        } catch (error) {}
    };

    useEffect(() => formBuilder(), []);
    return (
        <form
            className="row flex-column mx-auto w-100 justify-content-end"
            onSubmit={sendForm}
        >
            {inputs.map((field, i) => (
                <TextField
                    key={i}
                    className=" my-3 col-12"
                    id={field.id}
                    label={field.label}
                    defaultValue={formValue[field.id]}
                    variant="standard"
                    onChange={(e) => formHandler(e.target.value, field.id)}
                />
            ))}
            <Button type="submit" className="align-self-end ml-auto pr-0">
                Update
            </Button>
        </form>
    );
}

export default FormMeta;
