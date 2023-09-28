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
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import { useDispatch } from 'react-redux';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';


const useStyles = makeStyles(() => ({
  root: {}
}));

function CustomerEditForm({
  className,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.account);

  return (
    <Formik
      initialValues={{
        location: user.location ||'',
        username: user.username ||''
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('Name is required'),
        location: Yup.string().max(255).required('Location is required'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const {location, username} =values;

          await axios.post(API_BASE_URL+'account/profile/updatename', { id:user._id, location, username})
            .then((response) => {
                  setStatus({ success: true });
                  setSubmitting(false);  
                  enqueueSnackbar(response.data.message, {
                  variant: 'success',
                }); 
              
            })
            const newuser = await authService.loginInWithToken();
            await dispatch(setUserData(newuser)); 
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
              </Grid>
              <Box mt={2}>
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
  className: PropTypes.string
};

export default CustomerEditForm;
