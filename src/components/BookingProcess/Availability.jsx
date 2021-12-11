import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import ConfirmStepsBtn from "./ConfirmStepsBtn";
import CalendarPicker from "@mui/lab/CalendarPicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function Availability({
    setAvailability,
    availability,
    setBookingSteps,
    bookingSteps,
    handleNext,
    handleBack,
}) {
    const [value, onChange] = useState(new Date());
    const [isDisabled, setIsDisabled] = useState(true);

    const ASAPHandler = (asap) => {
        setAvailability(asap);
        setTimeout(() => {
            handleNext();
            setBookingSteps({
                medicalTests: false,
                facility: false,
                generalAvailability: false,
                pickDate: false,
                checkPersonalDetails: true,
                successScreen: false,
            });
        }, 600);
    };

    const pickDateHandler = () => {
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: false,
            pickDate: true,
            checkPersonalDetails: false,
            successScreen: false,
        });
    };

    const selectDay = (day) => {
        const parsedDay = moment(day).format("MM/DD/YYYY");
        if (availability.includes(parsedDay) || availability.length > 4) {
        } else {
            setAvailability([...availability, parsedDay]);
        }
    };

    const confirmDate = () => {
        handleNext();
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: true,
            successScreen: false,
        });
    };
    const returnStep = () => {
        setBookingSteps({
            medicalTests: false,
            facility: false,
            generalAvailability: true,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false,
        });
    };
    const returnFacility = () => {
        handleBack();
        setBookingSteps({
            medicalTests: false,
            facility: true,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false,
        });
    };

    useEffect(() => {
        if (availability.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [availability]);

    return (
        <div>
            <h4 className="text-center mt-3 mb-3">What's your availability?</h4>
            {bookingSteps.generalAvailability && (
                <div
                    className="flex-center-center justify-content-between flex-column row"
                    style={{ flexGrow: 1 }}
                >
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <div
                            className="ASAP-btn cursor-pointer mr-4 mt-3 flex-center-center"
                            style={{ width: "160px", fontWeight: "bold" }}
                            onClick={() => ASAPHandler(["ASAP"])}
                        >
                            <span className="m-auto">ASAP</span>
                        </div>
                        <div
                            className="pickDAte-btn mt-3 ml-4 cursor-pointer text-nowrap flex-center-center"
                            style={{ width: "160px", fontWeight: "bold" }}
                            onClick={pickDateHandler}
                        >
                            <span className="m-auto">Calendar</span>
                        </div>
                    </div>

                    <div
                        className="col-12 d-flex align-self-center cursor-pointer mt-5 w-100 flex-center-center"
                        onClick={returnFacility}
                    >
                        <span>Return</span>
                    </div>
                </div>
            )}

            {bookingSteps.pickDate && (
                <div className="calendar-wrapper flex-center-center justify-content-between flex-column w-100 mb-5 mt-3">
                    <div className="d-flex flex-center-center flex-column justify-content-between w-100">
                        <h4>Choose days</h4>
                        <div className="d-flex justify-content-between w-100 calendar-metas mt-3 mb-2">
                            <h6>You need to choose at least 3 dates</h6>
                            <small>{`${availability.length}/5`}</small>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <CalendarPicker
                                date={value}
                                minDate={new Date()}
                                onChange={(d) => {
                                    onChange(d);
                                    selectDay(d);
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <ConfirmStepsBtn
                        stepsController={confirmDate}
                        btnText="Confirm"
                        stepsReturn={returnStep}
                        btnDisabled={isDisabled}
                    />
                </div>
            )}
        </div>
    );
}

export default Availability;
