import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useFormik } from "formik";
import { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import requests from '../../lib/requests-authenticated';
import { setUserTokens } from '../../redux/actions/index.js';
import {useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import Alerts from '../../components/Alerts/Alerts.jsx';

var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const re = /^[0-9\b]+$/;
const validate = (values) => {
    const errors = {};
    if (!values.phone_primary) {
        errors.phone_primary = "Required";
    } else if (!re.test(values.phone_primary)) {
        errors.phone_primary = "Only numbers";
    } else if (
        values.phone_primary.length < 7 ||
        values.phone_primary.length > 10
    ) {
        errors.phone_primary = "Sorry wrong format must have between 7-10 digits";
    } else if (values.phone_primary.match(phoneno)) {
        errors.phone_primary = `It doesn't look like a phone number`;
    }

    return errors;
};

function CompleteRegistration({location, history}) {
    const dispatch = useDispatch()
    const [showError, setShowError] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)

    const formik = useFormik({
        initialValues: {
            phone_primary: "",
        },
        validate,
        onSubmit: async (values) => {
            setIsSpinning(true)
            const res = await sendPhoneNumber(values)
            if(res.status === 200){

                setShowError(false)
                setTimeout(async () => {
                    await requests.getMe()
                    
                    setIsSpinning(false)
                    history.push('/dashboard')
                }, 1500)
                
            } else{
                setIsSpinning(false)
                setShowError(true)
                setTimeout(() => setShowError(false), 3000)
            }
        },
    });

    const sendPhoneNumber = async(phoneNumber)=>{
        try {
            const res = await requests.updateUserData(phoneNumber)
            return res
        } catch (error) {
            setIsSpinning(false)
                setShowError(true)
                setTimeout(() => setShowError(false), 3000)
            console.log(error)  
        }
    }

    const getTokens = ()=>{
        const isAccessToken = new URLSearchParams(location.search).get("accessToken")
        const isRefreshToken = new URLSearchParams(location.search).get("refreshToken")
        dispatch(setUserTokens({
            accessToken: isAccessToken,
            refreshToken: isRefreshToken
        }))
    }

    useEffect(()=> {
        getTokens()
    }, [])
    return (
        <Row className={"box-shadow my-5 flex-center-center flex-column overflow-hidden"}>
            <Col xs="12" md="12" lg="6" style={{maxWidth:"328px", padding:"0"}} >
                <h2 className={"mt-5"}>Complete registration</h2>
                <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        className="my-4"
                        id="phone_primary"
                        name="phone_primary"
                        label="Phone number"
                        type="phone_primary"
                        value={formik.values.phone_primary}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.phone_primary && Boolean(formik.errors.phone_primary)
                        }
                        helperText={
                            formik.touched.phone_primary && formik.errors.phone_primary
                        }
                    />
                    <div className="mt-3 w-100">
                            {isSpinning && <Spinner />}
                            {showError && <Alerts
                                title='We got an error'
                                message='Sorry, something went wrong'
                                state="danger" />
                            }
                        </div>
                    <Button variant={"primary"} className="w-50 align-self-end mb-5" type="submit">
                        Register
                    </Button>
                </form>
            </Col>
        </Row>
    )
}

export default CompleteRegistration
