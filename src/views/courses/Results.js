import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  Pagination
} from '@material-ui/lab';
import CourseCard from './CourseCard';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function applyPagination(courses, page) {
  return courses.slice((page-1) * 6, (page-1)* 6 + 6);
}

function Results({ className, courses, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const pagenum = parseInt( courses.length/ 6 ) + 1;

  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedCourses = applyPagination(courses, page);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >
        {paginatedCourses.map((course) => (
          <Grid
            item
            key={course._id}
            md={ 4 }
            sm={ 6 }
            xs={12}
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
      <Box
        mt={6}
        display="flex"
        justifyContent="center"
      >
        <Pagination 
          component="div"
          count={pagenum}
          onChange={handlePageChange}
          page={page}
        />
      </Box>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.array.isRequired
};

export default Results;
