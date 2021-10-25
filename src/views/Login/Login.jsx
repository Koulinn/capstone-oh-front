import React from 'react'
import { Row } from 'react-bootstrap'
import Welcome from '../../components/Register/Welcome/Welcome'
import { ReactComponent as LoginIMG } from '../../assets/loginImg.svg';
import {useState} from 'react'

function Login() {
    const [viewController, setViewController] = useState({
        welcome:true,
        step1:false,
        step2:false,
        success:false,
    })
    return (
        <Row className="box-shadow my-5 overflow-hidden">
            <Welcome
                title="How can we help you today?"
                subLabel="Continue with e-mail"
                option="Doesn't have an account? Go to "
                redirect="Register"
                url="/register"
                img={<LoginIMG/>}
                setViewController={setViewController}
                viewController={viewController}
            />
        </Row>
    )
}

export default Login
