import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AppLayout from '../Layout/AppLayOut';
// import Appointment from '../views/appointment/Appointment';
import ProtectedComponent from '../tools/ProtectedComponent';

const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const Login = lazy(() => import('../views/auth/Login'));
const Shop = lazy(() => import('../views/shop/Shop'));
const OrderHistory = lazy(() => import('../views/shop/OrderHistory'));
const AppointmentPage = lazy(() => import('../views/appointment/AppointmentPage'));
const FullCalendarPage = lazy(() => import('../views/appointment/calendarpage/CalendarPage'));
const WeeklyMonthlyView = lazy(() => import('../views/appointment/calendarpage/WeeklyMonthlyView'));
const AppointmentListView = lazy(() => import('../views/appointment/AppointmentListView'));
const Accounts = lazy(() => import('../views/accounts/Accounts'));
const Profile = lazy(() => import('../views/profile/Profile'));
const Statistics = lazy(() => import('../views/statistics/Statistics'));
const TransactionsView = lazy(() => import('../views/statistics/transactions/Transactions'));
const ServiceCenterChats = lazy(() => import('../views/chats/ServiceCenterChats'));
const Chats = lazy(() => import('../views/chats/Chats'));
const Tips = lazy(() => import('../views/tips/Tips'));
const Payments = lazy(() => import('../views/payments/Payments'));
const ServicesList = lazy(() => import('../views/serviceslist/SevicesList'));

const RouteLoader = () => (
    <Box sx={{ minHeight: '40vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size={28} />
    </Box>
);

const withSuspense = (element: React.ReactNode) => (
    <Suspense fallback={<RouteLoader />}>
        {element}
    </Suspense>
);

const Navigation = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path="/" element={withSuspense(<Login />)} />
            <Route element={<ProtectedComponent />}>
                <Route path="/dashboard" element={withSuspense(<AppLayout><Dashboard /></AppLayout>)} />
                <Route path="/shop" element={withSuspense(<AppLayout><Shop /></AppLayout>)} />
                <Route path="/orderhistory" element={withSuspense(<AppLayout><OrderHistory /></AppLayout>)} />
                <Route path="/appointments" element={withSuspense(<AppLayout><AppointmentPage /></AppLayout>)} />
                <Route path="/appointments/*" element={withSuspense(<AppLayout><AppointmentPage /></AppLayout>)} />
                <Route path="/appointments/calendarviews" element={withSuspense(<AppLayout><WeeklyMonthlyView /></AppLayout>)} />
                <Route path="/appointments/list" element={withSuspense(<AppLayout><AppointmentListView /></AppLayout>)} />
                <Route path="/calendar" element={withSuspense(<AppLayout><FullCalendarPage /></AppLayout>)} />
                <Route path="/emergency" element={withSuspense(<AppLayout><Dashboard /></AppLayout>)} />
                <Route path="/servicecenterchats" element={withSuspense(<AppLayout><ServiceCenterChats /></AppLayout>)} />
                <Route path="/chats/:id" element={withSuspense(<AppLayout><Chats /></AppLayout>)} />
                <Route path="/statistics" element={withSuspense(<AppLayout><Statistics /></AppLayout>)} />
                <Route path="/transactions" element={withSuspense(<AppLayout><TransactionsView /></AppLayout>)} />
                <Route path="/invoices" element={withSuspense(<AppLayout><Dashboard /></AppLayout>)} />
                <Route path="/profile" element={withSuspense(<AppLayout><Profile /></AppLayout>)} />
                <Route path="/accounts" element={withSuspense(<AppLayout><Accounts /></AppLayout>)} />
                <Route path="/tips" element={withSuspense(<AppLayout><Tips /></AppLayout>)} />
                <Route path="/payments" element={withSuspense(<AppLayout><Payments /></AppLayout>)} />
                <Route path="/services" element={withSuspense(<AppLayout><ServicesList /></AppLayout>)} />


            </Route>
        </Route>
    )
)

export default Navigation
