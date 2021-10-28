import React from 'react'
import { Button } from 'react-bootstrap'
function ProfileActions() {
    return (
        <>
            <Button className="mt-5">Check results</Button>
            <Button variant="outline" className="border my-4">Book new test</Button>
            <Button variant="outline" className="mt-5">Logout</Button>
        </>
    )
}

export default ProfileActions
