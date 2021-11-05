import React from 'react'
import { useState, useEffect } from 'react'
import requests from '../../lib/requests-authenticated'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../redux/actions'
import { Row } from 'react-bootstrap'
import { removeTag } from '../../lib'
import { MdRemove } from 'react-icons/md'
import MedicalTests from '../../components/BookingProcess/MedicalTests'
import Facility from '../../components/BookingProcess/Facility'
import Availability from '../../components/BookingProcess/Availability'
import ConfirmDetails from '../../components/BookingProcess/ConfirmDetails'
import FacilityCard from '../../components/BookingProcess/FacilityCard'
import Success from '../../components/Success/Success'
import TestsPreview from '../../components/BookingProcess/BookingPreview/TestsPreview'
import FacilityLocationPreview from '../../components/BookingProcess/BookingPreview/FacilityLocationPreview'
import AvailabilityPreview from '../../components/BookingProcess/BookingPreview/AvailabilityPreview'
import StepperVert from '../../components/StepperVert/StepperVert'
import BSteps from './bookingSteps.js'

const { getMe } = requests
const successImg = "https://res.cloudinary.com/koulin/image/upload/v1635614779/OneHealth/successOH_wxysls.svg"


function Booking({ history }) {
    const [testsImgs, setTestsImgs] = useState(null)
    const [imgsPreview, setImgsPreview] = useState([])
    const [requestTags, setRequestTags] = useState([])
    const [facility, setFacility] = useState(null)
    const [availability, setAvailability] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(s => s.user)
    const [blur, setBlur] = useState(true)
    const [activeStep, setActiveStep] = useState(0);

    const [bookingSteps, setBookingSteps] = useState({
        medicalTests: true,
        facility: false,
        generalAvailability: false,
        pickDate: false,
        checkPersonalDetails: false,
        successScreen: false
    })

    const { isLogged } = user

    const asyncWrapper = async (token = undefined) => {
        const res = await getMe(token)
        if (res && (res.status === 200)) {
            dispatch(setUserData(res.data.user))
        } else {
            console.log('fail getMe', res)
        }
    }


    useEffect(() => {
        console.log('inside use Effect booking')
        if (isLogged) {
            asyncWrapper()
            setBlur(false)

        } else {
            setBlur(true)
            console.log('inside ELSE use Effect booking')
            history.push('/login')
        }

    }, [])

    useEffect(() => {

    }, [imgsPreview, facility, imgsPreview, bookingSteps])

    const removeImg = (imgIndex) => {
        const remainingImgs = imgsPreview.filter((img, index) => index !== imgIndex)
        const remainingTestImgs = testsImgs.filter((img, index) => index !== imgIndex)
        setTestsImgs(remainingTestImgs)
        setImgsPreview(remainingImgs)
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Row className={"box-shadow my-5 justify-content-center overflow-hidden mx-1" + (blur ? ' blur' : '')}>
            <div className="col-12 col-md-6 my-5">
                <h1 className="text-center">
                    Booking
                </h1>

                <div className="medical-requests-wrapper d-flex flex-center-center flex-column">
                    {bookingSteps.medicalTests ? <MedicalTests
                        setTestsImgs={setTestsImgs}
                        setImgsPreview={setImgsPreview}
                        setRequestTags={setRequestTags}
                        requestTags={requestTags}
                        testsImgs={testsImgs}
                        setBookingSteps={setBookingSteps}
                        handleNext={handleNext}
                        handleReset={handleReset}
                    /> : ''}
                </div>
                <div className="medical-facility-wrapper flex-center-center flex-column">
                    {bookingSteps.facility ?
                        <Facility
                            setFacility={setFacility}
                            facility={facility}
                            setBookingSteps={setBookingSteps}
                            handleNext={handleNext}
                            handleBack={handleBack}
                        />
                        : ''}
                </div>
                <div className={(bookingSteps.generalAvailability || bookingSteps.pickDate) ? 'user-availability-wrapper flex-column  h-100' : ''}>
                    {bookingSteps.generalAvailability || bookingSteps.pickDate ?
                        <Availability
                            setAvailability={setAvailability}
                            availability={availability}
                            setBookingSteps={setBookingSteps}
                            bookingSteps={bookingSteps}
                            handleNext={handleNext}
                            handleBack={handleBack}
                        />
                        : ''}
                </div>

                <div className="confirm-wrapper">
                    {bookingSteps.checkPersonalDetails ? <ConfirmDetails
                        testsImgs={testsImgs}
                        requestTags={requestTags}
                        facility={facility}
                        availability={availability}
                        setBookingSteps={setBookingSteps}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    /> : ''}
                </div>
                <div className="success-wrapper d-flex flex-column justify-content-center align-items-center">

                    {bookingSteps.successScreen ? <Success
                        message="We got your request"
                        extraMessage="In 2 working days we will get in touch to confirm your request!"
                        extraMessage2="You will get an e-mail with the confirmation."
                        Img={successImg}
                        url='/dashboard'
                        btnText="Profile"

                    /> : ''}
                </div>
            </div>











            {!bookingSteps.successScreen ? <>
                <div className="request-info-wrapper d-none d-md-block col-6 my-5">
                    <StepperVert
                        activeStep={activeStep}
                        steps={BSteps}
                        testsPreview={(imgsPreview.length !== 0 || requestTags.length !== 0) ?
                            <TestsPreview
                                imgsPreview={imgsPreview} removeImg={removeImg} requestTags={requestTags} setRequestTags={setRequestTags}
                            /> : null
                        }
                        facilityPreview={facility ?
                            <FacilityLocationPreview facility={facility} /> : null
                        }

                        availabilityPreview={
                            <AvailabilityPreview availability={availability} setAvailability={setAvailability} />
                        }
                    />
                </div>
            </> : ''}
        </Row>
    )
}

export default Booking
