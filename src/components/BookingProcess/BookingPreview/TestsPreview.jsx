import React from "react";
import { removeTag } from "../../../lib";
import { MdClose } from "react-icons/md";
import Chip from "@mui/material/Chip";

function TestsPreview({ imgsPreview, removeImg, requestTags, setRequestTags }) {
    return (
        <div className={"w-100"}>
            <div className={"imgsPreview-wrapper row "}>
                {imgsPreview.map((i, index) => (
                    <div
                        key={index}
                        className="position-relative col-md-6 col-lg-4 p-0"
                    >
                        <img className="" height="96" src={i} />
                        <div
                            className="position-absolute d-flex flex-center-center"
                            onClick={() => removeImg(index)}
                        >
                            <MdClose />
                        </div>
                    </div>
                ))}
            </div>
            <div className={"tag-preview-wrapper"}>
                {requestTags.length > 0 && (
                    <ul className="d-flex justify-content-start flex-wrap row">
                        {requestTags.map((tag, index) => (
                            <Chip
                                key={index}
                                className="m-1"
                                label={tag}
                                variant="outlined"
                                onDelete={() =>
                                    removeTag(tag, requestTags, setRequestTags)
                                }
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TestsPreview;
