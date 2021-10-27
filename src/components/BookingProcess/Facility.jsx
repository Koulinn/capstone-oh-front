import React from 'react'
import GP_LIST from '../../views/Booking/GPLists'


function Facility({setFacility, facility}) {

    const facilityHandler = (facility) => {
        setFacility(facility)
    }

   
    return (
        <>
            <h2 className="text-center mt-5 mb-3">Choose a location</h2>
                    <ul className="facility-wrapper w-75">
                        {GP_LIST.map((gp, index) =>
                            <li className={'my-3 cursor-pointer'} key={index} onClick={() => facilityHandler(gp)}>
                                <div className={"d-flex flex-column p-3 facility " + (facility?.name === gp?.name ? ' bg-selected' : '')}>
                                    <div className="d-flex justify-content-between">
                                        <h5>{gp.name}</h5>
                                        <span>
                                            {gp.dist}
                                            <small>
                                                km
                                            </small>
                                        </span>
                                    </div>
                                    <p className="my-2">{gp.address}</p>
                                    <p>{gp.postCode}</p>
                                    <h6 className="mt-2">{gp.phone}</h6>
                                </div>
                                <hr className="w-50" />
                            </li>
                        )}
                    </ul>
        </>
    )
}

export default Facility
