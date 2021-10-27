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

const { getMe } = requests


function Booking({ history }) {
    const [testsImgs, setTestsImgs] = useState(null)
    const [imgsPreview, setImgsPreview] = useState([])
    const [requestTags, setRequestTags] = useState([])
    const [facility, setFacility] = useState(null)
    const [availability, setAvailability] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(s => s.user)

    const [bookingSteps, setBookingSteps] = useState({
        medicalTests: true,
        facility: false,
        generalAvailability: false,
        pickDate: false,
        checkPersonalDetails: false,
        successScreen: false
    })

    const { isLogged } = user

    const asyncWrapper = async () => {
        const res = await getMe()
        if (res && (res.status === 200)) {
            dispatch(setUserData(res.data.user))
        } else {
            console.log('fail getMe', res)
        }
    }


    useEffect(() => {
        if (isLogged) {
            asyncWrapper()

        } else {
            history.push('/login')
        }

    }, [])

    useEffect(() => {

    }, [imgsPreview, facility])

    return (
        <Row className="box-shadow my-5 overflow-hidden mx-1">
            <div className="col-6 my-5">
                <h1 className="text-center">
                    Booking
                </h1>

                <div className="medical-requests-wrapper d-flex flex-center-center flex-column">
                    {bookingSteps.medicalTests ? <MedicalTests
                        setTestsImgs={setTestsImgs}
                        setImgsPreview={setImgsPreview}
                        setRequestTags={setRequestTags}
                        requestTags={requestTags}
                        setBookingSteps={setBookingSteps}
                    /> : ''}
                </div>
                <div className="medical-facility-wrapper flex-center-center flex-column">
                    {bookingSteps.facility ?
                        <Facility
                            setFacility={setFacility}
                            facility={facility}
                            setBookingSteps={setBookingSteps}
                        />
                        : ''}
                </div>
                <div className="user-availability-wrapper flex-center-center flex-column">
                    {bookingSteps.generalAvailability || bookingSteps.pickDate ?
                        <Availability
                            setAvailability={setAvailability}
                            availability={availability}
                            setBookingSteps={setBookingSteps}
                            bookingSteps={bookingSteps}
                        />
                        : ''}
                </div>

                <div className="confirm-wrapper">
                    {bookingSteps.checkPersonalDetails ? <ConfirmDetails
                        testsImgs={testsImgs}
                        requestTags={requestTags}
                        facility={facility}
                        availability={availability}
                    /> : ''}
                </div>
            </div>











            <div className="col-6 mt-5">
                <h2>It's going to be easy</h2>
                {imgsPreview.map((i, index) => <img key={index} src={i} />)}
                {requestTags.length > 0 ? <ul>{requestTags.map((t, index) => <li key={index}>{t} <span onClick={() => removeTag(t, requestTags, setRequestTags)}><MdRemove /></span></li>)}</ul> : ''}
                {availability.length > 0 ? <ul>{availability.map((t, index) => <li key={index}>{t} <span onClick={() => removeTag(t, availability, setAvailability)}><MdRemove /></span></li>)}</ul> : ''}

            </div>
            {/* Medical request files */}
            {/* Medical request tags */}
            {/* Medical request location */}
            {/* Medical request date */}
            {/* Medical request patient data */}
            {/* Medical request patient */}
            {/* Medical request patient */}


        </Row>
    )
}

export default Booking
