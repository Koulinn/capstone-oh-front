import React from 'react'
import { useState, useEffect } from 'react'
import requests from '../../lib/requests-authenticated'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../redux/actions'
import { Button, Row } from 'react-bootstrap'
import { appendImgs, previewUrls, removeTag } from '../../lib'
import TextField from '@material-ui/core/TextField';
import GP_LIST from './GPLists'
import moment from 'moment'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MdRemove } from 'react-icons/md'
import Spinner from '../../components/Spinner/Spinner'
import Alerts from '../../components/Alerts/Alerts';
import MedicalTests from '../../components/BookingProcess/MedicalTests'
import Facility from '../../components/BookingProcess/Facility'

const { getMe, sendMedicalRequest } = requests


function Booking({ location, history }) {
    const [testsImgs, setTestsImgs] = useState(null)
    const [imgsPreview, setImgsPreview] = useState([])
    const [requestTags, setRequestTags] = useState([])
    const [facility, setFacility] = useState(null)
    const [availability, setAvailability] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(s => s.user)
    const [value, onChange] = useState(new Date());
    const [showError, setShowError] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)

    const [bookingSteps, setBookingSteps] = useState({
        medicalTests: true,
        facility: false,
        generalAvailability: false,
        pickDate: false,
        checkPersonalDetails: false,
        successScreen: false
    })

    const { isLogged, name, surname, phone_primary, email } = user

    const selectDay = (day) => {
        const parsedDay = moment(day).format('MM/DD/YYYY')
        if (availability.includes(parsedDay) || availability.length > 4) {

        } else {
            setAvailability([...availability, parsedDay])
        }
    };

    const asyncWrapper = async () => {
        const res = await getMe()
        if (res && (res.status === 200)) {
            dispatch(setUserData(res.data.user))
        } else {
            console.log('fail getMe', res)
        }
    }
    useEffect(() => {
        console.log(user)
        if (isLogged) {
            asyncWrapper()

        } else {
            history.push('/login')
        }

    }, [])
    useEffect(() => {

    }, [imgsPreview, facility])

    const filesHandler = (e) => {
        const files = e.target.files
        const toFilesArray = Array.from(files)
        const requestPreview = previewUrls(toFilesArray)
        setTestsImgs(toFilesArray)
        setImgsPreview(requestPreview)

    }

    const tagsHandler = (e) => {
        e.preventDefault()
        let tag = e.target[0].value.toLowerCase()
        // prevent duplicates
        if (requestTags.includes(tag)) {
            // add error prevention
        } else if (tag.length > 3) {
            setRequestTags([...requestTags, tag])
            e.target[0].value = ''
        } else {
            //add error
        }
    }

    const facilityHandler = (facility, useSet) => {
        setFacility(facility)
    }
    const availabilityHandler = (availability) => {
        setAvailability(availability)
    }

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
                    setIsSpinning(false)
                    setShowError(false)
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
                    setIsSpinning(false)
                    setShowError(false)
                } else {
                    setIsSpinning(false)
                    setShowError(true)
                }

            }

        } catch (error) {
            console.log(error)
        }
    }

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
                    <h2 className="text-center mt-5 mb-3">What's your availability?</h2>

                    <div className="flex-center-center justify-content-between w-100">
                        <div className="w-25"></div>
                        <div className="ASAP-btn cursor-pointer mt-3" onClick={() => availabilityHandler(['ASAP'])}>
                            <h4>ASAP</h4>
                        </div>
                        <div className='pickDAte-btn mt-3'>
                            <h4>Pick dates</h4>
                        </div>
                        <div className="w-25"></div>
                    </div>

                    <div className="flex-center-center justify-content-between w-100 mb-5 mt-3">
                        <div className="d-flex flex-center-center flex-column justify-content-between w-100">
                            <h4>Choose days</h4>
                            <div className="d-flex justify-content-between w-100 calendar-metas mt-3 mb-2">
                                <h6>You need to choose at least 3 dates</h6>
                                <small>{`${availability.length}/5`}</small>
                            </div>
                            <Calendar
                                onChange={onChange}
                                value={value}
                                minDate={new Date()}
                                onClickDay={selectDay}
                            />
                        </div>
                    </div>
                </div>

                <div className="patient-wrapper">

                    <div>
                        <div className="d-flex flex-column flex-center-center">
                            <h2 className="mt-5 text-center">Confirm contact details</h2>
                            <div className="d-flex flex-column w-75">
                                <p className="mt-5"><strong>Phone:</strong> {phone_primary}</p>
                                <p className="mt-4"><strong>Email:</strong> {email}</p>
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
                                        <div>
                                            <span>Return</span>
                                        </div>
                                        <Button onClick={() => sendRequest()} className="w-50"><strong>Confirm</strong></Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

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
