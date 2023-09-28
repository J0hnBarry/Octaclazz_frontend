import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReatHtmlParser from "react-html-parser";

const useStyles = makeStyles(() => ({
  root: {}
}));


function RegisterForm({ className,onSubmitSuccess,answer, ...rest }) {
  const classes = useStyles();


  return (
    
    <Formik
      initialValues={{
        question:''     
      }}
      validationSchema={Yup.object().shape({
        question: Yup.number().min(0.1).max(5).required('Score is required'),

      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          onSubmitSuccess(values);
        }
       catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >   
        <Typography
        variant='h4'
        color='textPrimary'>
          Written question answer
        </Typography>
            <Box border="solid 1px black" style={{padding:"10px", fontSize:"20px", marginTop:"20px"}}>
            {ReatHtmlParser( answer.wrianswer)}
            </Box>

          <TextField
            error={Boolean(touched.question && errors.question)}
            fullWidth
            helperText={touched.question && errors.question}
            label="Give score(min:0.1, max:5)"
            margin="normal"
            name="question"
            onBlur={handleBlur}
            onChange={handleChange}
            type="Number"
            value={values.question}
            variant="outlined"
          />       
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Push score
            </Button>
          </Box>
        </form>
      )}
    </Formik>

  );
}

RegisterForm.propTypes = {
  className: PropTypes.string
};


export default RegisterForm;
