import React from 'react'
import { previewUrls } from '../../lib'
import { Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import {MdUploadFile} from 'react-icons/md'

function MedicalTests({ 
    setTestsImgs,
     setImgsPreview, 
     setRequestTags, 
     requestTags,
     setBookingSteps 
    }) {

    const filesHandler = (e) => {
        const files = e.target.files
        const toFilesArray = Array.from(files)
        const requestPreview = previewUrls(toFilesArray)
        setTestsImgs(toFilesArray)
        setImgsPreview(requestPreview)

    }

    const tagsHandler = (e) => {
        e.preventDefault()
        let tag = e.target[0].value.toLowerCase()
        // prevent duplicates
        if (requestTags.includes(tag)) {
            // add error prevention
        } else if (tag.length > 3) {
            setRequestTags([...requestTags, tag])
            e.target[0].value = ''
        } else {
            //add error
        }
    }

    const confirmTests = ()=>{
        setBookingSteps({
        medicalTests: false,
        facility: true,
        generalAvailability: false,
        pickDate: false,
        checkPersonalDetails: false,
        successScreen: false
        })
    }
    return (
        <>
            <h4 className="text-center mt-3 mb-5">
                Medical tests
            </h4>
            <div className="wrapper-request-imgs">
                <label htmlFor="img_requests">
                    <MdUploadFile/> Upload files
                </label>
                <input
                    id="img_requests"
                    className="d-none"
                    type="file"
                    multiple
                    onChangeCapture={(e) => filesHandler(e)}
                />
            </div>
            <hr className="w-50 my-5"/>
            <div className="wrapper-request-tags w-75">
                <form className="flex-center-center flex-column" onSubmit={tagsHandler}>
                    <label htmlFor="request-tags" className="mb-0">
                        You can also add manually medical tests
                    </label>
                    <div className="d-flex justify-content-between w-100 mt-3">
                        <TextField
                            className=" mr-4"
                            fullWidth
                            id="request-tags"
                            name="request-tags"
                            label="Add a medical test"
                        />
                        <Button className="outline" style={{borderRadius: '8px'}} type="submit">
                            Add
                        </Button>
                    </div>
                </form>
            </div>
            <div className="mt-5 d-flex justify-content-between w-75">
                <div className="d-flex align-items-center"><span>Return</span></div>
                <Button onClick={confirmTests}>Confirm medical tests</Button>
            </div>
        </>
    )
}

export default MedicalTests
