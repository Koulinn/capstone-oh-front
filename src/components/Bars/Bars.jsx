import React from "react";
import { useEffect, useState } from "react";

function Bar({ time, pos }) {
    const [barGrow, setBarGrow] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setBarGrow(" grow");
        }, time);
    }, []);
    return (
        <div
            className={"bars d-flex flex-column justify-content-center " + pos}
        >
            <div className={"bar" + barGrow}></div>
            <div className={"bar my-4" + barGrow}></div>
            <div className={"bar" + barGrow}></div>
        </div>
    );
}

export default Bar;
