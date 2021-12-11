import React from "react";
import { Badge } from "@mui/material";
import RequestCard from "./RequestCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";

function RequestCardWrapper({
    id,
    index,
    imgsPreview,
    requestTags,
    location,
    is_user_confirmed,
}) {
    return (
        <div className={index === 0 ? "" : "mt-3"}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className="accordion-title">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="reqId-responsiveness">{id}</h6>
                            <div className="mr-3">
                                <Badge
                                    color={
                                        is_user_confirmed
                                            ? "success"
                                            : "warning"
                                    }
                                    variant="dot"
                                    overlap="circular"
                                />
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <RequestCard
                        imgsPreview={imgsPreview}
                        requestTags={requestTags}
                        location={location}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default RequestCardWrapper;
