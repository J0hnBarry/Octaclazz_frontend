/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';


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

function Results({ className, Myassessments,viewAnswer, ...rest }) {
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
                  LearnersName
                </TableCell>
                <TableCell>
                  LearnersEmail
                </TableCell>
                <TableCell>
                ObjectiveScore
                </TableCell>
                <TableCell>
                 WrittenScore
                </TableCell> 
                <TableCell>
                  WrittenTest
                </TableCell>
                <TableCell align='right'>
                 GivingScore
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
                      {assessment.learnName}
                    </TableCell>
                    <TableCell>
                      {assessment.email}
                    </TableCell>
                    <TableCell>
                      {assessment.object}
                    </TableCell>
                    <TableCell>
                      {assessment.written}
                    </TableCell>
                    <TableCell>
                      {(assessment.wrianswer) &&
                       <Typography
                       variant='h6'                   
                       >
                         Submitted
                       </Typography>
                      }
                       {(!assessment.wrianswer) &&
                       <Typography
                       variant='h6'                   
                       >
                        not Submitted
                       </Typography>
                      }
                      
                    </TableCell>
                    <TableCell align="right">
                      {(assessment.wrianswer && (!assessment.written) && (assessment.written === 0)) &&
                      <Button
                      style={{backgroundColor:"lightgreen"}}
                       onClick={(e)=>{ viewAnswer(assessment._id, assessment.wrianswer)}}
                      >
                      <Typography
                      variant='h6'  
                      color="primary"                  
                      >
                        Scoring
                      </Typography>
                      </Button>
                      }
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
