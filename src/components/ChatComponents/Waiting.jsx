import React from "react";
import { ReactComponent as WaitingImg } from "../../assets/get-in-touch-animate.svg";

function Waiting() {
    return (
        <div>
            <h6 className="text-center mt-3">Avg. waiting time 10sec</h6>
            <WaitingImg />
        </div>
    );
}

export default Waiting;
