import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { BASE_URL } from '../../lib/index.js'
import store from '../../redux/store/index.js'
import { setUserLogOut } from '../../redux/actions/index.js'
import { useDispatch } from 'react-redux'

function ProfileActions({ history }) {
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.clear()
        dispatch(setUserLogOut())
        history.push('/')
        // window.location.replace('http://localhost:3000/')

    }

    const booking = () => {
        history.push('/booking')
    }
    return (
        <>
            <Button className="mt-5">Check results</Button>
            <Button variant="outline" className="border my-4" onClick={booking}>Book new test</Button>
            <Button variant="outline" className="mt-auto" onClick={logout}>Logout</Button>
        </>
    )
}

export default withRouter(ProfileActions)
