import React from 'react'
import { Button } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import { BASE_URL } from '../../lib/index.js'
import store from '../../redux/store/index.js'

function ProfileActions({history}) {

    const logout =() =>{
        localStorage.clear()
        window.location.replace('http://localhost:3000/')

    }

    const booking =()=>{
        history.push('/booking')
    }
    return (
        <>
            <Button className="mt-5">Check results</Button>
            <Button variant="outline" className="border my-4" onClick={booking}>Book new test</Button>
            <Button variant="outline" className="mt-5" onClick={logout}>Logout</Button>
        </>
    )
}

export default withRouter(ProfileActions)
