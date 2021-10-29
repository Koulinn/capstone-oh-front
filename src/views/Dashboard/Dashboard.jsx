import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'react-bootstrap'
import request from '../../lib/requests-authenticated.js'
import { setUserTokens } from '../../redux/actions/index.js';
import Profile from '../../components/Profile/Profile.jsx'
import RequestStatus from '../../components/Profile/RequestStatus.jsx'

const { getMe } = request


function Dashboard({ history, location }) {
    const isLogged = useSelector(s => s.user.isLogged)
    const user = useSelector(s => s.user)
    const dispatch = useDispatch()
    const [blur, setBlur] = useState(true)

    const { avatar, name, surname, email, phone_primary, medical_tests_requested } = user

    const asyncWrapper = async (token = undefined) => {
        try {
            const res = await getMe(token)
            setBlur(false)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const isAccessToken = new URLSearchParams(location.search).get("accessToken")
        const isRefreshToken = new URLSearchParams(location.search).get("refreshToken")
        console.log(isAccessToken)
        if (isLogged || isAccessToken) {

            asyncWrapper(isAccessToken)
            

            if (isAccessToken) {
                dispatch(setUserTokens({
                    accessToken: isAccessToken,
                    refreshToken: isRefreshToken
                }))
            }
        } else {
            setBlur(true)
            history.push('/')
        }
    }, [])
    return (
        <Row className={"box-shadow my-5 overflow-hidden mx-1" + (blur ? ' blur' : '')}>
            <Profile
                name={name}
                surname={surname}
                email={email}
                phone_primary={phone_primary}
                medical_tests_requested={medical_tests_requested}
                avatar={avatar}

            />

            <RequestStatus
                medical_tests_requested={medical_tests_requested}
            />
        </Row>
    )
}

export default Dashboard
