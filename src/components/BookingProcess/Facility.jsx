import React from 'react'
import GP_LIST from '../../views/Booking/GPLists'
import ConfirmStepsBtn from './ConfirmStepsBtn'
import FacilityCard from './FacilityCard'


function Facility({ setFacility, facility, setBookingSteps }) {

    const facilityHandler = (facility) => {
        setFacility(facility)
    }

    const confirmFacility = () => {
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
        setBookingSteps({
            medicalTests: true,
            facility: false,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }

    return (
        <>
            <h2 className="text-center mt-5 mb-3">Choose a location</h2>
            <ul className="facility-wrapper w-75">
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
                />
            
        </>
    )
}

export default Facility
