import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

function RegisterForm({ className,courses, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        course:courses[0].name,
        assessmentname: "",
        starttime: '2022-10-01 00:00',
        dateline: '2022-10-01 00:00',
        
      }}
      validationSchema={Yup.object().shape({
        assessmentname: Yup.string().max(255).required('Assessment name name is required'),
        dateline: Yup.date().required('Dateline is required'),
        starttime: Yup.date().required('Dateline is required'),

      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Make API request
          const {course, assessmentname, starttime, dateline} =values;

          var data ='';

          await axios.post(API_BASE_URL+'assessments/assessments/create', { course, assessmentname, starttime, dateline, lecturer: courses[0].lecturer})
            .then((response) => {
                data = response.data; 
            })
            if(data.success)
            {
              setStatus({ success: true });
              setSubmitting(false);   
              enqueueSnackbar(data.message, {
              variant: 'success',
            }); 
            history.push("/app/assessments/assessments/edit");
             }
            else {
              enqueueSnackbar(data.message, {
                variant: 'error'
              }); 
            }
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
       <TextField
        fullWidth
          label="Select Course name"
          name="course"
          margin="normal"
          select
          onChange={handleChange}
          SelectProps={{ native: true }}
          value={values.course}
          variant="outlined"
        >
          {courses.map((course) => (
              <option
                value={course.name}
                key = {course.name}
              >
                {course.name}
              </option>
          ))}
        </TextField>
          <TextField
            error={Boolean(touched.assessmentname && errors.assessmentname)}
            fullWidth
            helperText={touched.assessmentname && errors.assessmentname}
            label="Assessment name"
            margin="normal"
            name="assessmentname"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.assessmentname}
            variant="outlined"
          />
         <TextField
            error={Boolean(touched.starttime && errors.starttime)}
            fullWidth
            helperText={touched.starttime && errors.starttime}
            label="Starttime"
            margin="normal"
            name="starttime"
            onBlur={handleBlur}
            onChange={handleChange}
            type="datetime-local"
            value={values.starttime}
            variant="outlined"
          /> 

          <TextField
            error={Boolean(touched.dateline && errors.dateline)}
            fullWidth
            helperText={touched.dateline && errors.dateline}
            label="Endtime"
            margin="normal"
            name="dateline"
            onBlur={handleBlur}
            onChange={handleChange}
            type="datetime-local"
            value={values.dateline}
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
              Save
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  courses:PropTypes.array.isRequired
};

export default RegisterForm;
