import React from 'react'
import FacilityCard from '../FacilityCard'

function FacilityLocationPreview({facility}) {
    return (
        <div className="chosen-location-wrapper mt-5 w-75 mx-auto">
                            <h5 className="text-center mb-1">Location</h5>
                            <FacilityCard gp={facility} noHoover={true} />

                        </div>
    )
}

export default FacilityLocationPreview
