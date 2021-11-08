import React from 'react'
import GoogleButton from 'react-google-button'
import { withRouter } from 'react-router';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../../lib';


function Welcome({
    action,
    title,
    subLabel,
    option,
    redirect,
    history,
    url,
    img,
    viewController,
    setViewController,
    gBtnText,
}) {
    const [show, setShow] = useState(false)


    useEffect(() => {
        setTimeout(() => setShow(true), 1)
    }, [])

    const changeUrl = () => {
        setShow(false)
        setTimeout(() => { history.push(url) }, 1000)
    }

    const nextStep = () => {
        setViewController({
            ...viewController,
            steps: true,
        })
        setTimeout(() => {
            setViewController({
                ...viewController,
                steps: true,
                welcome: false
            })
        }, 700)


    }
    const googleRedirect = () => {
        window.location.replace(`${BASE_URL}/user/googleLogin`)
    }
    return (
        <>
            <div className={
                "col-12 col-md-6 flex-column flex-center-center hide "
                + (show && !viewController.steps ? ' show' : '')
                + (viewController.steps ? ' d-none' : '')
            } style={{ flexOrder: 1 }}
            >
                <h2 className="text-center mt-5 mb-3">{title}</h2>
                <h5 className="mb-3 text-center">{action}</h5>

                <div className="my-5">
                    <GoogleButton label={gBtnText} onClick={googleRedirect} />
                </div>
                <div className="flex-center-center">
                    <hr className="separator-bar" />
                    <h6 className="text-center mx-3">or</h6>
                    <hr className="separator-bar" />
                </div>
                <h5 className="text-center my-5 cursor-pointer position-relative outline-effect p-2" onClick={() => nextStep()}>{subLabel}</h5>
                <h6 className="text-center mb-5">{option}<strong className="cursor-pointer" onClick={changeUrl}>{redirect}</strong></h6>

            </div>
            <div className={
                "d-none d-md-flex col-6 flex-column flex-center-center hide "
                + (show && !viewController.steps ? 'show' : '') +
                (viewController.steps ? ' d-none' : '')
            }
            >
                {img}
            </div>
        </>
    )
}

export default withRouter(Welcome)
