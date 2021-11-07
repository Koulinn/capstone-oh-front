import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { MdOutlineClose } from 'react-icons/md'

export default function MobileDrawer({
    showDrawer,
    toggleDrawer,
    testsPreview,
    facilityPreview,
    availabilityPreview,

}) {




    return (

        <div>
            <React.Fragment key={'right'}>

                <Drawer
                    anchor={'right'}
                    open={showDrawer}
                    onClose={toggleDrawer}
                >
                    <div className="my-5 mx-3" style={{ maxWidth: '296px' }}>
                        <div className="ml-auto cursor-pointer closeDrawer-btn d-flex flex-center-center" onClick={toggleDrawer}>
                            <MdOutlineClose />
                        </div>
                        <div className="">
                            <h3 className={"text-center" + testsPreview && ' mb-2'}>Medical tests</h3>
                            {testsPreview}
                        </div>
                        <div className="my-4">
                            <h3 className={"text-center" + facilityPreview && ' mb-2'}>Location</h3>
                            {facilityPreview}
                        </div>
                        <div className="">
                            <h3 className={"text-center" + availabilityPreview && ' mb-2'}>Availability</h3>
                            {availabilityPreview}
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>

    );
}