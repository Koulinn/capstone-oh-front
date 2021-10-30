import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router";


function Success({message, Img, url, btnText, history, extraMessage, extraMessage2}) {
    const pushHistory = ()=> {
        history.push(url, true)
    }
    return (

        <>
            <h2 className="mt-3 mb-3">Success</h2>
            <h5 className="mb-5">{message}</h5>
            <img src={Img} alt="" width="256px" />
            {extraMessage? <h6 className="mt-3 w-75">{extraMessage}</h6> : ''}
            {extraMessage2? <h6 className="mt-3 w-75">{extraMessage2}</h6> : ''}
            <Button className="mt-5 w-50" onClick={pushHistory}>{btnText}</Button>
            
        </>
    )
}

export default withRouter(Success)
