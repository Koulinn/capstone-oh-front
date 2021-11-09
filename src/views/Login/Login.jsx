import React from 'react'
import { Row } from 'react-bootstrap'
import Welcome from '../../components/Register/Welcome/Welcome'
import { ReactComponent as LoginIMG } from '../../assets/loginImg.svg';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Credentials from '../../components/Credentials/Credentials';
import useMediaQuery from '@mui/material/useMediaQuery';

function Login({ history }) {
    const [viewController, setViewController] = useState({
        welcome: true,
        steps: false,
    })
    const isSmall = useMediaQuery('(max-width:574px)');

    const { welcome, steps } = viewController
    const isLogged = useSelector(s => s.user.isLogged)

    useEffect(() => {
        if (isLogged) {
            history.push('/dashboard')
        } else {

        }
    }, [])
    return (
        <Row className="box-shadow my-5 overflow-hidden mx-1">
            {welcome ? <Welcome
                action="Login"
                title="How can we help you today?"
                subLabel="Continue with e-mail"
                option="Doesn't have an account? Go to "
                redirect="Register"
                url="/register"
                img={<LoginIMG />}
                setViewController={setViewController}
                viewController={viewController}
                gBtnText="Continue with Google"
            />
                : ''}
            {steps ? <Credentials
                title="Welcome back"
                img={<LoginIMG />}
                history={history}
                setViewController={setViewController}
            />
                : ''}
        </Row>
    )
}

export default Login
