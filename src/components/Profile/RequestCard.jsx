import React from "react";
import Chip from "@mui/material/Chip";

function RequestCard({ imgsPreview, requestTags, location }) {
  return (
    <>
      <div className="d-flex flex-column">
        <div className="mb-2">
          <p>
            Location: <strong>{location}</strong>
          </p>
        </div>
        <div>
          <p>Medical tests</p>
          <div className={"my-3 tag-preview-wrapper"}>
            {requestTags.length > 0 && (
              <ul className="d-flex justify-content-start flex-wrap row">
                {requestTags.map((tag, index) => (
                  <Chip
                    key={index + 200}
                    className="m-1"
                    label={tag}
                    variant="outlined"
                  />
                ))}
              </ul>
            )}
          </div>
          <div className={"imgsPreview-wrapper justify-content-between row "}>
            {imgsPreview.map((i, index) => (
              <div
                className="position-relative col-md-6 col-lg-4 my-3 p-0"
                key={index + 300}
              >
                <img className="" height="96" src={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestCard;
