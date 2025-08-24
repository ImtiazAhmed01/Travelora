

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home'
import Root from './Component/Root'
import AuthProvider from './Component/Provider/authProvider'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import TouristDashboard from './Component/UserDashboard/TouristDashboard'
import TourGuideDashboard from './Component/UserDashboard/TourGuideDashboard'
import AdminDashboard from './Component/UserDashboard/AdminDashboard'
import Layout2 from './Component/Layout2'
import TouristManageProfile from './Component/Tourist/TouristManageProfile'
import JoinAsTourGuide from './Component/Tourist/JoinAsTourGuide'
import GuideProfile from './Component/TourGuide/GuideProfile'
import Payment from './Component/Tourist/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import ManageUsers from './Component/Admin/ManageUsers'
import ManageCandidate from './Component/Admin/ManageCandidate'
import AllTripsPage from './Component/AllTripsPage/AllTripsPage'
import PackageDetails from './Component/PackageDetails/PackageDetails'
import AddPackage from './Component/Admin/AddPackage'
import MyBooking from './Component/Tourist/MyBooking'
import TourReview from './Component/Admin/TourReview'

const stripePromise = loadStripe('pk_test_51QjKgaAwC1fImaEQKbRyeHqq3iw3ufeIP1FU4awqUbJeavujVfjrOmIsnFtx5Rb98KteM18htlYTO4caZztCMqkA00G1ifOgo6');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    //errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/', element: <Home></Home>
      },
      {
        path: 'register',
        element: <Register></Register>
      },

      {
        path: 'login',
        element: <Login></Login>
      }, {
        path: '/alltirpspages',
        element: <AllTripsPage></AllTripsPage>
      },
      {
        path: "/packages/:id",
        element: <PackageDetails></PackageDetails>
      },


    ]
  },
  {
    path: '/',
    element: <Layout2></Layout2>,

    children: [
      {
        path: "/dashboard/tourist",
        element: <ProtectedRoute allowedRoles={['Tourist']}><TouristDashboard></TouristDashboard></ProtectedRoute>
      },
      {
        path: '/dashboard/tourist/manageProfile',
        element: <TouristManageProfile></TouristManageProfile>
      },
      {
        path: '/dashboard/tourist/joinguide',
        element: <JoinAsTourGuide></JoinAsTourGuide>
      }, {

        path: "/payment/:id",
        element: <Payment></Payment>

      },
      {
        path: '/dashboard/tourist/myBookings',
        element: <MyBooking></MyBooking>
      },
      {
        path: "dashboard/tourguide",
        element: <ProtectedRoute allowedRoles={['Tour Guide']}><TourGuideDashboard></TourGuideDashboard></ProtectedRoute>
      },


      {
        path: "dashboard/admin",
        element: <ProtectedRoute allowedRoles={['Admin']}><AdminDashboard></AdminDashboard></ProtectedRoute>
      },
      {
        path: 'dashboard/admin/manageusers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'dashboard/admin/managecandidate',
        element: <ManageCandidate></ManageCandidate>
      },
      {
        path: 'dashboard/admin/addpackage',
        element: <AddPackage></AddPackage>
      },
      {
        path: 'dashboard/admin/tourreview',
        element: <TourReview></TourReview>
      }
    ]


  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}></RouterProvider>
      </Elements>
    </AuthProvider>
  </StrictMode>,
)