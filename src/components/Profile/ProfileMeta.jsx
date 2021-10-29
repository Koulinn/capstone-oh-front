import React from 'react'

function ProfileMeta({ name, surname, email, phone_primary }) {
    return (
        <>
            <h5>{`${name} ${surname}`}</h5>
            <h6 className="my-2">{email}</h6>
            <h6>{phone_primary}</h6>
        </>
    )
}

export default ProfileMeta
