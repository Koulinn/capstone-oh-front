import React from 'react'
import { Button } from 'react-bootstrap'

function ConfirmStepsBtn({ stepsController, btnText, stepsReturn, btnDisabled }) {
    return (
        <div className={"mt-5 d-flex w-75" + (stepsReturn ? ' justify-content-between' : ' justify-content-center')}>
            {stepsReturn ?
                <div className="d-flex align-items-center cursor-pointer" onClick={stepsReturn}>
                    <span>Return</span>
                </div>
                : ''}
            <Button className="w-50" onClick={stepsController} disabled={btnDisabled}>{btnText}</Button>
        </div>
    )
}

export default ConfirmStepsBtn
