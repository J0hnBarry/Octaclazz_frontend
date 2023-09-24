/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';
import {
  Delete as DeleteIcon
} from 'react-feather';


function applyPagination(assessments, page, limit) {
  return assessments.slice(page * limit, page * limit + limit);
}


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({ className, Myassessments,onDelete, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [assessments, setAssessments] = useState([]);
 

  useEffect(() => {
    setAssessments(Myassessments)
  },[Myassessments])

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const paginatedCustomers = applyPagination(assessments, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Divider />
      <PerfectScrollbar>
        <Box >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Question
                </TableCell>
                <TableCell>
                  Answer 1
                </TableCell>
                <TableCell>
                  Answer 2
                </TableCell>
                <TableCell>
                  Answer 3
                </TableCell> 
                <TableCell>
                  Answer 4
                </TableCell>
                <TableCell>
                  Correct Answer
                </TableCell>
                <TableCell align='right'>
                  Delete Assessment
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
                      {assessment.ques}
                    </TableCell>
                    <TableCell>
                      {assessment.ans1}
                    </TableCell>
                    <TableCell>
                      {assessment.ans2}
                    </TableCell>
                    <TableCell>
                      {assessment.ans3}
                    </TableCell>
                    <TableCell>
                      {assessment.ans4}
                    </TableCell>
                    <TableCell>
                      {assessment.crt}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                      onClick={(e)=>{var result = window.confirm('Are you really want to delete this course?'); if(result) onDelete(assessment._id);}}
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
  Myassessments: PropTypes.array,
};

export default Results;
