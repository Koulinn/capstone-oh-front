import React from "react";

function FacilityCard({ facility, gp, noHoover }) {
    return (
        <div
            className={
                "d-flex flex-column facility " +
                (facility?.name === gp?.name ? " bg-selected" : "") +
                (noHoover ? " bg-transparent " : " p-3")
            }
        >
            <div className="d-flex justify-content-between">
                <h5>{gp.name}</h5>
                <span>
                    {gp.dist}
                    <small>km</small>
                </span>
            </div>
            <p className="my-2">{gp.address}</p>
            <p>{gp.postCode}</p>
            <h6 className="mt-2">{gp.phone}</h6>
        </div>
    );
}

export default FacilityCard;
