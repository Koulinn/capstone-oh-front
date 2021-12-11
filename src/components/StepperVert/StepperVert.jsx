import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

export default function VerticalLinearStepper({
    activeStep,
    steps,
    orientation,
    testsPreview,
    facilityPreview,
    availabilityPreview,
    customStep,
    isAlternativeLabel,
}) {
    const showPreview = (index, step) => {
        switch (index) {
            case 0:
                return testsPreview;
            case 1:
                return facilityPreview;
            case 2:
                return availabilityPreview;
            default:
                return <p>{step.description}</p>;
        }
    };

    return (
        <Box sx={{ maxWidth: 328, margin: "auto", marginTop: "3rem" }}>
            <Stepper
                activeStep={activeStep}
                orientation={orientation || "vertical"}
                alternativeLabel={isAlternativeLabel}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <small>Last step</small>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {showPreview(index, step) || (
                                <p>{step.description}</p>
                            )}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
