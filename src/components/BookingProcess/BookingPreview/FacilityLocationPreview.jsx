import React from 'react'
import FacilityCard from '../FacilityCard'

function FacilityLocationPreview({ facility }) {
    return (
        <div className="chosen-location-wrapper w-100 mr-auto" style={{ maxWidth: '400px' }}>
            <FacilityCard gp={facility} noHoover={true} />

        </div>
    )
}

export default FacilityLocationPreview
