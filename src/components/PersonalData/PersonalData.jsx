import React from 'react'
import { useFormik, Formik, Field, Form } from "formik"
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { phone } from 'phone';


const re = /^[0-9\b]+$/
const validate = (values) => {
    const errors = {}

    if (!values.name) {
        errors.name = "Required"
    }

    if (!values.surname) {
        errors.surname = "Required"
    }
    if (!values.phone_primary) {
        errors.phone_primary = "Required"
    } else if(!re.test(values.phone_primary)) {
        errors.phone_primary = 'Only numbers'
    } else if(values.phone_primary.length < 7 || values.phone_primary.length > 15 ){
        errors.phone_primary = 'Sorry wrong format must have between 7-10 digits'
    }

    return errors
}



function PersonalData({ userData, setUserData, steps, setSteps }) {
    const [showAlert, setShowAlert] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            phone_primary: "",
        },
        validate,
        onSubmit: (values) => {
            // const normalizedPhone = phone(values.phone_primary, { country: 'UK' })
            setUserData({
                ...userData,
                ...values,
                // phone_primary: normalizedPhone
            })
            setSteps({
                personalData: false,
                accessData: true
            })
        },
    })

    return (
        <>
                <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                    <TextField
                    className="mt-5"
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        className="my-4"
                        fullWidth
                        id="surname"
                        name="surname"
                        label="Surname"
                        type="surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                    />
                    <TextField
                        fullWidth
                        id="phone_primary"
                        name="phone_primary"
                        label="Phone number"
                        type="phone_primary"
                        value={formik.values.phone_primary}
                        onChange={formik.handleChange}
                        error={formik.touched.phone_primary && Boolean(formik.errors.phone_primary)}
                        helperText={formik.touched.phone_primary && formik.errors.phone_primary}
                    />
                    <Button variant={"primary"} className="my-5 w-50 align-self-end" disabled={formik.isValid ? false : true} type="submit">
                        Confirm
                    </Button>
                </form>
        </>
    )
}

export default PersonalData
