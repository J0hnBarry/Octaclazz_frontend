/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Link,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  Delete as DeleteIcon
} from 'react-feather';
import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import { useSnackbar } from 'notistack';

const sortOptions = [
  // {
  //   value: 'learners|desc',
  //   label: 'Learners number (high to low)'
  // },
  // {
  //   value: 'learners|asc',
  //   label: 'Learners number (low to high)'
  // },
  {
    value: 'createdAt|asc',
    label: 'createdAt (new to old)'
  },
  {
    value: 'createdAt|desc',
    label: 'createdAt (old to new)'
  }
];


function applyPagination(assessments, page, limit) {
  return assessments.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(assessment, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = assessment.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({ className, Myassessments, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [assessments, setAssessments] = useState(Myassessments);
  const [sort, setSort] = useState(sortOptions[0].value);
  const { enqueueSnackbar } = useSnackbar();

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

 const DeleteAssessment = (assessmentId) => {
  axios
  .get(API_BASE_URL + 'admin/assessments/delete/' + assessmentId)
  .then((response) => {
    if(response.data.success)
    {
    enqueueSnackbar(response.data.message, {
      variant: 'success'
    });
      setAssessments(response.data.assessments);
    }
    else {
      enqueueSnackbar(response.data.message, {
        variant: 'error'
      });
      setAssessments(response.data.assessments);
    }
    });
 }

 

  const sortedCustomers = applySort(assessments, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Assessments list" />
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>

      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Course Name
                </TableCell>
                <TableCell>
                  Assessment Name
                </TableCell>
                <TableCell>
                  lecturer
                </TableCell>
                <TableCell>
                  Learners
                </TableCell>
                <TableCell>
                  Dateline
                </TableCell> 
                <TableCell>
                  Mult-choice-question
                </TableCell>
                <TableCell align='right'>
                  Actions
                </TableCell>    
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((assessment) => {

                return (
                  <TableRow
                    hover
                    key={assessment._id}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          style={{backgroundColor:"darkgreen"}}
                        >
                          {getInitials(assessment.coursename)}
                        </Avatar>
                          <Link
                            color="inherit"
                            variant="h6"
                          >
                            {assessment.coursename}
                          </Link>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          style={{backgroundColor:"darkgreen"}}
                        >
                          {getInitials(assessment.name)}
                        </Avatar>
                          <Link
                            color="inherit"
                            variant="h6"
                          >
                            {assessment.name}
                          </Link>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {assessment.lectName}
                    </TableCell>  
                    <TableCell>
                      {assessment.learners.length}(learners)
                    </TableCell>  
                    <TableCell>
                    {moment(assessment.dateline).format('YYYY-MM-DD')}
                    </TableCell>     
                    <TableCell>
                      {assessment.mcquestions.length}(questions)
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                      onClick={(e)=>{var result = window.confirm('Are you really want to delete this assessment?'); if(result) DeleteAssessment(assessment._id);}}
                      >
                        <SvgIcon fontSize="small">
                          <DeleteIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={assessments.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10]}
      />
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

// Results.defaultProps = {
//   customers: []
// };

export default Results;
