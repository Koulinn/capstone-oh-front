import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row } from 'react-bootstrap'
import { Avatar, Badge } from '@mui/material';
import request from '../../lib/requests-authenticated.js'
import { setUserData } from '../../redux/actions/index.js';
import ProfileAvatar from '../../components/Profile/ProfileAvatar.jsx';
import ProfileMeta from '../../components/Profile/ProfileMeta.jsx';
import ProfileActions from '../../components/Profile/ProfileActions.jsx';

const { getMe } = request

const BGURL='https://res.cloudinary.com/koulin/image/upload/v1635416824/OneHealth/profileBG_xavs0i.svg'

function Dashboard({ history }) {
    const isLogged = useSelector(s => s.user.isLogged)
    const user = useSelector(s => s.user)
    const dispatch = useDispatch()

    const { avatar, name, surname, email, phone_primary, medical_tests_requested } = user

    const asyncWrapper = async () => {
        try {
            const res = await getMe()
            if (res.status === 200) {
                dispatch(setUserData(res.data.user))
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (isLogged) {
            asyncWrapper()
        } else {
            history.push('/')
        }
    }, [])
    return (
        <Row className="box-shadow my-5 overflow-hidden mx-1">
            <div className="profile-wrapper col-12 col-md-6 d-flex flex-column flex-center-center">
                <div className="avatar-wrapper d-flex flex-center-center position-relative" style={{backgroundImage: `url(${BGURL})`}}>
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
                <div className="profile-actions flex-center-center flex-column mt-5 w-100">
                    <ProfileActions/>

                </div>


            </div>
            <div className="col-12 col-md-6 my-sm-5">
                <h4 className="text-center">Recent results</h4>

            </div>
        </Row>
    )
}

export default Dashboard
