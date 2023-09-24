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
  CardHeader,
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
import {API_BASE_URL} from "src/config";
import Files from './files';


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

function ProductCreateForm({ className, course, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  return (
    <Formik
      initialValues={{
        overview: course.overview ,
        curriculum: course.curriculum,
        file: []
      }}
      validationSchema={Yup.object().shape({
        overview: Yup.string().required("overwiew must be required!"),
        curriculum: Yup.string().required("curriculum must be required!"),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Do api call
          var formData = new FormData();
        for (const key of Object.keys(values.file)) {
            formData.append('file', values.file[key])
         }

        axios.post(API_BASE_URL + 'courses/update', formData, {
          headers: {
             'curriculum':values.curriculum,
             'overview':values.overview,
             'courseId' : course._id
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
                    disabled
                    fullWidth
                    label="Course Name"
                    name="name"
                    value={course.name}
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
                      Upload new files
                    </Typography>
                  </Box>
                    <FilesDropzone name="file" onchange={(files)=>{setFieldValue('file', files)}} />
                    </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader
                  title = "This is uploaded files list for lecture."
                  />                  
                  <CardContent>
                    <Files id={course._id} file={course.files}/>
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
             Save Edited date
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
