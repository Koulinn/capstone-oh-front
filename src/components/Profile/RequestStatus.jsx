import React from 'react'
import RequestCardWrapper from './RequestCardWrapper'

function RequestStatus({
    medical_tests_requested
}) {
    return (
        <div className="col-12 col-md-6 my-sm-5 requests-wrapper px-4">
            <div className="pending-requests-wrapper">
                <h4 className="text-center">Pending requests</h4>
                <div className="pending-requests-cards-wrapper mt-5">

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
            </div>
        </div>
    )
}

export default RequestStatus
