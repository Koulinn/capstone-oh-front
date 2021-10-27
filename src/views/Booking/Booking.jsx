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

    }, [imgsPreview, facility, imgsPreview])

    const removeImg = (imgIndex) => {
        const remainingImgs = imgsPreview.filter((img, index) => index !== imgIndex)
        const remainingTestImgs = testsImgs.filter((img, index) => index !== imgIndex)
        setTestsImgs(remainingTestImgs)
        setImgsPreview(remainingImgs)
    }

    return (
        <Row className="box-shadow my-5 overflow-hidden mx-1">
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
                        setBookingSteps={setBookingSteps}
                    /> : ''}
                </div>
            </div>











            <div className="request-info-wrapper d-none d-md-block col-6 mt-5">
                <h2 className="text-center mt-2 mb-5">Request info</h2>
                <div className={(!bookingSteps.medicalTests ? ' w-75 mx-auto' : ' d-none')}>
                    <h5 className="text-center mb-3 pt-2">Medical tests</h5>
                    <div className={"imgsPreview-wrapper justify-content-between row "}>
                        {imgsPreview.map((i, index) => <>
                            <div className="position-relative col-md-6 col-lg-4 my-3 p-0">
                                <img className="" height="96" key={index} src={i} />
                                <div className="position-absolute d-flex flex-center-center" onClick={() => removeImg(index)}>
                                    <MdRemove />
                                </div>
                            </div>

                        </>)}
                    </div>
                    <div className={"my-3 tag-preview-wrapper"}>
                        {requestTags.length > 0 ?
                            <ul className="d-flex justify-content-center mx-3 flex-wrap">
                                {requestTags.map((tag, index) =>
                                    <li
                                        key={index}
                                        className="p-2"
                                    >
                                        {tag}
                                        <span className="ml-3 mr-1" onClick={() => removeTag(tag, requestTags, setRequestTags)}>
                                            <MdRemove />
                                        </span>
                                    </li>)}
                            </ul>
                            : ''}
                    </div>
                </div>
                {facility ?
                    <div className="chosen-location-wrapper mt-5 w-75 mx-auto">
                        <h5 className="text-center mb-1">Location</h5>
                        <FacilityCard gp={facility} noHoover={true} />

                    </div>
                    : ''}
                {availability.length > 0 ? <ul>{availability.map((t, index) => <li key={index}>{t} <span onClick={() => removeTag(t, availability, setAvailability)}><MdRemove /></span></li>)}</ul> : ''}

            </div>
        </Row>
    )
}

export default Booking
