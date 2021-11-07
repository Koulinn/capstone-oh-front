import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';

export default function DotsMobileStepper({activeStep, toggleDrawer}) {
    
   
  
    return (
      <div className="d-flex d-md-none align-items-center position-relative justify-content-center mobileStepper-wrapper">
          <MobileStepper
            variant="dots"
            steps={4}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1, justifyContent: 'center' }}
                />
                <Button size="small" onClick={toggleDrawer}>
                  Preview
                </Button>
              
      </div>
    );
  }
  