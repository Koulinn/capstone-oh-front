import React from 'react'
import moment from 'moment'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react'
import ConfirmStepsBtn from './ConfirmStepsBtn';

function Availability({ setAvailability, availability, setBookingSteps, bookingSteps }) {
    const [value, onChange] = useState(new Date());
    const [isDisabled, setIsDisabled] = useState(true)

    const ASAPHandler = (asap) => {
        setAvailability(asap)
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: true,
            successScreen: false
        })
    }

    const pickDateHandler = () => {
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: false,
            pickDate: true,
            checkPersonalDetails: false,
            successScreen: false
        })

    }

    const selectDay = (day) => {
        const parsedDay = moment(day).format('MM/DD/YYYY')
        if (availability.includes(parsedDay) || availability.length > 4) {

        } else {
            setAvailability([...availability, parsedDay])
        }
    };

    const confirmDate = () => {
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: true,
            successScreen: false
        })
    }
    const returnStep = () => {
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: true,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }
    const returnFacility = () => {
        setBookingSteps({
            medicalTests: false,
            facility: true,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }

    useEffect(() => {

        if (availability.length > 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }

    }, [availability])


    return (
        <>

            <h4 className="text-center mt-3 mb-3">What's your availability?</h4>
            {bookingSteps.generalAvailability ?
                <div className="flex-center-center justify-content-between flex-column" style={{flexGrow:1}}>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="ASAP-btn cursor-pointer mr-4 mt-3" onClick={() => ASAPHandler(['ASAP'])}>
                            <h4>ASAP</h4>
                        </div>
                        <div className='pickDAte-btn mt-3 ml-4 cursor-pointer text-nowrap' onClick={pickDateHandler}>
                            <h4>Pick dates</h4>
                        </div>
                    </div>

                    <div className="d-flex align-items-center cursor-pointer mb-5" onClick={returnFacility}>
                        <span>Return</span>
                    </div>


                </div>
                : ''}

            {bookingSteps.pickDate ?
                <div className="calendar-wrapper flex-center-center justify-content-between flex-column w-100 mb-5 mt-3">
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
                    <ConfirmStepsBtn
                        stepsController={confirmDate}
                        btnText='Confirm dates'
                        stepsReturn={returnStep}
                        btnDisabled={isDisabled}
                    />
                </div>
                : ''}
        </>
    )
}

export default Availability
