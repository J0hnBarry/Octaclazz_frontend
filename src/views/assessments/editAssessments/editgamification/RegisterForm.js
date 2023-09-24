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
        endtime :moment(courses.dateline).format('YYYY-MM-DD HH:mm'),
        rewardsscore :courses.rewardsscore,
      gamificationflag : courses.gamificationflag.toString(),
      streakflag :courses.streakflag.toString(),
        streakanswer :courses.streakanswer,
        bonusscore :courses.bonusscore,
      answerpenalty :courses.answerpenalty.toString(),
        subtractscore :courses.subtractscore,
      fiftyflag :courses.fiftyflag.toString(),
        fiftynum :courses.fiftynum,
        fiftycost :courses.fiftycost,
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
        rewardsscore:Yup.number().min(0).required('Rewards score per question is required'),    
        streakanswer :Yup.number().min(0).required('Number of streak answer to get bonus score is required'),
        bonusscore:Yup.number().min(0).required('The bonus score of streak answer is required'),
        subtractscore:Yup.number().min(0).required('Subtract score of wrong answer is required'),
        fiftynum:Yup.number().min(0).required('The maximum number of 50-50 is required'),
        fiftycost:Yup.number().min(0).required('The cost per unit 50-50 is required'),
        buyvetonum:Yup.number().min(0).required('The maximum number of veto power to purchase is required'),
        buyvetocost:Yup.number().min(0).required('The cost per unit veto power to purchase is required'),
        streakvetounitnum:Yup.number().min(0).required('The streak answer number that can get 1 veto power is required'),
        streakvetomaxnum:Yup.number().min(0).required('The maximum number veto power that can get from streak answer is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
 
          if(values.goalnum > courses.mcquestions.length)
        {  
          enqueueSnackbar("Goal number of question cannot be greater than 2/3 for the total number of questions", {
            variant: 'error',
          }); }
          else{   
                
          await axios.post(API_BASE_URL+'assessments/assessments/updateGamification', { id:courses._id, values})
            .then((response) => {
              setStatus({ success: true });
              setSubmitting(false);   
              enqueueSnackbar(response.data.message, {
              variant: 'success',
            }); 
            });
          history.push("/app/assessments/assessments/edit");
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
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <TextField error={Boolean(touched.goalnum && errors.goalnum)} fullWidth helperText={touched.goalnum && errors.goalnum}  value={values.goalnum}
            label="Goal number of answers" margin="normal" name="goalnum" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <TextField error={Boolean(touched.starttime && errors.starttime)} fullWidth helperText={touched.starttime && errors.starttime} label="Start time"
            margin="normal" name="starttime" onBlur={handleBlur} onChange={handleChange} type="datetime-local" value={values.starttime} variant="outlined"
          /> 
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
           <TextField
            error={Boolean(touched.endtime && errors.endtime)} fullWidth helperText={touched.endtime && errors.endtime} label="End time" margin="normal"
            name="endtime"  onBlur={handleBlur} onChange={handleChange}  type="datetime-local" value={values.endtime} variant="outlined"
          /> 
           </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
          <TextField fullWidth label="Gamification Permission" name="gamificationflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.gamificationflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.gamificationflag === "true") &&
        <>
         <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField error={Boolean(touched.rewardsscore && errors.rewardsscore)} fullWidth helperText={touched.rewardsscore && errors.rewardsscore}  value={values.rewardsscore}
              label="Rewards score" margin="normal" name="rewardsscore" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>
         
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Answer Penalty" name="answerpenalty"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.answerpenalty} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.answerpenalty === "true") &&
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField error={Boolean(touched.subtractscore && errors.subtractscore)} fullWidth helperText={touched.subtractscore && errors.subtractscore}  value={values.subtractscore}
              label="Subtract score" margin="normal" name="subtractscore" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>
        }
        {(values.answerpenalty !== "true") &&
        <Grid item lg={4} md={4} sm={12} xs={12}>
        </Grid>
        }
          <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Answer streak for bonus score" name="streakflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.streakflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.streakflag === "true") &&
        <>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField error={Boolean(touched.streakanswer && errors.streakanswer)} fullWidth helperText={touched.streakanswer && errors.streakanswer}  value={values.streakanswer}
              label="Number of streak answer to get 1 bonus score" margin="normal" name="streakanswer" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField error={Boolean(touched.bonusscore && errors.bonusscore)} fullWidth helperText={touched.bonusscore && errors.bonusscore}  value={values.bonusscore}
              label="'The bonus score of streak answer" margin="normal" name="bonusscore" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>
        </>
        }
        {(values.streakflag !== "true") &&
          <Grid item lg={8} md={8} sm={12} xs={12}>
          </Grid>
        }
          <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Time fifty-fifty Permission" name="fiftyflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.fiftyflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.fiftyflag === "true") &&
        <>
        <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField error={Boolean(touched.fiftynum && errors.fiftynum)} fullWidth helperText={touched.fiftynum && errors.fiftynum}  value={values.fiftynum}
              label="The maximum number of 50-50 " margin="normal" name="fiftynum" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField error={Boolean(touched.fiftycost && errors.fiftycost)} fullWidth helperText={touched.fiftycost && errors.fiftycost}  value={values.fiftycost}
              label="'The cost per unit 50-50" margin="normal" name="fiftycost" onBlur={handleBlur} onChange={handleChange} type="number" variant="outlined"
            />
        </Grid>
        </>
        }
        {(values.fiftyflag !== "true") &&
        <Grid item lg={8} md={8} sm={12} xs={12}>
        </Grid>
        }
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField fullWidth label="Veto power Permission" name="vetoflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
              value={values.vetoflag} variant="outlined"
            >
                <option value="true"> enable </option>
                <option value="false">  disable </option>
            </TextField>
        </Grid>
        {(values.vetoflag === "true") &&
        <>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField fullWidth label="Permission to purchase veto power by VN" name="buyvetoflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
            value={values.buyvetoflag} variant="outlined"
          >
              <option value="true"> enable </option>
              <option value="false">  disable </option>
          </TextField>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField fullWidth label="Permission to get veto power by streak answer" name="streakvetoflag"  margin="normal" select onChange={handleChange} SelectProps={{ native: true }}
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
          error={Boolean(touched.buyvetonum && errors.buyvetonum)} fullWidth helperText={touched.buyvetonum && errors.buyvetonum} label="The maximum number to purchase veto power by VN" margin="normal"
          name="buyvetonum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.buyvetonum} variant="outlined"
        /> 
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.buyvetocost && errors.buyvetocost)} fullWidth helperText={touched.buyvetocost && errors.buyvetocost} label="The cost to purchase per unit veto power" margin="normal"
          name="buyvetocost"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.buyvetocost} variant="outlined"
        /> 
        </Grid>
        </>
        }
        {((values.vetoflag === "true") && (values.streakvetoflag === "true")) &&
        <>
         <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.streakvetounitnum && errors.streakvetounitnum)} fullWidth helperText={touched.streakvetounitnum && errors.streakvetounitnum} label="Minimum number of streak answers to get unit veto power" margin="normal"
          name="streakvetounitnum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.streakvetounitnum} variant="outlined"
        /> 
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
         <TextField
          error={Boolean(touched.streakvetomaxnum && errors.streakvetomaxnum)} fullWidth helperText={touched.streakvetomaxnum && errors.streakvetomaxnum} label="Maximum number of veto power to get by streak answers" margin="normal"
          name="streakvetomaxnum"  onBlur={handleBlur} onChange={handleChange}  type="number" value={values.streakvetomaxnum} variant="outlined"
        /> 
        </Grid>
        </>
        }
        </>
       }
          </Grid>
          <Box mt={2} display="flex">
           <Button
              component={RouterLink}
              to="/app/assessments/assessments/edit"
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
