import React from 'react'
import GP_LIST from '../../views/Booking/GPLists'
import ConfirmStepsBtn from './ConfirmStepsBtn'
import FacilityCard from './FacilityCard'
import { useEffect, useState } from 'react'


function Facility({ setFacility, facility, setBookingSteps, handleNext, handleBack }) {
    const [isDisabled, setIsDisabled] = useState(true)
    const facilityHandler = (facility) => {
        setFacility(facility)
    }

    const confirmFacility = () => {
        handleNext()
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: true,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }
    const returnStep = () => {
        handleBack()
        setBookingSteps({
            medicalTests: true,
            facility: false,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }

    useEffect(() => {

        if ((facility !== null)) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }

    }, [facility])

    return (
        <>
            <h4 className="text-center mt-3 mb-3">Choose a location</h4>
            <ul className="facility-wrapper w-100" style={{maxWidth:'328px'}}>
                {GP_LIST.map((gp, index) =>
                    <li className={'my-3 cursor-pointer'} key={index} onClick={() => facilityHandler(gp)}>
                        <FacilityCard facility={facility} gp={gp} />
                        <hr className="w-50" />
                    </li>
                )}
            </ul>

            <ConfirmStepsBtn
                stepsController={confirmFacility}
                btnText='Confirm place'
                stepsReturn={returnStep}
                btnDisabled={isDisabled}
            />

        </>
    )
}

export default Facility
