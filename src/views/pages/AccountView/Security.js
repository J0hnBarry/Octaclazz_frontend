import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Security({ className, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {user} = useSelector((state) => state.account);

  return (
    <Formik
      initialValues={{
        currentpassword:'',
        password: '',
        passwordConfirm: ''
      }}
      validationSchema={Yup.object().shape({
        currentpassword: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .max(255)
        .required('Required'),
        password: Yup.string()
          .min(5, 'Must be at least 5 characters')
          .max(255)
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const {currentpassword, password} =values;

          await axios.post(API_BASE_URL+'account/profile/password', { id:user._id, currentpassword, password})
            .then((response) => {
              setStatus({ success: true });
              setSubmitting(false); 

              if(!response.data.success)
             {    
               enqueueSnackbar(response.data.message, {
                variant: 'error',
                }); 
             }
             else {
              enqueueSnackbar(response.data.message, {
                variant: 'success',
                }); 
                resetForm();
             }          
            })
        } catch (error) {
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
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                 <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.currentpassword && errors.currentpassword)}
                    fullWidth
                    helperText={touched.currentpassword && errors.currentpassword}
                    label="currentPassword"
                    name="currentpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.currentpassword}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                    fullWidth
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                    label="Password Confirmation"
                    name="passwordConfirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Change Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
