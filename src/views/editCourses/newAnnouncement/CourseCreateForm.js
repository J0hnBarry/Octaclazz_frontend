import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import axios from 'src/utils/axios';
import {API_BASE_URL} from "src/config";
import {Link as RouterLink} from 'react-router-dom';


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
        announcement: course.announcements ,
      }}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Do api call

        axios.post(API_BASE_URL + 'courses/announcement', {
             announcement:values.announcement,
             courseId:course._id
        }).then(res => {

          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(res.data.message, {
            variant: 'success'
          });
          history.push('/app/courses/current/' + course._id);
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
                    label="Course Name"
                    name="name"
                    disabled
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
                      Announcement
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.announcement}
                      onChange={(value) => setFieldValue('announcement', value)}
                    />
                  </Paper>
                </CardContent>
              </Card>
           
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2} >
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
             Save new announcement
            </Button>
            <Button
              style={{marginLeft:"20px"}}
              color="secondary"
              variant="contained"
              component = {RouterLink}
              to = "/app/editCourses"
            >
             Cancel
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
