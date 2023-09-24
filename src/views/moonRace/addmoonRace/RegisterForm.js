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
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

function RegisterForm({ className,courses, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {user} = useSelector((state) => state.account);

  return (
    <Formik
      initialValues={{
        course:courses[0].name,
        moonquizname: "",
        starttime: '2022-01-01 00:00',
        endtime:'2022-01-01 00:00' ,
        rewardsvn: 0,
        rewardsfreeze: 0
      }}
      validationSchema={Yup.object().shape({
        moonquizname: Yup.string().max(255).required('Moon quiz name name is required'),
        starttime: Yup.date().required('Start time is required'),
        endtime: Yup.date().required('End time is required'),
        rewardsvn: Yup.number().min(0),
        rewardsfreeze: Yup.number().min(0)
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          
          const {course, moonquizname, starttime, endtime, rewardsvn, rewardsfreeze} =values;

          var data ='';

          await axios.post(API_BASE_URL+'assessments/moonquiz/create', { course, moonquizname, starttime, endtime, rewardsvn, rewardsfreeze, lecturer: user._id})
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
            history.push("/app/assessments/moonrace/edit");
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
            error={Boolean(touched.moonquizname && errors.moonquizname)}
            fullWidth
            helperText={touched.moonquizname && errors.moonquizname}
            label="Moon Quiz name"
            margin="normal"
            name="moonquizname"
            onBlur={handleBlur}
            onChange={handleChange}
            type="String"
            value={values.moonquizname}
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
            error={Boolean(touched.endtime && errors.endtime)}
            fullWidth
            helperText={touched.endtime && errors.endtime}
            label="End time"
            margin="normal"
            name="endtime"
            onBlur={handleBlur}
            onChange={handleChange}
            type="datetime-local"
            value={values.endtime}
            variant="outlined"
          /> 
            <TextField
            error={Boolean(touched.rewardsvn && errors.rewardsvn)}
            fullWidth
            helperText={touched.rewardsvn && errors.rewardsvn}
            label="Rewords (VN)"
            margin="normal"
            name="rewardsvn"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={values.rewardsvn}
            variant="outlined"
          /> 
            <TextField
            error={Boolean(touched.rewardsfreeze && errors.rewardsfreeze)}
            fullWidth
            helperText={touched.rewardsfreeze && errors.rewardsfreeze}
            label="Rewords ('streak freeze')"
            margin="normal"
            name="rewardsfreeze"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={values.rewardsfreeze}
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
