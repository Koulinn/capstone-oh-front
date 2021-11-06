import React from 'react'
import RequestCardWrapper from './RequestCardWrapper'
import RequestStatusType from './RequestStatusType'

function RequestStatus({
    medical_tests_requested
}) {
    return (
        <div className="col-12 col-md-6 my-sm-5 requests-wrapper px-4">
            <RequestStatusType medical_tests_requested={medical_tests_requested.filter(m=> m.is_user_confirmed === true)} title='Confirmed Requests'/>
            <RequestStatusType medical_tests_requested={medical_tests_requested.filter(m=> m.is_user_confirmed === false)} title='Pending Requests'/>
        </div>
    )
}

export default RequestStatus
