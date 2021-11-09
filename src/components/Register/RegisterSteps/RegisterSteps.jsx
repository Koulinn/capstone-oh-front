import React from "react";
import PersonalData from "../../PersonalData/PersonalData";
import AccessData from "../../AccessData/AccessData";
import { useState, useEffect } from "react";
import Success from "../../Success/Success";
import StepperVert from "../../StepperVert/StepperVert";
import stepsRegister from "./stepperDescription.js";
import { CSSTransition } from "react-transition-group";

const successImg =
  "https://res.cloudinary.com/koulin/image/upload/v1635614779/OneHealth/successOH_wxysls.svg";
const aniTimer = {
  appear: 0,
  enter: 1300,
  exit: 1300,
};

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
      <div className="row w-100" style={{ padding: 0, margin: 0 }}>
        <div
          className={
            "col-12 col-md-6 flex-column flex-center-center align-items-center max-height"
          }
        >
          <div className={"w-100"} style={{ maxWidth: "328px" }}>
            <CSSTransition
              in={!steps.success && steps.personalData}
              timeout={{ aniTimer }}
              classNames="fade-Top-Bottom"
              mountOnEnter={true}
              unmountOnExit={true}
              appear={true}
            >
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
            </CSSTransition>
            <CSSTransition
              in={!steps.success && steps.accessData}
              timeout={aniTimer}
              classNames="fade-Top-Bottom"
              mountOnEnter={true}
              unmountOnExit={true}
              appear={true}
            >
              <AccessData
                steps={steps}
                setSteps={setSteps}
                userData={userData}
                setUserData={setUserData}
                setActiveStep={setActiveStep}
                handleBack={handleBack}
              />
            </CSSTransition>
          </div>
        </div>
        <CSSTransition
          in={!steps.success}
          timeout={aniTimer}
          classNames="fade-Top-Bottom"
          mountOnEnter={true}
          unmountOnExit={true}
          appear={true}
        >
          <div className={"d-none d-md-block col-md-6"}>
            <div>
              <h2 className="text-center mt-5 mb-3">
                Thank you for trusting on us
              </h2>
              <StepperVert activeStep={activeStep} steps={stepsRegister} />
            </div>
          </div>
        </CSSTransition>
      </div>


      <CSSTransition
          in={steps.success}
          timeout={aniTimer}
          classNames="fade-Top-Bottom"
          mountOnEnter={true}
          unmountOnExit={true}
          appear={true}
        >
            <div className="col-12 flex-center-center flex-column">
          <Success
            message="Account created successfully!"
            Img={successImg}
            url="/booking"
            btnText="Book medical test"
          />
        </div>
        </CSSTransition>
    </>
  );
}

export default RegisterSteps;
