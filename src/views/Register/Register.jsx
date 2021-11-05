import React from 'react'
import {Row} from 'react-bootstrap'
import Welcome from '../../components/Register/Welcome/Welcome'
import { ReactComponent as RegisterIMG } from '../../assets/Doctor prescribing drug to happy family.svg';
import {useState, useEffect} from 'react'
import RegisterSteps from '../../components/Register/RegisterSteps/RegisterSteps';
import { useSelector } from 'react-redux'






function Register({history}) {
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

    const isLogged =useSelector(s=>s.user.isLogged)

    useEffect(()=>{
        if(isLogged){
            history.push('/dashboard')
        } else{
        }
    },[])
    

    
    return (
        
            <Row className="box-shadow my-5 overflow-hidden mx-md-1">
                {viewController.welcome? <Welcome
                action="Register" 
                    title="Welcome to OneHealth!"
                    subLabel="Register with e-mail"
                    option="Already have an account? Go to "
                    redirect="Login"
                    url="/login"
                    img={<RegisterIMG/>}
                    setViewController={setViewController}
                    viewController={viewController}
                    gBtnText="Continue with Google"
                /> : ''}
                {viewController.steps ? <RegisterSteps viewController={viewController} setViewController={setViewController} userData={userData} setUserData={setUserData}/> : ''}
            </Row>
            
       
    )
}

export default Register
