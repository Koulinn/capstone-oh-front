import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import MuiPhoneInput from 'material-ui-phone-number';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.surname) {
    errors.surname = "Required";
  }
  return errors;
};

function PersonalData({
  userData,
  setUserData,
  setSteps,
  setViewController,
  handleNext,
  handleReset
}) {
  const [showAlert, setShowAlert] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
    },
    validate,
    onSubmit: (values) => {   
      setUserData({
        ...userData,
        ...values,
      });
      handleNext()
      setSteps({
        personalData: false,
        accessData: true,
      });

    },
  });

  const returnHome = () => {
    handleReset()
    setViewController({
      welcome: true,
      steps: false,
    });
  };

  const getPhoneNumber =(value)=>{
    const phoneFormatted = value.substring(1, value.length)
    console.log(phoneFormatted)
    
    setUserData({
      ...userData,
      'phone_primary' : phoneFormatted
    })
  }

  return (
    <>
      <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
        <TextField
          className="mt-5"
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          className="my-4"
          fullWidth
          id="surname"
          name="surname"
          label="Surname"
          type="surname"
          value={formik.values.surname}
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
        <MuiPhoneInput
          defaultCountry='it'
          regions={'europe'}
          fullWidth
          id="phone_primary"
          name="phone_primary"
          label="Phone number"
          type="phone_primary"
          onChange={getPhoneNumber}
        />
        <div className="my-5 d-flex justify-content-between align-items-center">
          <div className="cursor-pointer py-3" onClick={returnHome}>
            Return
          </div>
          <Button variant={"primary"} className="w-50" type="submit">
            Next
          </Button>
        </div>
      </form>
    </>
  );
}

export default PersonalData;
