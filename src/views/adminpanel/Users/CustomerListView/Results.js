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
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import moment from 'moment';

const tabs = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'allow',
    label: 'Applicants'
  }
];

const sortOptions = [
  {
    value: 'createdAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'createdAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'wallet|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'wallet|asc',
    label: 'Total orders (low to high)'
  }
];

function applyFilters(customers, query, filters) {
  return customers.filter((customer) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'username'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && customer[key] === value) {
        matches = false;
      }
    });

    return matches;
  });
}

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
  queryField: {
    width: 500
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({ className, users, onAllow, onDelete, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    allow: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      allow: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

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


  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(users, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search users(name or email)"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
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
        <Box minWidth={850}>
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
                  Role
                </TableCell>
                <TableCell>
                  Total funds(VN)
                </TableCell>
                <TableCell>
                  Registered date
                </TableCell>
                <TableCell>
                  Allow
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {

                return (
                  <TableRow
                    hover
                    key={customer._id}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={customer.avatar}
                        >
                          {getInitials(customer.username)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            variant="h6"
                          >
                            {customer.username}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {customer.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.location}
                    </TableCell>
                    <TableCell>
                    {customer.role}
                    </TableCell>
                    <TableCell>
                      {customer.wallet}
                    </TableCell>
                    <TableCell>
                      {moment(customer.createdAt).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell>
                    {(customer.allow) &&
                      <Button size='small' variant='contained' color="secondary">
                        allowed
                      </Button>
                    }
                      {(!customer.allow) &&
                      <Button size='small' variant='contained' style={{backgroundColor:"orange"}}
                      onClick={(e) => onAllow(customer._id)}>
                        Not allowed
                      </Button>
                    }
                    </TableCell>
                    <TableCell align="right">
                      {(customer.role !== 'admin') &&
                      <>
                       <IconButton
                       component={RouterLink}
                       to={"/app/adminpanel/editUser/" + customer._id}
                     >
                       <SvgIcon fontSize="small">
                         <EditIcon />
                       </SvgIcon>
                     </IconButton>
                     <IconButton
                     onClick={(e) => {if(window.confirm("Are you really want to delete this user?")) onDelete(customer._id)}}
                     >
                       <SvgIcon fontSize="small">
                         <DeleteIcon />
                       </SvgIcon>
                     </IconButton>
                     </>
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
        count={filteredCustomers.length}
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
  users: PropTypes.array,
  onAllow : PropTypes.func,
  onDelete : PropTypes.func
};

Results.defaultProps = {
  users: []
};

export default Results;
