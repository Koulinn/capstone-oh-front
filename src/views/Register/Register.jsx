import React from 'react'
import {Row} from 'react-bootstrap'
import Welcome from '../../components/Register/Welcome/Welcome'
import { ReactComponent as RegisterIMG } from '../../assets/Doctor prescribing drug to happy family.svg';
import {useState} from 'react'
import RegisterSteps from '../../components/Register/RegisterSteps/RegisterSteps';






function Register() {
    const [viewController, setViewController] = useState({
        welcome:true,
        steps:false,
    })

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        phone_primary: ''
    })
    
    
    
    return (
        
            <Row className="box-shadow my-5 overflow-hidden mx-md-1">
                {viewController.welcome? <Welcome 
                    title="Welcome to OneHealth!"
                    subLabel="Register with e-mail"
                    option="Already have an account? Go to "
                    redirect="Login"
                    url="/login"
                    img={<RegisterIMG/>}
                    setViewController={setViewController}
                    viewController={viewController}
                /> : ''}
                {viewController.steps ? <RegisterSteps viewController={viewController} userData={userData} setUserData={setUserData}/> : ''}
            </Row>
            
       
    )
}

export default Register
