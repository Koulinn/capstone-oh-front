import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Badge } from '@mui/material';

function RequestCard({imgsPreview, requestTags}) {
    return (
        <Card>
            <CardContent>
                <div className="d-flex flex-column">
                   <div className="d-flex justify-content-between align-items-center">
                        <h6>
                            Date received: <strong>15/05/2021</strong>
                        </h6>
                        <div className="d-flex align-items-center">
                            <span className="mr-3">Processing</span>
                            <Badge
                                
                                color='warning'
                                variant='dot'
                                overlap="circular"
                            />
                        </div>
                   </div>
                    <div className="my-2">
                        <p>Location: <strong>Mario</strong></p>
                    </div>
                    <div>
                        <p>Medical tests</p>
                        <div className={"my-3 tag-preview-wrapper"}>
                            {requestTags.length > 0 ?
                                <ul className="d-flex justify-content-start flex-wrap row">
                                    {requestTags.map((tag, index) =>
                                        <li
                                            key={index}
                                            className="p-2"
                                        >
                                            {tag}
                                        </li>)}
                                </ul>
                                : ''}
                        </div>
                        <div className={"imgsPreview-wrapper justify-content-between row "}>
                            {imgsPreview.map((i, index) => <>
                                <div className="position-relative col-md-6 col-lg-4 my-3 p-0">
                                    <img className="" height="96" key={index} src={i} /> 
                                </div>
                            </>)}
                        </div>
                    </div>
                </div>

            </CardContent>

        </Card>
    )
}

export default RequestCard
