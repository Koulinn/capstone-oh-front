import React from 'react'
import { useFormik} from "formik"
import { useState, useEffect  } from 'react';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import regRequests from '../../lib/requests-handlers.js';
import Spinner from '../Spinner/Spinner'
import Alerts from '../Alerts/Alerts.jsx';
import { useDispatch } from 'react-redux'
import { setUserTokens } from '../../redux/actions/index.js';






const { registerWithEmail } = regRequests

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(25, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
})


function AccessData({ userData, steps, setSteps }) {
    const [showError, setShowError] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)
    const [show, setShow] = useState(false)
     const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            const dataToSend = {...userData, ...values}
            setIsSpinning(true)
            const res = await registerWithEmail(dataToSend)
            if (res.status === 201) {
                const tokens = {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.newRefreshToken,
                }
                dispatch(setUserTokens(tokens))
                setIsSpinning(false)
                setShowError(false)

                setTimeout(()=>{
                    setSteps({
                    personalData: false,
                    accessData: false,
                    success: true
                })
            },1000)

            } else {
                setIsSpinning(false)
                setShowError(true)
            }
        }
    })

    useEffect(()=> setTimeout(()=>setShow(true), 700),[])

    return (
        <>
            <form className={"d-flex flex-column hide hideInverse " + (show? ' show' : '')} onSubmit={formik.handleSubmit}>
                <TextField
                    className="mt-5"
                    fullWidth
                    id="email"
                    name="email"
                    label="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.errors.email}
                />
                <TextField
                    className="my-4"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.errors.password}
                />
                <div>
                    {isSpinning ? <Spinner /> : ''}
                    {showError ? <Alerts
                        title='We got an error'
                        message='Sorry, the problem is on server'
                        state="danger" />
                        : ''}
                </div>
                <div className="my-5 d-flex justify-content-between align-items-center">
                    <div onClick={() => console.log(formik.touched.password, 'formike>>>>>>>>>Boolean', Boolean(formik.errors.password))
                    }>
                        Previous
                    </div>
                    <Button variant={"primary"} className="w-50 align-self-end" disabled={formik.isValid || !isSpinning ? false : true} type="submit">
                        Create account
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AccessData
