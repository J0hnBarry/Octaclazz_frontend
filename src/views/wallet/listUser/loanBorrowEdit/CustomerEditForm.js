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
import {Link as RouterLink, useHistory} from "react-router-dom";
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
  customer,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {user} = useSelector((state) => state.account);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        togift:0,
        toloan:0,
        giftreq: customer.sendGiftReq,
        loanreq: customer.sendLoanReq
        
      }}
      validationSchema={Yup.object().shape({
        togift: Yup.number().min(0).max(user.wallet/100*30).required("Please input 0 to not gift."),
        toloan: Yup.number().min(0).max(user.wallet/100*40).required("Please input 0 to not loan."),
        giftreq: Yup.number().min(0).required("Please input 0 to not send a gift request."),
        loanreq: Yup.number().min(0).required("Please input 0 to not send a loan request.")
      })}
      onSubmit={async (values, {

        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {

          const {togift, toloan, giftreq, loanreq} = values;
         
          await axios.post(API_BASE_URL+'account/wallet/updateOne', { 
            myId:user._id,
            userId: customer.userid._id,
            togift, toloan, giftreq, loanreq
          })
            .then(async(response) => {
              if(!response.data.success)
              {
                enqueueSnackbar(response.data.message, {
                  variant: 'error',
                }); 
              }
              else{
                enqueueSnackbar(response.data.message, {
                  variant: 'success',
                });      
                const newuser = await authService.loginInWithToken();
                await dispatch(setUserData(newuser)); 
                setStatus({ success: true });
                setSubmitting(false);
                history.push("/app/account/wallet");
              }
            });

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
            <CardHeader title = "Please check financial relationship with this learner." />
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
                    fullWidth
                    label="Learner Name"
                    name="name"
                    value={ customer.userid.username}
                    variant="outlined"
                    disabled={true}
                  />
                
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={customer.userid.location}
                    variant="outlined"
                    disabled={true}
                  />
                
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                <TextField
                    fullWidth
                    label="Total funds(finance) (VN)"
                    name="total"
                    disabled={true}
                    value={ customer.userid.wallet}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="Gift Sent (VN)"
                    name="gift"
                    value={customer.gifts}
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="Gift received (VN)"
                    name="received"
                    value={ customer.receives}
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  
                  <TextField
                    fullWidth
                    label="Loan (VN)"
                    name="loan"
                    disabled={true}
                    value={customer.loans}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="borrowed (VN)"
                    name="borrowed"
                    value={ customer.borrows }
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="received request for gift (VN)"
                    name="getGiftReq"
                    value={ customer.getGiftReq }
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="received request for loan (VN)"
                    name="getLoanReq"
                    value={ customer.getLoanReq }
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="sent request for gift (VN)"
                    name="sendGiftReq"
                    value={ customer.sendGiftReq }
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="sent request for loan (VN)"
                    name="borrowed"
                    value={ customer.sendLoanReq }
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
              </Grid>
            <Divider />
            <Card style={{marginTop:"30px"}}>
              <CardHeader title="please input the amount you wish to gift(or loan) below if you want:(Loan : 5% deduction,  Gift : 6% deduction) " />
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
                    error={Boolean(touched.togift && errors.togift)}
                    helperText={touched.togift && errors.togift}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label="amount to gift (VN)"
                    name="togift"
                    value={values.togift}
                    type='number'
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.toloan && errors.toloan)}
                    helperText={touched.toloan && errors.toloan}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label="amount to loan (VN)"
                    name="toloan"
                    value={values.toloan}
                    type='number'
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              </CardContent>
            </Card>

            <Card style={{marginTop:"30px"}}>
              <CardHeader title="please input the amount you wish to send gift(or loan) request below if you want. " />
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
                    error={Boolean(touched.giftreq && errors.giftreq)}
                    helperText={touched.giftreq && errors.giftreq}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label="amount to send gift request(VN)"
                    name="giftreq"
                    value={values.giftreq}
                    type='number'
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.loanreq && errors.loanreq)}
                    helperText={touched.loanreq && errors.loanreq}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label="amount to send loan request (VN)"
                    name="loanreq"
                    value={values.loanreq}
                    type='number'
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              </CardContent>
            </Card>
            <Box mt={2} display="flex">                
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/app/account/wallet"
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
                  Save
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
  customer: PropTypes.object.isRequired
};

export default CustomerEditForm;
