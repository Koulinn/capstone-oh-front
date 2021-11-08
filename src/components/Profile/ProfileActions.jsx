import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { setUserLogOut } from '../../redux/actions/index.js'
import { useDispatch } from 'react-redux'

function ProfileActions({ history }) {
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.clear()
        dispatch(setUserLogOut())
        history.push('/')

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
