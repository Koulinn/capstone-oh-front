import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import requests from '../../lib/requests-authenticated';
import Button from '@mui/material/Button';



const { updateUserData } = requests
function FormMeta({
    inputsFields,
    name,
    surname,
    email,
    phone_primary,
    setIsLoading,
    setIsEdit
}) {
    const [inputs, setInputs] = useState([])
    const [formValue, setFormValue] = useState({
        name: name,
        surname: surname,
        email: email,
        phone_primary: phone_primary
    })
    const formBuilder = () => {
        const formInputs = inputsFields.map(field => {
            return ({
                id: field,
                label: field === 'phone_primary' ? 'Phone' : field.charAt(0).toUpperCase() + field.slice(1)
            })
        })
        setInputs(formInputs)
    }

    const formHandler = (value, id) => {
        setFormValue({
            ...formValue,
            [id]: value
        })

    }

    const sendForm = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const res = await updateUserData(formValue)


            setIsLoading(false)
            setIsEdit(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => formBuilder(), [])
    return (
        <form className="row mx-auto w-100 justify-content-end" onSubmit={sendForm}>
            {inputs.map(field =>

                <TextField
                    className="m-3"
                    id={field.id}
                    label={field.label}
                    defaultValue={formValue[field.id]}
                    variant="standard"
                    onChange={(e => formHandler(e.target.value, field.id))}
                />
            )}
            <Button type="submit" className="align-self-end mt-3 ml-auto">Update</Button>
        </form>
    )
}

export default FormMeta
