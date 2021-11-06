import React from 'react'
import RequestCardWrapper from './RequestCardWrapper'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MdExpandMore } from 'react-icons/md'
import AccordionDetails from '@mui/material/AccordionDetails';
import { green } from '@material-ui/core/colors';

function RequestStatusType({ medical_tests_requested, title }) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className="d-flex justify-content-between align-items-center w-100 mr-2">
                    <h4 className="text-center">{title}</h4>
                    <div
                        className="d-flex flex-center-center"
                        style={{
                            borderRadius: '2000px',
                            backgroundColor: (title === 'Confirmed Requests' ? '#1976d2' : '#ED6C02'),
                            width: '24px', height: '24px'
                        }}>
                        <small className="text-center p-1 text-white">
                            {medical_tests_requested.length}
                        </small>
                    </div>
                </div>
            </AccordionSummary>
            <div className="pending-requests-wrapper">
                <AccordionDetails>
                    <div className="pending-requests-cards-wrapper">

                        {medical_tests_requested?.map((req, index) => {
                            const tags = req.user_tests_requested.userTestsTags
                            const imgs = req.user_tests_requested.userFilesURL
                            const location = req.facility.name
                            const is_user_confirmed = req.is_user_confirmed
                            return (
                                <RequestCardWrapper
                                    key={req._id}
                                    id={req._id}
                                    imgsPreview={imgs}
                                    requestTags={tags}
                                    location={location}
                                    index={index}
                                    is_user_confirmed={is_user_confirmed}

                                />
                            )
                        })}
                    </div>
                </AccordionDetails>
            </div>
        </Accordion>
    )
}

export default RequestStatusType
