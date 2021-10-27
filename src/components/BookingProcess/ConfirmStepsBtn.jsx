import React from 'react'
import { Button } from 'react-bootstrap'

function ConfirmStepsBtn({ stepsController, btnText, stepsReturn }) {
    return (
        <div className={"mt-5 d-flex w-75" + (stepsReturn ? ' justify-content-between' : ' justify-content-center')}>
            {stepsReturn ?
                <div className="d-flex align-items-center cursor-pointer" onClick={stepsReturn}>
                    <span>Return</span>
                </div>
                : ''}
            <Button onClick={stepsController}>{btnText}</Button>
        </div>
    )
}

export default ConfirmStepsBtn
