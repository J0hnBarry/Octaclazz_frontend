/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import Label from 'src/components/Label';

const sortOptions = [
  {
    value: 'loans|desc',
    label: 'Loan (high to low)'
  },
  {
    value: 'loans|asc',
    label: 'Loan (low to high)'
  },
  {
    value: 'borrows|desc',
    label: 'borrowed (high to low)'
  },
  {
    value: 'borrows|asc',
    label: 'borrowed (low to high)'
  },
  {
    value: 'gifts|desc',
    label: 'gift gave(high to low)'
  },
  {
    value: 'gifts|asc',
    label: 'gift gave(low to high)'
  },
  {
    value: 'receives|desc',
    label: 'gift received (high to low)'
  },
  {
    value: 'receives|asc',
    label: 'gift received  (low to high)'
  }
];


function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
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

function applySort(customers, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

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

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState(sortOptions[0].value);

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

  const sortedCustomers = applySort(customers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
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
        <Box minWidth={1000}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  total <br />(VN)
                </TableCell>
                <TableCell>
                  loan<br />(VN)
                </TableCell>
                <TableCell>
                  borrowed<br />(VN)
                </TableCell>
                <TableCell>
                  gaveGift<br />(VN)
                </TableCell>
                <TableCell>
                  receivedGift<br />(VN)
                </TableCell>  
                <TableCell>
                  giftReq<br />got(VN)
                </TableCell> 
                <TableCell>
                  loanReq<br />got(VN)
                </TableCell> 
                <TableCell>
                  giftReq<br />sent(VN)
                </TableCell>   
                <TableCell>
                  loanReq<br />sent(VN)
                </TableCell>     
                <TableCell align="right">
                 Loan & Borrow
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {

                return (
                  <TableRow
                    hover
                    key={customer.userid._id}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={customer.userid.avatar}
                        >
                          {getInitials(customer.userid.username)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            variant="h6"
                          >
                            {customer.userid.username}
                          </Link>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.userid.location}
                    </TableCell>
                    <TableCell>
                      {customer.userid.wallet}
                    </TableCell>
                    <TableCell>
                      {customer.loans}
                    </TableCell>                   
                      {(customer.borrows === 0) &&
                      <TableCell>
                      {customer.borrows}
                      </TableCell>
                      }
                      {(customer.borrows !== 0) &&
                      <TableCell>
                      <Label color='error'>
                      {customer.borrows}
                      </Label>
                      </TableCell>
                      }
                                         
                    <TableCell>
                      {customer.gifts}
                    </TableCell>
                    <TableCell>
                      {customer.receives}
                    </TableCell>
                    {(customer.getGiftReq === 0) &&
                      <TableCell>
                      {customer.getGiftReq}
                      </TableCell>
                      }
                      {(customer.getGiftReq !== 0) &&
                      <TableCell>
                      <Label color='warning'>
                      {customer.getGiftReq}
                      </Label>
                      </TableCell>
                      }
                      {(customer.getLoanReq === 0) &&
                      <TableCell>
                      {customer.getLoanReq}
                      </TableCell>
                      }
                      {(customer.getLoanReq !== 0) &&
                      <TableCell>
                      <Label color='warning'>
                      {customer.getLoanReq}
                      </Label>
                      </TableCell>
                      }
                    <TableCell>
                      {customer.sendGiftReq}
                    </TableCell>
                    <TableCell>
                      {customer.sendLoanReq}
                    </TableCell>
                    <TableCell align="right">
                     <Button style={{backgroundColor:"darkgreen"}} size='medium' component={RouterLink} to={"/app/account/wallet/edit/"+customer.userid._id}>
                     Edit 
                     </Button>
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
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

export default Results;
