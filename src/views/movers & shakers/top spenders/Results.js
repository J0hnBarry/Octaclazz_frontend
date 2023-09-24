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
      <CardHeader title = "It is the ranking of learners who spend the most on the system." />
      <Divider />
      <CardContent>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
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
                <TableCell align='right'>
                 Total spending (VN)
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
                        src={customer.avatar}
                      >
                        {getInitials(customer.username)}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      {customer.username}
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.location}
                    </TableCell>
                    <TableCell align='right'>
                      <Label color="success">
                      {customer.totalSpending}
                      </Label>
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
