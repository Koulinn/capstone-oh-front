import React from "react";
import { useState, useEffect } from "react";
import requests from "../../lib/requests-authenticated";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/actions";
import { Row } from "react-bootstrap";
import MedicalTests from "../../components/BookingProcess/MedicalTests";
import Facility from "../../components/BookingProcess/Facility";
import Availability from "../../components/BookingProcess/Availability";
import ConfirmDetails from "../../components/BookingProcess/ConfirmDetails";
import Success from "../../components/Success/Success";
import TestsPreview from "../../components/BookingProcess/BookingPreview/TestsPreview";
import FacilityLocationPreview from "../../components/BookingProcess/BookingPreview/FacilityLocationPreview";
import AvailabilityPreview from "../../components/BookingProcess/BookingPreview/AvailabilityPreview";
import StepperVert from "../../components/StepperVert/StepperVert";
import BSteps from "./bookingSteps.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CSSTransition } from "react-transition-group";
import MobilePreview from "../../components/BookingProcess/MobilePreview/MobilePreview";

const { getMe } = requests;
const successImg =
    "https://res.cloudinary.com/koulin/image/upload/v1635614779/OneHealth/successOH_wxysls.svg";

function Booking({ history }) {
    const [testsImgs, setTestsImgs] = useState(null);
    const [imgsPreview, setImgsPreview] = useState([]);
    const [requestTags, setRequestTags] = useState([]);
    const [facility, setFacility] = useState(null);
    const [availability, setAvailability] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((s) => s.user);
    const [blur, setBlur] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const [bookingSteps, setBookingSteps] = useState({
        medicalTests: true,
        facility: false,
        generalAvailability: false,
        pickDate: false,
        checkPersonalDetails: false,
        successScreen: false,
    });
    const isMaxTablet = useMediaQuery("(max-width:767px)");

    const { isLogged } = user;

    const asyncWrapper = async (token = undefined) => {
        const res = await getMe(token);
        if (res && res.status === 200) {
            dispatch(setUserData(res.data.user));
        } else {
            console.log("fail getMe", res);
        }
    };

    useEffect(() => {
        console.log("inside use Effect booking");
        if (isLogged) {
            asyncWrapper();
            setBlur(false);
        } else {
            setBlur(true);
            console.log("inside ELSE use Effect booking");
            history.push("/login");
        }
    }, []);

    useEffect(() => { }, [imgsPreview, facility, imgsPreview, bookingSteps]);

    const removeImg = (imgIndex) => {
        const remainingImgs = imgsPreview.filter(
            (img, index) => index !== imgIndex
        );
        const remainingTestImgs = testsImgs.filter(
            (img, index) => index !== imgIndex
        );
        setTestsImgs(remainingTestImgs);
        setImgsPreview(remainingImgs);
    };

    const handleNext = () => {
        console.log('inside handle next')
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const toggleDrawer = () => {
        console.log('inside toggle drawer')
        setShowDrawer((prevState) => !prevState)
    }

    return (
        <Row
            className={
                "box-shadow my-5 justify-content-center overflow-hidden mx-1" +
                (blur ? " blur" : "")
            }
        >
            <div
                className="col-12 col-md-6 my-5"
                style={{ order: isMaxTablet ? 1 : "" }}
            >
                <div className="medical-requests-wrapper d-flex flex-center-center flex-column">
                    <CSSTransition
                        in={bookingSteps.medicalTests}
                        timeout={100}
                        classNames="fade"
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                    >
                        <>
                            <h1 className="text-center">Booking</h1>
                            <MedicalTests
                                setTestsImgs={setTestsImgs}
                                setImgsPreview={setImgsPreview}
                                setRequestTags={setRequestTags}
                                requestTags={requestTags}
                                testsImgs={testsImgs}
                                setBookingSteps={setBookingSteps}
                                handleNext={handleNext}
                                handleReset={handleReset}
                            />
                        </>
                    </CSSTransition>
                </div>
                <div className="medical-facility-wrapper flex-center-center flex-column">
                    <CSSTransition
                        in={bookingSteps.facility}
                        timeout={100}
                        classNames="fade"
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                    >
                        <Facility
                            setFacility={setFacility}
                            facility={facility}
                            setBookingSteps={setBookingSteps}
                            handleNext={handleNext}
                            handleBack={handleBack}
                        />
                    </CSSTransition>
                </div>
                <div
                    className={
                        bookingSteps.generalAvailability || bookingSteps.pickDate
                            ? "user-availability-wrapper flex-column  h-100"
                            : ""
                    }
                >
                    <CSSTransition
                        in={bookingSteps.generalAvailability || bookingSteps.pickDate}
                        timeout={100}
                        classNames="fade"
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                    >
                        <Availability
                            setAvailability={setAvailability}
                            availability={availability}
                            setBookingSteps={setBookingSteps}
                            bookingSteps={bookingSteps}
                            handleNext={handleNext}
                            handleBack={handleBack}
                        />
                    </CSSTransition>
                </div>

                <div className="confirm-wrapper">
                    <CSSTransition
                        in={bookingSteps.checkPersonalDetails}
                        timeout={100}
                        classNames="fade"
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                    >
                        <ConfirmDetails
                            testsImgs={testsImgs}
                            requestTags={requestTags}
                            facility={facility}
                            availability={availability}
                            setBookingSteps={setBookingSteps}
                            handleNext={handleNext}
                            handleBack={handleBack}
                        />
                    </CSSTransition>
                </div>
                <div className="success-wrapper d-flex flex-column justify-content-center align-items-center">
                    <CSSTransition
                        in={bookingSteps.successScreen}
                        timeout={100}
                        classNames="fade"
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                    >
                        <Success
                            message="We got your request"
                            extraMessage="In 2 working days we will get in touch to confirm your request!"
                            extraMessage2="You will get an e-mail with the confirmation."
                            Img={successImg}
                            url="/dashboard"
                            btnText="Profile"
                        />
                    </CSSTransition>
                </div>
            </div>

            <div
                className={"request-info-wrapper col-12 col-md-6 mt-5 mb-md-5" +
                    (bookingSteps.successScreen ? ' d-none' : '')
                }>

                {!bookingSteps.successScreen &&
                    <StepperVert
                        className="stepper-responsiveness"
                        activeStep={activeStep}
                        orientation={isMaxTablet && "vertical"}
                        isAlternativeLabel={isMaxTablet ? true : false}
                        sx={isMaxTablet ? { margin: 0, maxWidth: "none" } : ""}
                        steps={BSteps}
                        testsPreview={
                            imgsPreview.length !== 0 || requestTags.length !== 0 ? (
                                <TestsPreview
                                    imgsPreview={imgsPreview}
                                    removeImg={removeImg}
                                    requestTags={requestTags}
                                    setRequestTags={setRequestTags}
                                />
                            ) : null
                        }
                        facilityPreview={
                            facility ? <FacilityLocationPreview facility={facility} /> : null
                        }
                        availabilityPreview={
                            <AvailabilityPreview
                                availability={availability}
                                setAvailability={setAvailability}
                            />
                        }
                    />}

                <MobilePreview
                    handleNext={handleNext}
                    handleBack={handleBack}
                    activeStep={activeStep}
                    toggleDrawer={toggleDrawer}
                    showDrawer={showDrawer}
                    imgsPreview={imgsPreview}
                    requestTags={requestTags}
                    setRequestTags={setRequestTags}
                    facility={facility}
                    availability={availability}
                    setAvailability={setAvailability}
                    removeImg={removeImg}
                />
            </div>
        </Row>
    );
}

export default Booking;
