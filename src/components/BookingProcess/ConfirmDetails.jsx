import React from 'react'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import Alerts from '../Alerts/Alerts';
import requests from '../../lib/requests-authenticated'
import { Button } from 'react-bootstrap'
import { appendImgs } from '../../lib'
import { useSelector } from 'react-redux'

const { sendMedicalRequest } = requests

function ConfirmDetails(
    {
        testsImgs,
        requestTags,
        facility,
        availability,
        setBookingSteps,
        handleBack
    }) {
    const [showError, setShowError] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)
    const user = useSelector(s => s?.user)
    const { phone_primary, email } = user

    const sendRequest = async () => {
        try {
            setIsSpinning(true)
            const newForm = new FormData()
            if (testsImgs) {
                const formWithImgRequests = appendImgs(newForm, testsImgs)

                const stringifiedTags = JSON.stringify(requestTags)
                const stringifiedFacility = JSON.stringify(facility)
                const stringifiedAvailability = JSON.stringify(availability)
                formWithImgRequests.append('medicalRequestsTags', stringifiedTags)
                formWithImgRequests.append('userAvailability', stringifiedAvailability)
                formWithImgRequests.append('facility', stringifiedFacility)

                const res = await sendMedicalRequest(formWithImgRequests)
                if (res.status === 201) {
                    setTimeout(() => {
                        setIsSpinning(false)
                        setShowError(false)
                        setBookingSteps({
                            medicalTests: false,
                            facility: false,
                            generalAvailability: false,
                            pickDate: false,
                            checkPersonalDetails: false,
                            successScreen: true
                        })

                    }, 800)
                    // setIsSpinning(false)
                    // setShowError(false)
                    // setBookingSteps({
                    //     medicalTests: false,
                    //     facility: false,
                    //     generalAvailability: false,
                    //     pickDate: false,
                    //     checkPersonalDetails: false,
                    //     successScreen: true
                    // })
                } else {
                    setIsSpinning(false)
                    setShowError(true)
                }


            } else {
                const stringifiedTags = JSON.stringify(requestTags)
                const stringifiedFacility = JSON.stringify(facility)
                const stringifiedAvailability = JSON.stringify(availability)
                newForm.append('medicalRequestsTags', stringifiedTags)
                newForm.append('userAvailability', stringifiedAvailability)
                newForm.append('facility', stringifiedFacility)

                const res = await sendMedicalRequest(newForm)
                if (res.status === 201) {
                    setTimeout(() => {
                        setIsSpinning(false)
                        setShowError(false)
                        setBookingSteps({
                            medicalTests: false,
                            facility: false,
                            generalAvailability: false,
                            pickDate: false,
                            checkPersonalDetails: false,
                            successScreen: true
                        })

                    }, 800)
                } else {
                    setIsSpinning(false)
                    setShowError(true)
                }

            }

        } catch (error) {
            console.log(error)
        }
    }

    const returnStep = () => {
        handleBack()
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: true,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }
    return (
        <div className="d-flex flex-column flex-center-center">
            <h4 className="mt-5 text-center">Confirm contact details</h4>
            <div className="d-flex flex-column w-75">
                <p className="mt-5"><strong>Phone:</strong></p>
                <p>{phone_primary}</p>
                <p className="mt-4"><strong>Email:</strong></p>
                <p>{email}</p>
                <div className="d-flex justify-content-between flex-column align-items-center mt-5">
                    <div className="w-100">
                        {isSpinning ? <Spinner /> : ''}
                        {showError ? <Alerts
                            title='We got an error'
                            message='Sorry, the problem is on server'
                            state="danger" />
                            : ''}
                    </div>
                    <div className="d-flex align-content-center justify-content-between mt-3 w-100">
                        <div className="cursor-pointer py-2 pr-2" onClick={returnStep}>
                            <span>Return</span>
                        </div>
                        <Button onClick={() => sendRequest()} className="w-50"><strong>Confirm</strong></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDetails
