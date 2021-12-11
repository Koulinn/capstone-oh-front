import React from "react";
import { removeTag } from "../../../lib";
import { MdRemove } from "react-icons/md";
import Chip from "@mui/material/Chip";

function AvailabilityPreview({ availability, setAvailability }) {
    return (
        <div className="chosen-date-wrapper">
            <ul className="d-flex justify-content-start flex-wrap row">
                {availability.map((t, index) => (
                    <Chip
                        key={index}
                        className="m-1"
                        label={t}
                        variant="outlined"
                        onDelete={() =>
                            removeTag(t, availability, setAvailability)
                        }
                    />
                ))}
            </ul>
        </div>
    );
}

export default AvailabilityPreview;
