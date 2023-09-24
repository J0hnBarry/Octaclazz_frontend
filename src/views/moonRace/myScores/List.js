/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';


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

function Results({ className, Myassessments, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };


  const paginatedCustomers = applyPagination(Myassessments, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Divider />

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
                  Lecturer
                </TableCell>
                <TableCell>
                  Objective assessment
                </TableCell> 
                <TableCell >
                 Written assessment
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
                    <Typography
                    variant='h4'
                    color="inherit"
                    >
                    {assessment.obj}
                    </Typography>
                    </TableCell>  
                    <TableCell >
                    <Typography
                    variant='h4'
                    color="inherit"
                    >
                    {assessment.wri}
                    </Typography>
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
        count={Myassessments.length}
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
  Myassessments: PropTypes.array
};



export default Results;
