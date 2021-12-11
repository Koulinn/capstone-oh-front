import React from "react";
import MobileDrawer from "./MobileDrawer";
import MobileStepper from "./MobileStepper";
import TestsPreview from "../BookingPreview/TestsPreview";
import FacilityLocationPreview from "../BookingPreview/FacilityLocationPreview";
import AvailabilityPreview from "../BookingPreview/AvailabilityPreview";

function MobilePreview({
    handleNext,
    handleBack,
    activeStep,
    toggleDrawer,
    showDrawer,
    imgsPreview,
    requestTags,
    setRequestTags,
    facility,
    availability,
    setAvailability,
    removeImg,
}) {
    return (
        <>
            <MobileStepper
                handleNext={handleNext}
                handleBack={handleBack}
                activeStep={activeStep}
                toggleDrawer={toggleDrawer}
            />
            <MobileDrawer
                showDrawer={showDrawer}
                toggleDrawer={toggleDrawer}
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
                    facility ? (
                        <FacilityLocationPreview facility={facility} />
                    ) : null
                }
                availabilityPreview={
                    <AvailabilityPreview
                        availability={availability}
                        setAvailability={setAvailability}
                    />
                }
            />
        </>
    );
}

export default MobilePreview;
