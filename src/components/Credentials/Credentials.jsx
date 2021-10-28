import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { useFormik } from "formik"
import Spinner from '../Spinner/Spinner'
import Alerts from '../Alerts/Alerts.jsx';
import { useDispatch } from 'react-redux'
import { setUserTokens, setUserLogIn } from '../../redux/actions/index.js';
import regRequests from '../../lib/requests-handlers.js';
import { Button } from 'react-bootstrap';

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
})

const { login } = regRequests

function Credentials({ img, title, history }) {
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
            const dataToSend = { ...values }
            setIsSpinning(true)
            const res = await login(dataToSend)
            console.log(res)
            if (res.status === 200) {
                setShowError(false)
                const tokens = {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.newRefreshToken,
                }
                dispatch(setUserTokens(tokens))
                dispatch(setUserLogIn())
                setIsSpinning(false)
                setTimeout(() => setIsSpinning(false), 999)
                setTimeout(() => history.push('/dashboard'), 1000)



            } else {
                setIsSpinning(false)
                setShowError(true)
                setTimeout(() => setShowError(false), 3000)
               
            }
        }
    })


    return (
        <>
            <div className="col-6 flex-column flex-center-center">
                <h2 className="text-center mt-5 mb-3">{title}</h2>
                <h5 className="mb-3">Login</h5>
                <div className="w-50">
                    <form className="d-flex flex-column flex-center-center" onSubmit={formik.handleSubmit}>
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
                            className="mt-5"
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
                        <div className="mt-3 w-100">
                            {isSpinning ? <Spinner /> : ''}
                            {showError ? <Alerts
                                title='We got an error'
                                message='Sorry, the problem is on server'
                                state="danger" />
                                : ''}
                        </div>
                        <Button variant={"primary"} className="my-5 w-50 align-self-end" disabled={formik.isValid ? false : true} type="submit">
                            Confirm
                        </Button>
                    </form>
                </div>
            </div>
            <div className="col-6 flex-column flex-center-center">
                {img}
            </div>
        </>
    )
}

export default Credentials
