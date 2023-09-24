/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import Label from 'src/components/Label';

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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title = "This is a ranking of the amount of loans learners currently have." />
      <Divider />
      <CardContent>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table  justify="space-between">
            <TableHead>
              <TableRow >
              <TableCell>
                  No
                </TableCell>
                <TableCell>
                  Avatar
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                 Current total loans (VN)
                </TableCell>
                <TableCell align='right'>
                 Current number of loans (VN)
                </TableCell>    
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {

                return (
                  <TableRow
                    hover
                    key={customer._id}
                  >
                    <TableCell>
                      {customer.number}
                    </TableCell>
                    <TableCell>
                      <Avatar
                        className={classes.avatar}
                        src={customer.id.avatar}
                      >
                        {getInitials(customer.id.username)}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      {customer.id.username}
                    </TableCell>
                    <TableCell>
                      {customer.id.email}
                    </TableCell>
                    <TableCell>
                      {customer.id.location}
                    </TableCell>
                    <TableCell>
                      <Label color="success">
                      {customer.totalLoan}
                      </Label>
                    </TableCell>
                    <TableCell align='right'>
                      {customer.loanNumber}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

export default Results;
