import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import requests from '../../lib/requests-authenticated';
import { setUserTokens } from '../../redux/actions/index.js';
import { useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import Alerts from '../../components/Alerts/Alerts.jsx';
import MuiPhoneInput from 'material-ui-phone-number';

function CompleteRegistration({ location, history }) {
    const dispatch = useDispatch()
    const [showError, setShowError] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)

    const sendInput = async (e) => {
        e.preventDefault()
        console.log(e)
        const phoneFormatted = {
            'phone_primary': e.target[1].value.substring(1, e.target[1].value.length)
        }

        setIsSpinning(true)
        const res = await sendPhoneNumber(phoneFormatted)
        if (res.status === 200) {

            setShowError(false)
            setTimeout(async () => {
                await requests.getMe()

                setIsSpinning(false)
                history.push('/dashboard')
            }, 1500)

        } else {
            setIsSpinning(false)
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
        }
    };

    const sendPhoneNumber = async (phoneNumber) => {
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

    const getTokens = () => {
        const isAccessToken = new URLSearchParams(location.search).get("accessToken")
        const isRefreshToken = new URLSearchParams(location.search).get("refreshToken")
        dispatch(setUserTokens({
            accessToken: isAccessToken,
            refreshToken: isRefreshToken
        }))
    }

    useEffect(() => {
        getTokens()
    }, [])
    return (
        <Row className={"box-shadow my-5 flex-center-center flex-column overflow-hidden"}>
            <Col xs="12" md="12" lg="6" style={{ maxWidth: "328px", padding: "0" }} >
                <h2 className={"mt-5"}>Complete registration</h2>
                <form className="d-flex flex-column" onSubmit={(e)=>sendInput(e)}>
                    <MuiPhoneInput
                    className="mt-3"
                        defaultCountry='it'
                        regions={'europe'}
                        fullWidth
                        id="phone_primary"
                        name="phone_primary"
                        label="Phone number"
                        type="phone_primary"
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
