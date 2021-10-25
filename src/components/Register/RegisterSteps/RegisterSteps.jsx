import React from 'react'
import PersonalData from '../../PersonalData/PersonalData'
import AccessData from '../../AccessData/AccessData'
import { useState, useEffect } from 'react'
import Success from '../../Success/Success'


const successImg = "https://st3.depositphotos.com/7341970/19354/v/1600/depositphotos_193545590-stock-illustration-man-shaking-hands-doctor-using.jpg"

function RegisterSteps({ userData, setUserData }) {
    const [steps, setSteps] = useState({
        personalData: true,
        accessData: false,
        success: false
    })

    return (
        <>
            {!steps.success ?
                <>
                    <div className={"col-6 flex-column flex-center-center align-items-center"}>

                        <div className="w-50">
                            {steps.personalData ? <PersonalData steps={steps} setSteps={setSteps} userData={userData} setUserData={setUserData} /> : ''}
                            {steps.accessData ? <AccessData steps={steps} setSteps={setSteps} userData={userData} setUserData={setUserData} /> : ''}
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <h2 className="text-center mt-5 mb-3">Thank you for trusting on us</h2>
                        <h5 className="mb-3 text-center">We are going through a smooth 2 step sign up process</h5>

                    </div>
                </>
                : <div className="col-12 flex-center-center flex-column">
                    <Success
                        message='Account created successfully!'
                        Img={successImg}
                        url="/booking"
                        btnText='Book medical test'
                    />
                </div>
            }

        </>
    )
}

export default RegisterSteps
