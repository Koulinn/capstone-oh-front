import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router";


function Success({message, Img, url, btnText, history}) {
    const pushHistory = ()=> {
        history.push(url, true)
    }
    return (

        <>
            <h2 className="mt-5 mb-3">Success</h2>
            <h5 className="mb-5">{message}</h5>
            <img src={Img} alt="" width="256px" />
            <Button className="my-5" onClick={pushHistory}>{btnText}</Button>
            
        </>
    )
}

export default withRouter(Success)
