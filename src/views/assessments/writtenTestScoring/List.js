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
  Edit as EditIcon
} from 'react-feather';
import {Link as RouterLink} from 'react-router-dom';
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
                  Learners
                </TableCell>
                <TableCell>
                  Objective scores
                </TableCell> 
                <TableCell>
                 Written scores
                </TableCell>
                <TableCell>
                 Written test number
                </TableCell>
                <TableCell align='right'>
                  View & giving scores
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
                      {assessment.learners.length} &nbsp; (learners)
                    </TableCell>  
                    <TableCell>
                    {assessment.object} &nbsp; (scores)
                    </TableCell>  
                    <TableCell>
                    {assessment.written} &nbsp; (scores)
                    </TableCell>    
                    <TableCell>
                      {assessment.wrianswer} &nbsp; (test papers)
                    </TableCell>
                    <TableCell align="right">
                    <IconButton
                        component={RouterLink}
                        to={"/app/assessments/assessments/writtenScoring/" + assessment._id}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
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
