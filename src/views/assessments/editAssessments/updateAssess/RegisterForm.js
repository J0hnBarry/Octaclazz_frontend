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
import moment from 'moment';
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
        essay: courses.essayquestion,
        starttime: moment(courses.starttime).format('YYYY-MM-DD HH:mm'),
        dateline: moment(courses.dateline).format('YYYY-MM-DD HH:mm')
        
      }}
      validationSchema={Yup.object().shape({
        dateline: Yup.date().required('Dateline is required'),

      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Make API request
          const {essay,starttime, dateline} =values;

          await axios.post(API_BASE_URL+'assessments/assessments/updateAssess', { id:courses._id, essay, starttime, dateline})
            .then((response) => {
              setStatus({ success: true });
              setSubmitting(false);   
              enqueueSnackbar(response.data.message, {
              variant: 'success',
            }); 
            });
          history.push("/app/assessments/assessments/edit");
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
          label="Course name"
          name="course"
          margin="normal"
          type="String"
          disabled
          value={courses.coursename}
          variant="outlined"
        />
      <TextField
        fullWidth
          label="Assessment name"
          name="assessmentname"
          margin="normal"
          type="String"
          disabled
          value={courses.name}
          variant="outlined"
        />
          <TextField
            error={Boolean(touched.essay && errors.essay)}
            fullWidth
            helperText={touched.essay && errors.essay}
            label="Essay question"
            margin="normal"
            name="essay"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.essay}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.starttime && errors.starttime)}
            fullWidth
            helperText={touched.starttime && errors.starttime}
            label="Start time"
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
            label="End time"
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
  courses:PropTypes.object.isRequired
};

export default RegisterForm;
