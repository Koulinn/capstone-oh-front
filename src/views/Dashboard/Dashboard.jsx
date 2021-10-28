import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row } from 'react-bootstrap'
import { Avatar, Badge } from '@mui/material';
import request from '../../lib/requests-authenticated.js'
import { setUserData, setUserTokens } from '../../redux/actions/index.js';
import ProfileAvatar from '../../components/Profile/ProfileAvatar.jsx';
import ProfileMeta from '../../components/Profile/ProfileMeta.jsx';
import ProfileActions from '../../components/Profile/ProfileActions.jsx';
import RequestCard from '../../components/Profile/RequestCard.jsx';


const { getMe } = request

const BGURL = 'https://res.cloudinary.com/koulin/image/upload/v1635416824/OneHealth/profileBG_xavs0i.svg'

function Dashboard({ history, location }) {
    const isLogged = useSelector(s => s.user.isLogged)
    const user = useSelector(s => s.user)
    const dispatch = useDispatch()

    const { avatar, name, surname, email, phone_primary, medical_tests_requested } = user

    const asyncWrapper = async (token= undefined) => {
        try {
            const res = await getMe(token)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const isAccessToken = new URLSearchParams(location.search).get("accessToken")
        const isRefreshToken = new URLSearchParams(location.search).get("refreshToken")
        if (isLogged || isAccessToken) {
            asyncWrapper(isAccessToken)

            if(isAccessToken){
                dispatch(setUserTokens({
                    accessToken: isAccessToken,
                    refreshToken: isRefreshToken
                }))
            }
        } else {
            history.push('/')
        }
    }, [])
    return (
        <Row className="box-shadow my-5 overflow-hidden mx-1">
            <div className="profile-wrapper col-12 col-md-6 d-flex flex-column flex-center-center">
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
            <div className="col-12 col-md-6 my-sm-5 requests-wrapper">
                <div className="pending-requests-wrapper">
                    <h4 className="text-center">Pending requests</h4>
                    <div className="pending-requests-cards-wrapper">
                        {medical_tests_requested.map(req => {
                            const tags = req.user_tests_requested.userTestsTags
                            const imgs = req.user_tests_requested.userFilesURL
                            return <RequestCard key={req._id} imgsPreview={imgs} requestTags={tags}  />

                        })}
                    </div>
                </div>


            </div>
        </Row>
    )
}

export default Dashboard
