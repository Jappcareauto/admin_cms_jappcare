import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AppLayout from '../Layout/AppLayOut';
import Dashboard from '../views/dashboard/Dashboard';
import Login from '../views/auth/Login';
import Shop from '../views/shop/Shop';
import OrderHistory from '../views/shop/OrderHistory';
// import Appointment from '../views/appointment/Appointment';
import AppointmentPage from '../views/appointment/AppointmentPage';
import FullCalendarPage from '../views/appointment/calendarpage/CalendarPage';
import WeeklyMonthlyView from '../views/appointment/calendarpage/WeeklyMonthlyView';
import AppointmentListView from '../views/appointment/AppointmentListView';
import Accounts from '../views/accounts/Accounts';
import Profile from '../views/profile/Profile';
import Statistics from '../views/statistics/Statistics';
import TransactionsView from '../views/statistics/transactions/Transactions';
import ServiceCenterChats from '../views/chats/ServiceCenterChats';
import Chats from '../views/chats/Chats';
import Tips from '../views/tips/Tips';
import Payments from '../views/payments/Payments';
import ProtectedComponent from '../tools/ProtectedComponent';

const Navigation = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedComponent />}>
                <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/shop" element={<AppLayout><Shop /></AppLayout>} />
                <Route path="/orderhistory" element={<AppLayout><OrderHistory /></AppLayout>} />
                <Route path="/appointments" element={<AppLayout><AppointmentPage /></AppLayout>} />
                <Route path="/appointments/*" element={<AppLayout><AppointmentPage /></AppLayout>} />
                <Route path="/appointments/calendarviews" element={<AppLayout><WeeklyMonthlyView /></AppLayout>} />
                <Route path="/appointments/list" element={<AppLayout><AppointmentListView /></AppLayout>} />
                <Route path="/calendar" element={<AppLayout><FullCalendarPage /></AppLayout>} />
                <Route path="/emergency" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/servicecenterchats" element={<AppLayout><ServiceCenterChats /></AppLayout>} />
                <Route path="/chats/:id" element={<AppLayout><Chats /></AppLayout>} />
                <Route path="/statistics" element={<AppLayout><Statistics /></AppLayout>} />
                <Route path="/transactions" element={<AppLayout><TransactionsView /></AppLayout>} />
                <Route path="/invoices" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
                <Route path="/accounts" element={<AppLayout><Accounts /></AppLayout>} />
                <Route path="/tips" element={<AppLayout><Tips /></AppLayout>} />
                <Route path="/payments" element={<AppLayout><Payments /></AppLayout>} />


            </Route>
        </Route>
    )
)

export default Navigation
