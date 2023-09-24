/* eslint-disable max-len */
import React, { useState } from 'react';
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
import { useSnackbar } from 'notistack';
import {
  Delete as DeleteIcon
} from 'react-feather';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';


var string = API_BASE_URL + '/uploads/courses/';
var num = string.length -5 + 37; 



function applyPagination(lists, page, limit) {
  return lists.slice(page * limit, page * limit + limit);
}


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({ className, id, file, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [lists, setLists] = useState(file);

  const ondelete = (file) => {
    axios
    .post(API_BASE_URL + 'courses/delete/file', {
      file: file,
      courseId : id
    } )
    .then((response) => {

        setLists(response.data.newFile);
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        });  
    });
  }


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const paginatedCustomers = applyPagination(lists, page, limit);

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
                  Name
                </TableCell>
                <TableCell align='right'>
                  Actions
                </TableCell>    
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((list) => {

                return (
                  <TableRow
                    hover
                    key={list}
                  >
                    <TableCell>
                      {list.slice(num)}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                      onClick={(e) => {var result = window.confirm('Are you really want to delete this file?'); if(result) ondelete(list);}}
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
        count={file.length}
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

export default Results;
