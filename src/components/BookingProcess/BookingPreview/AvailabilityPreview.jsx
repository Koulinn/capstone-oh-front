import React from 'react'
import { removeTag } from '../../../lib'
import { MdRemove } from 'react-icons/md'

function AvailabilityPreview({ availability, setAvailability }) {
    return (
        <div className="chosen-date-wrapper">
            <ul className="d-flex justify-content-start flex-wrap row">
                {availability.map((t, index) =>
                    <li key={index} className="p-2">
                        {t}
                        <span className="ml-3 mr-1" onClick={() => removeTag(t, availability, setAvailability)}>
                            <MdRemove /></span>
                    </li>)}
            </ul>
        </div>
    )
}

export default AvailabilityPreview
