import React from 'react'
import { Row } from 'react-bootstrap'
import Welcome from '../../components/Register/Welcome/Welcome'
import { ReactComponent as RegisterIMG } from '../../assets/Doctor prescribing drug to happy family.svg';
import { useState, useEffect } from 'react'
import RegisterSteps from '../../components/Register/RegisterSteps/RegisterSteps';
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group';



const aniTimer = {
    appear: 0,
    enter: 1300,
    exit: 1300,
}


function Register({ history }) {
    const [viewController, setViewController] = useState({
        welcome: true,
        steps: false,
    })

    const { welcome, steps } = viewController

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        phone_primary: ''
    })

    const isLogged = useSelector(s => s.user.isLogged)

    useEffect(() => {
        if (isLogged) {
            history.push('/dashboard')
        } else {
        }
    }, [])



    return (

        <Row className="box-shadow my-5 overflow-hidden mx-md-1">
            <CSSTransition
                in={welcome}
                timeout={aniTimer}
                classNames="fade-Top-Bottom"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}

            >
                <Welcome
                    action="Register"
                    title="Welcome to OneHealth!"
                    subLabel="Register with e-mail"
                    option="Already have an account? Go to "
                    redirect="Login"
                    url="/login"
                    setViewController={setViewController}
                    viewController={viewController}
                    gBtnText="Continue with Google"
                />

            </CSSTransition>
            <CSSTransition
                in={welcome}
                timeout={aniTimer}
                classNames="fade-Top-Bottom"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}

            >
                <div className={"d-none d-md-flex col-6 flex-column flex-center-center"}>
                    <RegisterIMG />
                </div>

            </CSSTransition>


            <CSSTransition
                in={steps}
                timeout={aniTimer}
                classNames="fade-Top-Bottom"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}

            >
                <RegisterSteps
                    viewController={viewController}
                    setViewController={setViewController}
                    userData={userData}
                    setUserData={setUserData}
                />
            </CSSTransition>

        </Row>


    )
}

export default Register
