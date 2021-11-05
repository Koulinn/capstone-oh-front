import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';


export default function VerticalLinearStepper({activeStep, steps}) {
  return (
    <Box sx={{ maxWidth: 328, margin: 'auto', marginTop: '3rem' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <small>Last step</small>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <p>{step.description}</p>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}