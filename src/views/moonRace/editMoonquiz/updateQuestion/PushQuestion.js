import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  makeStyles
} from '@material-ui/core';
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {}
}));

const options = [
  {"value":"answer1"},
  {"value":"answer2"},
  {"value":"answer3"},
  {"value":"answer4"}
]

function RegisterForm({ className,onSubmitSuccess, ...rest }) {
  const classes = useStyles();


  return (
    <Formik
      initialValues={{
        question:'',
        ans1:'',
        ans2:'',
        ans3:'',
        ans4:'',
        answer:options[0].value
        
      }}
      validationSchema={Yup.object().shape({
        question: Yup.string().max(255).required('Question is required'),
        ans1: Yup.string().max(255).required('Answer1 is required'),
        ans2: Yup.string().max(255).required('Answer2 is required'),
        ans3: Yup.string().max(255).required('Answer3 is required'),
        ans4: Yup.string().max(255).required('Answer4 is required')
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
        >      <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                component = {RouterLink}
                to = "/app/assessments/moonrace/edit"
              >
                Back
              </Button>
          <TextField
            error={Boolean(touched.question && errors.question)}
            fullWidth
            helperText={touched.question && errors.question}
            label="Question(ex.what is 1+1?)"
            margin="normal"
            name="question"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.question}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.ans1 && errors.ans1)}
            fullWidth
            helperText={touched.ans1 && errors.ans1}
            label="Answer1(ex.3)"
            margin="normal"
            name="ans1"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.ans1}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.ans2 && errors.ans2)}
            fullWidth
            helperText={touched.ans2 && errors.ans2}
            label="Answer2(ex.2)"
            margin="normal"
            name="ans2"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.ans2}
            variant="outlined"
          />
         <TextField
            error={Boolean(touched.ans3 && errors.ans3)}
            fullWidth
            helperText={touched.ans3 && errors.ans3}
            label="Answer3(ex.4)"
            margin="normal"
            name="ans3"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.ans3}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.ans4 && errors.ans4)}
            fullWidth
            helperText={touched.ans4 && errors.ans4}
            label="Answer4(ex.1)"
            margin="normal"
            name="ans4"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.ans4}
            variant="outlined"
          />
          <TextField
            fullWidth
              label="Select correct answer"
              name="answer"
              margin="normal"
              select
              onChange={handleChange}
              SelectProps={{ native: true }}
              value={values.answer}
              variant="outlined"
            >
              {options.map((option) => (
                  <option
                    value={option.value}
                    key = {option.value}
                  >
                    {option.value}
                  </option>
              ))}
          </TextField>

          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Add Question
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
