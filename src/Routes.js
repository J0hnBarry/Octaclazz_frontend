/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import LearnerGuard from 'src/components/learnerGuard';
import LecturerGuard from 'src/components/lecturerGuard';
import AdminGuard from 'src/components/adminGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [

      //home router

      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/dashboard" />
      },
      {
        exact: true,
        path: '/app/dashboard',
        component: lazy(() => import('src/views/DashboardView1'))
      },

      //courses router

      {
        exact: true,
        path: '/app/courses',
        component: lazy(() => import('src/views/courses'))
      },
      {
        exact: true,
        path: '/app/courses/current/:Id',
        component: lazy(() => import('src/views/courses/coursesView'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/addCourse/view',
        component: lazy(() => import('src/views/addcourses'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/editCourses',
        component: lazy(() => import('src/views/editCourses/OwnCourseList'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/editCourses/:Id',
        component: lazy(() => import('src/views/editCourses/editOne'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/course/newannouncement/:Id',
        component: lazy(() => import('src/views/editCourses/newAnnouncement'))
      },

      {
        exact: true,
        path: ['/app/courses/chat',
              '/app/courses/chat/:threadKey'],
        component: lazy(() => import('src/views/courses/chat'))
      },

      // moom race router

      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/assessments/moonrace/create',
        component: lazy(() => import('src/views/moonRace/addmoonRace'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/assessments/moonrace/edit',
        component: lazy(() => import('src/views/moonRace/editMoonquiz'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/assessments/moonquiz/update/:Id',
        component: lazy(() => import('src/views/moonRace/editMoonquiz/updateQuestion'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/assessments/moonquiz/narrative/:Id',
        component: lazy(() => import('src/views/moonRace/editMoonquiz/pushNarrative'))
      },
      {
        exact: true,
        guard: LearnerGuard,
        path: '/app/assessments/moonquiz/updateQuiz/:Id',
        component: lazy(() => import('src/views/moonRace/editMoonquiz/updateAssess'))
      },

      {
        exact: true,
        path: '/app/assessments/moonrace/take',
        component: lazy(() => import('src/views/moonRace/getMoonquiz/quizList'))
      },
      {
        exact: true,
        path: '/app/assessments/moonquiz/test/:Id',
        component: lazy(() => import('src/views/moonRace/getMoonquiz/narrative'))
      },
      {
        exact: true,
        path: '/app/assessments/moonquiz/start/:Id',
        component: lazy(() => import('src/views/moonRace/getMoonquiz/test'))
      },


         // assessments router

         {
          exact: true,
          path: '/app/assessments/assessments',
          component: lazy(() => import('src/views/assessments/assessments'))
        },
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/create',
          component: lazy(() => import('src/views/assessments/addAssessments'))
        },
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/edit',
          component: lazy(() => import('src/views/assessments/editAssessments'))
        },
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/gamification/:Id',
          component: lazy(() => import('src/views/assessments/editAssessments/editgamification'))
        },
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/update/:Id',
          component: lazy(() => import('src/views/assessments/editAssessments/updateQuestion'))
        },
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/updateAssess/:Id',
          component: lazy(() => import('src/views/assessments/editAssessments/updateAssess'))
        },
        
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/ownAssessmentlist',
          component: lazy(() => import('src/views/assessments/writtenTestScoring'))
        },
        {
          exact: true,
          guard: LearnerGuard,
          path: '/app/assessments/assessments/writtenScoring/:Id',
          component: lazy(() => import('src/views/assessments/writtenTestScoring/writtenScoring'))
        },
        {
          exact: true,
          path: '/app/assessments/assessments/test/:Id',
          component: lazy(() => import('src/views/assessments/assessments/test'))
        },
        {
          exact: true,
          path: '/app/assessments/assessments/myScores',
          component: lazy(() => import('src/views/assessments/myScores'))
        },

        // account router

        {
          exact: true,
          path: '/app/goaccount',
          component: () => <Redirect to="/app/account" />
        },
        {
          exact: true,
          path: '/app/account',
          component: lazy(() => import('src/views/pages/AccountView'))
        },

        // loan and borrow router

        {
          exact: true,
          guard: AdminGuard,
          path: '/app/account/wallet',
          component: lazy(() => import('src/views/wallet'))
        },
        {
          exact: true,
          guard: AdminGuard,
          path: '/app/account/wallet/edit/:Id',
          component: lazy(() => import('src/views/wallet/listUser/loanBorrowEdit'))
        },

        // notification router
        {
          exact: true,
          path: '/app/notification',
          component: lazy(() => import('src/views/notification'))
        },

        // movers & shakers router

        {
          exact: true,
          path: '/app/streakLeaders',
          component: lazy(() => import('src/views/movers & shakers/streak leaders'))
        },
        {
          exact: true,
          path: '/app/economicPillars',
          component: lazy(() => import('src/views/movers & shakers/economic pillars'))
        },
        {
          exact: true,
          path: '/app/samaritans',
          component: lazy(() => import('src/views/movers & shakers/samaritans'))
        },
        {
          exact: true,
          path: '/app/topSpenders',
          component: lazy(() => import('src/views/movers & shakers/top spenders'))
        },
        {
          exact: true,
          path: '/app/wealthiest',
          component: lazy(() => import('src/views/movers & shakers/wealthiest'))
        },

        // admin panel router

        {
          exact: true,
          guard: LecturerGuard,
          path: '/app/adminpanel/users',
          component: lazy(() => import('src/views/adminpanel/Users'))
        },
        {
          exact: true,
          guard: LecturerGuard,
          path: '/app/adminpanel/editUser/:userId',
          component: lazy(() => import('src/views/adminpanel/Edituser'))
        },
        {
          exact: true,
          guard: LecturerGuard,
          path: '/app/adminpanel/courses',
          component: lazy(() => import('src/views/adminpanel/Courses'))
        },
        {
          exact: true,
          guard: LecturerGuard,
          path: '/app/adminpanel/pushNotification',
          component: lazy(() => import('src/views/adminpanel/pushNotification'))
        },

        

        {
          component: () => <Redirect to="/404" />
        }
     ]
  },

  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
