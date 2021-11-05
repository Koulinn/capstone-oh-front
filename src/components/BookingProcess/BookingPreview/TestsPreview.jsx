import React from 'react'
import { removeTag } from '../../../lib'
import { MdRemove } from 'react-icons/md'

function TestsPreview({imgsPreview, removeImg, requestTags, setRequestTags}) {
    return (
        <div className={'w-75 mx-auto'}>
                        <h5 className="text-center pt-2">Medical tests</h5>
                        <div className={"imgsPreview-wrapper justify-content-between row "}>
                            {imgsPreview.map((i, index) => <>
                                <div  key={index} className="position-relative col-md-6 col-lg-4 my-3 p-0">
                                    <img className="" height="96" src={i} />
                                    <div className="position-absolute d-flex flex-center-center" onClick={() => removeImg(index)}>
                                        <MdRemove />
                                    </div>
                                </div>

                            </>)}
                        </div>
                        <div className={"my-3 tag-preview-wrapper"}>
                            {requestTags.length > 0 ?
                                <ul className="d-flex justify-content-start flex-wrap row">
                                    {requestTags.map((tag, index) =>
                                        <li
                                            key={index}
                                            className="p-2"
                                        >
                                            {tag}
                                            <span className="ml-3 mr-1" onClick={() => removeTag(tag, requestTags, setRequestTags)}>
                                                <MdRemove />
                                            </span>
                                        </li>)}
                                </ul>
                                : ''}
                        </div>
                    </div>
    )
}

export default TestsPreview