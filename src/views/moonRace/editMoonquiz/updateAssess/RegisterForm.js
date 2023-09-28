import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import moment from 'moment';
import { useHistory, Link as RouterLink } from 'react-router-dom';

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
        goalnum :courses.goalnum,
        starttime :moment(courses.starttime).format('YYYY-MM-DD HH:mm'),
        endtime :moment(courses.endtime).format('YYYY-MM-DD HH:mm'),
        rewardsvn :courses.rewardsvn,
        rewardsfreeze : courses.rewardsfreeze,
      timeflag : courses.timeflag.toString(),
        timenumber :courses.timenumber,
        timecost :courses.timecost,
      streakflag :courses.streakflag.toString(),
        streakanswer :courses.streakanswer,
        streakturbonum :courses.streakturbonum,
        streakcost :courses.streakcost,
      vetoflag :courses.vetoflag.toString(),
      buyvetoflag :courses.buyvetoflag.toString(),
        buyvetonum :courses.buyvetonum,
        buyvetocost :courses.buyvetocost,
      streakvetoflag :courses.streakvetoflag.toString(),
        streakvetounitnum :courses.streakvetounitnum,
        streakvetomaxnum :courses.streakvetomaxnum
      }}
      validationSchema={Yup.object().shape({
        goalnum: Yup.number().min(0).required('Goal number for this moon quiz is required'),
        starttime: Yup.date().required('starttime is required'),
        endtime: Yup.date().required('endtime is required'),
        rewardsvn:Yup.number().min(0).required('Rewards (VN) is required'),
        rewardsfreeze:Yup.number().min(0).required('Rewards ("streak freeze") is required'),
        timenumber:Yup.number().min(0).required('The maximum time (minutes) that the learner can purchase is required.'),
        timecost:Yup.number().min(0).required('The cost of the time (minutes) the learner will purchase is required.'),
        streakanswer :Yup.number().min(0).required('Number of streak answer to get one streak turbo is required'),
        streakturbonum:Yup.number().min(0).required('The maximum number of streak turbo is required'),
        streakcost:Yup.number().min(0).required('Cost per unit streak turbo is required'),
        buyvetonum:Yup.number().min(0).required('The maximum number of veto boost is required'),
        buyvetocost:Yup.number().min(0).required('The cost per unit veto boost is required'),
        streakvetounitnum:Yup.number().min(0).required('The streak number that can get 1 veto boost is required'),
        streakvetomaxnum:Yup.number().min(0).required('The maximum number veto boost is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          if(values.goalnum > courses.questions.length*2/3)
          enqueueSnackbar("Goal number of question cannot be greater than 2/3 for the total number of questions", {
            variant: 'error',
          }); 
          else{         
          await axios.post(API_BASE_URL+'assessments/moonquiz/updateAssess', { id:courses._id, values})
            .then((response) => {
              setStatus({ success: true });
              setSubmitting(false);   
              enqueueSnackbar(response.data.message, {
              variant: 'success',
            }); 
            });
          history.push("/app/assessments/moonrace/edit");
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
      <Grid container spacing={2} justify="space-between">
        <Grid item lg={6} md={6} sm={12} xs={12}>
       <TextField
        fullWidth label="Course name" name="course" margin="normal" type="String" disabled value={courses.coursename} variant="outlined"
        />
        </Grid>
       <Grid item lg={6} md={6} sm={12} xs={12}>
       <TextField
        fullWidth label="Moon quiz name" name="assessmentname" margin="normal" type="String" disabled value={courses.name} variant="outlined"
        />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField error={Boolean(touched.goalnum && errors.goalnum)} fullWidth helperText={touched.goalnum && errors.goalnum}  value={values.goalnum}
            label="Goal number of answers for the race" margin="normal" name="goalnum" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField error={Boolean(touched.starttime && errors.starttime)} fullWidth helperText={touched.starttime && errors.starttime} label="Start time"
            margin="normal" name="starttime" onBlur={handleBlur} onChange={handleChange} type="datetime-local" value={values.starttime} variant="outlined"
          /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
           <TextField
            error={Boolean(touched.endtime && errors.endtime)} fullWidth helperText={touched.endtime && errors.endtime} label="End time" margin="normal"
            name="endtime"  onBlur={handleBlur} onChange={handleChange}  type="datetime-local" value={values.endtime} variant="outlined"
          /> 
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField error={Boolean(touched.rewardsvn && errors.rewardsvn)} fullWidth helperText={touched.rewardsvn && errors.rewardsvn}  value={values.rewardsvn}
              label="Rewards (VN)" margin="normal" name="rewardsvn" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField error={Boolean(touched.rewardsfreeze && errors.rewardsfreeze)} fullWidth helperText={touched.rewardsfreeze && errors.rewardsfreeze}  value={values.rewardsfreeze}
              label="Rewards ('streak freeze')" margin="normal" name="rewardsfreeze" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Time purchase Permission" name="timeflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.timeflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.timeflag === "true") &&
              <>
               <Grid item lg={4} md={4} sm={12} xs={12}>
               <TextField error={Boolean(touched.timenumber && errors.timenumber)} fullWidth helperText={touched.timenumber && errors.timenumber} label="Maximum time to purchase"
                 margin="normal" name="timenumber" onBlur={handleBlur} onChange={handleChange} type="number" value={values.timenumber} variant="outlined"
               /> 
               </Grid>    
               <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                 error={Boolean(touched.timecost && errors.timecost)} fullWidth helperText={touched.timecost && errors.timecost} label="purchase price per minute" margin="normal"
                 name="timecost"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.timecost} variant="outlined"
               /> 
               </Grid>
               </>
          }
          {(values.timeflag !== "true") &&
               <Grid item lg={8} md={8} sm={12} xs={12}>
               </Grid>    
          }
          <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Streak turbo Permission" name="streakflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.streakflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        <Grid item lg={8} md={8} sm={12}  xs={12}/>
        {(values.streakflag === "true") &&
        <>
          <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField error={Boolean(touched.streakanswer && errors.streakanswer)} fullWidth helperText={touched.streakanswer && errors.streakanswer} label="Minimum number to get one streak turbo"
            margin="normal" name="streakanswer" onBlur={handleBlur} onChange={handleChange} type="number" value={values.streakanswer} variant="outlined"
          /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
           <TextField
            error={Boolean(touched.streakturbonum && errors.streakturbonum)} fullWidth helperText={touched.streakturbonum && errors.streakturbonum} label="Maximum streak turbo" margin="normal"
            name="streakturbonum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.streakturbonum} variant="outlined"
          /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
           <TextField
            error={Boolean(touched.streakcost && errors.streakcost)} fullWidth helperText={touched.streakcost && errors.streakcost} label="purchase price per streak turbo" margin="normal"
            name="streakcost"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.streakcost} variant="outlined"
          /> 
          </Grid>
        </>
        }

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Veto boost Permission" name="vetoflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.vetoflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.vetoflag === "true") &&
        <>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField fullWidth label="Permission to purchase veto boost by VN" name="buyvetoflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
            value={values.buyvetoflag} variant="outlined"
          >
              <option value="true"> enable </option>
              <option value="false">  disable </option>
          </TextField>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField fullWidth label="Permission to get veto boost by streak answer" name="streakvetoflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
            value={values.streakvetoflag} variant="outlined"
          >
              <option value="true"> enable </option>
              <option value="false">  disable </option>
          </TextField>
        </Grid>
        </>
        }
        {((values.vetoflag === "true") && (values.buyvetoflag === "true")) &&
        <>
         <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.buyvetonum && errors.buyvetonum)} fullWidth helperText={touched.buyvetonum && errors.buyvetonum} label="The maximum number to purchase veto boost by VN" margin="normal"
          name="buyvetonum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.buyvetonum} variant="outlined"
        /> 
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.buyvetocost && errors.buyvetocost)} fullWidth helperText={touched.buyvetocost && errors.buyvetocost} label="The cost to purchase per unit veto boost" margin="normal"
          name="buyvetocost"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.buyvetocost} variant="outlined"
        /> 
        </Grid>
        </>
        }
        {((values.vetoflag === "true") && (values.streakvetoflag === "true")) &&
        <>
         <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.streakvetounitnum && errors.streakvetounitnum)} fullWidth helperText={touched.streakvetounitnum && errors.streakvetounitnum} label="Minimum number of streak answers to get unit veto boost" margin="normal"
          name="streakvetounitnum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.streakvetounitnum} variant="outlined"
        /> 
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.streakvetomaxnum && errors.streakvetomaxnum)} fullWidth helperText={touched.streakvetomaxnum && errors.streakvetomaxnum} label="Maximum number of veto boost to get by streak answers" margin="normal"
          name="streakvetomaxnum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.streakvetomaxnum} variant="outlined"
        /> 
        </Grid>
        </>
        }

          </Grid>
          <Box mt={2} display="flex">
           <Button
              component={RouterLink}
              to="/app/assessments/moonrace/edit"
              color="secondary"
              size="large"
              variant="contained"
            >
              Back
            </Button>
            <Box flexGrow={1} />
            <Button
              color="secondary"
              disabled={isSubmitting}
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
