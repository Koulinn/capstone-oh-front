import React from 'react'
import ProfileAvatar from './ProfileAvatar.jsx';
import ProfileMeta from './ProfileMeta.jsx';
import ProfileActions from './ProfileActions.jsx';


const BGURL = 'https://res.cloudinary.com/koulin/image/upload/v1635416824/OneHealth/profileBG_xavs0i.svg'
function Profile({
    medical_tests_requested,
    name,
    surname,
    avatar,
    email,
    phone_primary

}) {
    return (
        <div className="profile-wrapper col-12 col-md-6 d-flex flex-column align-items-center">
            <div className="avatar-wrapper d-flex flex-center-center position-relative" style={{ backgroundImage: `url(${BGURL})` }}>
                <ProfileAvatar
                    medical_tests_requested={medical_tests_requested}
                    name={name}
                    surname={surname}
                    avatar={avatar}
                />
            </div>
            <div className="profile-meta-wrapper mt-4">
                <ProfileMeta
                    name={name}
                    surname={surname}
                    email={email}
                    phone_primary={phone_primary}
                />
            </div>
            <div className="profile-actions flex-center-center flex-column my-5 w-100">
                <ProfileActions />

            </div>


        </div>
    )
}

export default Profile
