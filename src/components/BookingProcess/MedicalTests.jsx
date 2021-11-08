import React from 'react'
import { previewUrls } from '../../lib'
import TextField from '@material-ui/core/TextField';
import { IoCloudUploadOutline } from 'react-icons/io5'
import { MdAdd } from 'react-icons/md'
import ConfirmStepsBtn from './ConfirmStepsBtn';
import { useEffect, useState } from 'react'
import regRequests from '../../lib/requests-handlers';
import { debounce } from 'lodash'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { withRouter } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';


const filter = createFilterOptions();

function MedicalTests({
    setTestsImgs,
    setImgsPreview,
    setRequestTags,
    requestTags,
    setBookingSteps,
    testsImgs,
    handleNext,
    handleReset,
    history
}) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [suggestions, setSuggestions] = useState([])
    const [value, setValue] = useState(null);


    useEffect(() => {

        if ((requestTags.length > 0) || (testsImgs != null && testsImgs.length > 0)) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }

    }, [requestTags, testsImgs])

    const filesHandler = (e) => {
        const files = e.target.files
        const toFilesArray = Array.from(files)
        const requestPreview = previewUrls(toFilesArray)
        setTestsImgs(toFilesArray)
        setImgsPreview(requestPreview)

    }

    const tagsHandler = (e) => {
        e.preventDefault()
        const tag = e.target[0].value.toLowerCase()

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

    const confirmTests = () => {
        handleNext()
        setBookingSteps({
            medicalTests: false,
            facility: true,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
    }

    const getSuggestions = debounce(async (inputValue) => {
        try {
            const res = await regRequests.medicalTestsSuggestions(inputValue)
            if (res.status === 200 && res.data.tests.length !== 0)
                setSuggestions([...res.data.tests])
        } catch (error) {
        }

    }, 700)

    const returnToProfile = () => {
        handleReset()
        setBookingSteps({
            medicalTests: true,
            facility: false,
            generalAvailability: false,
            pickDate: false,
            checkPersonalDetails: false,
            successScreen: false
        })
        history.push('/dashboard')
    }

    return (
        <>
            <h4 className="text-center mt-3 mb-5">
                Medical tests
            </h4>
            <div className="wrapper-request-imgs">

                <label htmlFor="img_requests">
                    <IoCloudUploadOutline />
                    Upload files
                </label>
                <input
                    id="img_requests"
                    className="d-none"
                    type="file"
                    multiple
                    onChangeCapture={(e) => filesHandler(e)}
                />
            </div>
            <hr className="w-50 my-5" />
            <div className="wrapper-request-tags w-75">
                <form className="flex-center-center flex-column" onSubmit={(e) => tagsHandler(e)}>
                    <label htmlFor="request-tags" className="mb-0">
                        Or add manually the medical tests
                    </label>
                    <div className="d-flex justify-content-between w-100 mt-3">
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                console.log(newValue, 'inside autocomplete')
                                if (typeof newValue === 'string') {
                                    setValue(newValue)
                                } else if (newValue && newValue.inputValue) {
                                    // Create a new value from the user input
                                    setValue(newValue.inputValue)
                                } else {
                                    setValue(newValue);
                                }
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option);
                                if (inputValue !== '' && !isExisting) {
                                    filtered.push(inputValue);
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            handleHomeEndKeys
                            id="medical-tags"
                            options={suggestions}
                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option) {
                                    return option;
                                }
                                // Regular option
                                return option;
                            }}
                            renderOption={(props, option) => <li {...props}>{option}</li>}
                            sx={{ width: 300 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params}
                                    onChange={(e) => getSuggestions(e.target.value)}
                                    onBlur={() => setTimeout(() => setSuggestions([]), 2000)}
                                    label="Add medical tests"
                                />
                            )}
                        />
                        <IconButton type="submit" style={{ transform: 'translateY(7px)' }}>
                            <MdAdd />
                        </IconButton>
                    </div>
                </form>
            </div>
            <ConfirmStepsBtn
                stepsController={confirmTests}
                btnText='Confirm'
                stepsReturn={returnToProfile}
                btnDisabled={isDisabled}
            />
        </>
    )
}


export default withRouter(MedicalTests)
