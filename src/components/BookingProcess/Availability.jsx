import React from 'react'
import moment from 'moment'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react'
import ConfirmStepsBtn from './ConfirmStepsBtn';

function Availability({ setAvailability, availability, setBookingSteps, bookingSteps }) {
    const [value, onChange] = useState(new Date());

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
    return (
        <>

            <h2 className="text-center mt-5 mb-3">What's your availability?</h2>
            {bookingSteps.generalAvailability ?
                <div className="flex-center-center justify-content-between w-100">
                    <div className="w-25"></div>
                    <div className="ASAP-btn cursor-pointer mt-3" onClick={() => ASAPHandler(['ASAP'])}>
                        <h4>ASAP</h4>
                    </div>
                    <div className='pickDAte-btn mt-3 cursor-pointer' onClick={pickDateHandler}>
                        <h4>Pick dates</h4>
                    </div>
                    <div className="w-25"></div>
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
                    />
                </div>
                : ''}
        </>
    )
}

export default Availability
