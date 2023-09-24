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
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import {Link as RouterLink} from 'react-router-dom';
import moment from 'moment';


const useStyles = makeStyles(() => ({
  root: {}
}));

function CustomerEditForm({
  className,
  user,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        location: user.location ||'',
        username: user.username ||'',
        wallet:user.wallet,
        password:'',
        passwordConfirm:''
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('Name is required'),
        location: Yup.string().max(255).required('Location is required'),
        wallet: Yup.number(),    
        password: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .max(255),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')  
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const {location, username, password, wallet} =values;

          await axios.post(API_BASE_URL+'admin/users/update', { id:user._id, location, username, wallet, password})
            .then((response) => {
                  setStatus({ success: true });
                  setSubmitting(false);  
                  enqueueSnackbar(response.data.message, {
                  variant: 'success',
                }); 
              
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
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >

          <Card>
            <CardHeader
            title= "Please change this user's profile." />
             <Divider />
            <CardContent>          
              <Grid
                container
                spacing={3}
              >
               <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="User name"
                    name="username"
                    type='string'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.username}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    disabled
                    value={user.email}
                    variant="outlined"
                  />
                </Grid>
    
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.location && errors.location)}
                    fullWidth
                    helperText={touched.location && errors.location}
                    label="Location"
                    name="location"
                    type='string'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    disabled
                    value={user.role}
                    variant="outlined"
                  />
                </Grid>            

              <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.wallet && errors.wallet)}
                    fullWidth
                    helperText={touched.wallet && errors.wallet}
                    label="Funds(VN)"
                    name="wallet"
                    type='number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.wallet}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="created date"
                    name="createdAt"
                    disabled
                    value={moment(user.createdAt).format("YYYY-MM-DD")}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    type='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
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
              <Box mt={2} display="flex">
              <Button            
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/app/adminpanel/users"
                >
                  Back 
                </Button>
                <Box flexGrow={1} />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update 
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

CustomerEditForm.propTypes = {
  className: PropTypes.string,
  user:PropTypes.object
};

export default CustomerEditForm;
