/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Home as HomeIcon,
  BookOpen as BookOpenIcon,
  CheckCircle as CheckCircleIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  User as UserIcon,
  MessageSquare as MessageSquareIcon,
  Users as UsersIcon,
  FileText as FileTextIcon
} from 'react-feather';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';

const navConfigAdmin = [
  {    
    subheader: 'dashboard',
    items: [
          {
            title: 'Dashboard',
            icon: HomeIcon,
            href: '/app/dashboard'
          }
        ]
  },
  { subheader: "courses",
        items: [
          {
            title: 'Courses',
            icon: BookOpenIcon,
            items: [{
                    title: 'Courses',
                    href: '/app/courses'
                  },
                  {
                    title: 'Add Courses',
                    href: '/app/addCourse/view'
                  },
                  {
                    title: 'Edit Courses',
                    href: '/app/editCourses'
                  }
                ]
            }
      ]
            
  },
  
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Chat',
        href: '/app/courses/chat',
        icon: MessageSquareIcon,
      },
    ]
  },
  {
    subheader: 'assessments',
    items: [
      {
        title: 'Assessments',
        icon: CheckCircleIcon,
        items: [
          {
            title: 'Moon Quiz',
            items: [
              {
                title: 'List Quiz',
                href: '/app/assessments/moonrace/take'
              },
              {
                title: 'Add Quiz',
                href: '/app/assessments/moonrace/create'
              },
              {
                title: 'Edit Quiz',
                href: '/app/assessments/moonrace/edit'
              }
            ]
          },
          {
            title: 'Assessments',           
            items: [
              {
                title: 'Get Assessments',
                href: '/app/assessments/assessments',
              },
              {
                title: 'My Scores',
                href: '/app/assessments/assessments/myScores',
              },
              {
                title: 'Add Assessments',
                href: '/app/assessments/assessments/create'
              },
              {
                title: 'Edit Assessments',
                href: '/app/assessments/assessments/edit'
              },
              {
                title: 'Written scoring',
                href: '/app/assessments/assessments/ownAssessmentlist'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    subheader: 'account',
    items: [
      {
        title: 'Account',
        icon: UserIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/account'
          },
          {
            title: 'Notification',
            href: '/app/notification'
          },
          {
            title: 'Login',
            href: '/login',
            icon: LockIcon
          },
          {
            title: 'Register',
            href: '/register',
            icon: UserPlusIcon
          }
        ]
      }
    ]
  },
  {
    subheader: 'movers & shakers',
    items: [
      {
        title: 'Movers&Shakers',
        icon: UsersIcon,
        items: [
          {
            title: 'Streak Leaders',
            href: '/app/streakLeaders'
          },
          {
            title: 'Economic Pillars',
            href: '/app/economicPillars'
          },
          {
            title: 'The Samaritans',
            href: '/app/samaritans'
          },
          {
            title: 'Wealthiest',
            href: '/app/wealthiest'
          },
          {
            title: 'Top Spenders',
            href: '/app/topSpenders'
          }
        ]
      }
    ]
  },
  {subheader: 'admin',
    items: [
          {
            title: 'AdminPanel',
            icon: KeyIcon,
            items: [
              {
                title: 'Users',
                href: '/app/adminpanel/users'
              },
              {
                title: 'Courses',
                href: '/app/adminpanel/courses'
              },
              {
                title: 'Push notification',
                href: '/app/adminpanel/pushNotification'
              }
            ]
          }
        ]
  }
];

const navConfigLecturer = [
  {    
    subheader: 'dashboard',
    items: [
          {
            title: 'Dashboard',
            icon: HomeIcon,
            href: '/app/dashboard'
          }
        ]
  },
  { subheader: "courses",
        items: [
          {
            title: 'Courses',
            icon: BookOpenIcon,
            items: [{
                    title: 'Courses',
                    href: '/app/courses'
                  },
                  {
                    title: 'Add Courses',
                    href: '/app/addCourse/view'
                  },
                  {
                    title: 'Edit Courses',
                    href: '/app/editCourses'
                  }
                ]
            }
      ]
            
  },
  
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Chat',
        href: '/app/courses/chat',
        icon: MessageSquareIcon,
      },
    ]
  },
  {
    subheader: 'assessments',
    items: [
      {
        title: 'Assessments',
        icon: CheckCircleIcon,
        items: [
          {
            title: 'Moon Quiz',
            items: [
              {
                title: 'List Quiz',
                href: '/app/assessments/moonrace/take'
              },
              {
                title: 'Add Quiz',
                href: '/app/assessments/moonrace/create'
              },
              {
                title: 'Edit Quiz',
                href: '/app/assessments/moonrace/edit'
              }
            ]
          },
          {
            title: 'Assessments',           
            items: [

              {
                title: 'Add Assessments',
                href: '/app/assessments/assessments/create'
              },
              {
                title: 'Edit Assessments',
                href: '/app/assessments/assessments/edit'
              },
              {
                title: 'Written scoring',
                href: '/app/assessments/assessments/ownAssessmentlist'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    subheader: 'account',
    items: [
      {
        title: 'Account',
        icon: UserIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/account'
          },
          {
            title: 'Notification',
            href: '/app/notification'
          },
          {
            title: 'Login',
            href: '/login',
            icon: LockIcon
          },
          {
            title: 'Register',
            href: '/register',
            icon: UserPlusIcon
          }
        ]
      }
    ]
  },
  {
    subheader: 'movers & shakers',
    items: [
      {
        title: 'Movers&Shakers',
        icon: UsersIcon,
        items: [
          {
            title: 'Streak Leaders',
            href: '/app/streakLeaders'
          },
          {
            title: 'Economic Pillars',
            href: '/app/economicPillars'
          },
          {
            title: 'The Samaritans',
            href: '/app/samaritans'
          },
          {
            title: 'Wealthiest',
            href: '/app/wealthiest'
          },
          {
            title: 'Top Spenders',
            href: '/app/topSpenders'
          }
        ]
      }
    ]
  }
];
const navConfigLearner = [
  {    
    subheader: 'dashboard',
    items: [
          {
            title: 'Dashboard',
            icon: HomeIcon,
            href: '/app/dashboard'
          }
        ]
  },
  { subheader: "courses",
        items: [
          {
            title: 'Courses',
            icon: BookOpenIcon,
            href: '/app/courses'         
            }
      ]        
  },
  
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Chat',
        href: '/app/courses/chat',
        icon: MessageSquareIcon,
      },
    ]
  },
  {
    subheader: 'assessments',
    items: [
      {
        title: 'Assessments',
        icon: CheckCircleIcon,
        items: [
          {
            title: 'Moon Quiz',
            href: '/app/assessments/moonrace/take'
          },
          {
            title: 'Assessments',           
            items: [
              {
                title: 'Get Assessments',
                href: '/app/assessments/assessments',
              },
              {
                title: 'My Scores',
                href: '/app/assessments/assessments/myScores',
              }
            ]
          }
        ]
      }
    ]
  },
  {
    subheader: 'loan',
    items: [
      {
        title: 'Loan and Borrow',
        href: '/app/account/wallet',
        icon: FileTextIcon
      },
    ]
  },
  {
    subheader: 'account',
    items: [
      {
        title: 'Account',
        icon: UserIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/account'
          },
          {
            title: 'Notification',
            href: '/app/notification'
          },
          {
            title: 'Login',
            href: '/login',
            icon: LockIcon
          },
          {
            title: 'Register',
            href: '/register',
            icon: UserPlusIcon
          }
        ]
      }
    ]
  },
  {
    subheader: 'movers & shakers',
    items: [
      {
        title: 'Movers&Shakers',
        icon: UsersIcon,
        items: [
          {
            title: 'Streak Leaders',
            href: '/app/streakLeaders'
          },
          {
            title: 'Economic Pillars',
            href: '/app/economicPillars'
          },
          {
            title: 'The Samaritans',
            href: '/app/samaritans'
          },
          {
            title: 'Wealthiest',
            href: '/app/wealthiest'
          },
          {
            title: 'Top Spenders',
            href: '/app/topSpenders'
          }
        ]
      }
    ]
  }
];


function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {`${user.username}`}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {user.bio}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {(user.role === "admin") &&
          <Box p={2}>
          {navConfigAdmin.map((config) => (
            <List
                key={config.subheader}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        }
         {(user.role === "lecturer") &&
          <Box p={2}>
          {navConfigLecturer.map((config) => (
            <List
                key={config.subheader}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        }
         {(user.role === "learner") &&
          <Box p={2}>
          {navConfigLearner.map((config) => (
            <List
                key={config.subheader}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        }
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
