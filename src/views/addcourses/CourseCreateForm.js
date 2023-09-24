import React from 'react';
import { useHistory } from 'react-router';
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
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';
import axios from 'src/utils/axios';
import {API_BASE_URL} from "../../config"


const useStyles = makeStyles(() => ({
  root: {
    marginTop:"5%"
  },
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

function ProductCreateForm({ className, lecturer, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        overview: '',
        curriculum:'',
        file: [],
        name: ''
      }}
      validationSchema={Yup.object().shape({
        overview: Yup.string().required("overwiew must be required!"),
        curriculum: Yup.string().required("curriculum must be required!"),
        name: Yup.string().max(255).required()
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          
          var formData = new FormData();
        for (const key of Object.keys(values.file)) {
            formData.append('file', values.file[key])
         }

        axios.post(API_BASE_URL + 'addcourse/savecourse', formData, {
          headers: {
             'name':values.name,
             'curriculum':values.curriculum,
             'overview':values.overview,
             'lecturer':lecturer
          }
        }).then(res => {

          if(!res.data.success)
          enqueueSnackbar(res.data.message, {
            variant: 'error'
          });

          else{
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(res.data.message, {
            variant: 'success'
          });
          history.push('/app/editCourses');
        }
        })
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
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
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={12}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Course Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Curriculum
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.curriculum}
                      onChange={(value) => setFieldValue('curriculum', value)}
                    />
                  </Paper>
                  {(touched.curriculum && errors.curriculum) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.curriculum}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                    <Grid item lg={8} md={8} sm={12}>
                    <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Overview
                    </Typography>
                  </Box>
                    <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.overview}
                      onChange={(value) => setFieldValue('overview', value)}
                    />
                  </Paper>
                  {(touched.overview && errors.overview) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.overview}
                      </FormHelperText>
                    </Box>
                  )}
                   </Grid>
                    <Grid item lg={4} md={4} sm={12}>
                    <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Upload files
                    </Typography>
                  </Box>
                    <FilesDropzone name="file" onchange={(files)=>{setFieldValue('file', files)}} />
                    </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Add course
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

ProductCreateForm.propTypes = {
  className: PropTypes.string
};

export default ProductCreateForm;
