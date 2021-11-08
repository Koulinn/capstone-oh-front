import React from "react";
import PersonalData from "../../PersonalData/PersonalData";
import AccessData from "../../AccessData/AccessData";
import { useState, useEffect } from "react";
import Success from "../../Success/Success";
import StepperVert from "../../StepperVert/StepperVert";
import stepsRegister from './stepperDescription.js'

const successImg =
    "https://res.cloudinary.com/koulin/image/upload/v1635614779/OneHealth/successOH_wxysls.svg";

function RegisterSteps({
    userData,
    setUserData,
    viewController,
    setViewController,
}) {
    const [steps, setSteps] = useState({
        personalData: true,
        accessData: false,
        success: false,
    });
    const [activeStep, setActiveStep] = useState(0);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            {!steps.success ? (
                <>
                    <div
                        className={
                            "col-12 col-lg-6 flex-column flex-center-center align-items-center max-height hide" +
                            (viewController.welcome ? "" : " show")
                        }
                    >
                        <h2 className={"mt-5  "}> Register</h2>
                        <div className={"w-100"} style={{ maxWidth: '328px' }}>
                            {steps.personalData ? (
                                <PersonalData
                                    steps={steps}
                                    setViewController={setViewController}
                                    setSteps={setSteps}
                                    userData={userData}
                                    setUserData={setUserData}
                                    handleNext={handleNext}
                                    handleBack={handleBack}
                                    handleReset={handleReset}
                                />
                            ) : (
                                ""
                            )}
                            {steps.accessData ? (
                                <AccessData
                                    steps={steps}
                                    setSteps={setSteps}
                                    userData={userData}
                                    setUserData={setUserData}
                                    setActiveStep={setActiveStep}
                                    handleBack={handleBack}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={"d-none d-lg-block col-lg-6"}>
                        <div className={"hide " + (viewController.welcome ? "" : " show")}>
                            <h2 className="text-center mt-5 mb-3">
                                Thank you for trusting on us
                            </h2>
                            <StepperVert activeStep={activeStep} steps={stepsRegister} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="col-12 flex-center-center flex-column">
                    <Success
                        message="Account created successfully!"
                        Img={successImg}
                        url="/booking"
                        btnText="Book medical test"
                    />
                </div>
            )}
        </>
    );
}

export default RegisterSteps;
