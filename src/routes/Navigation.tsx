import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AppLayout from '../Layout/AppLayOut';
import Dashboard from '../views/dashboard/Dashboard';
import Login from '../views/auth/Login';
import Shop from '../views/shop/Shop';
import OrderHistory from '../views/shop/OrderHistory';
// import Appointment from '../views/appointment/Appointment';
import AppointmentPage from '../views/appointment/AppointmentPage';
import FullCalendarPage from '../views/appointment/calendarpage/CalendarPage';

const Navigation = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path="/" element={<Login />} />
            {/* <Route element={<ProtectedComponent />}> */}
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/shop" element={<AppLayout><Shop /></AppLayout>} />
            <Route path="/orderhistory" element={<AppLayout><OrderHistory /></AppLayout>} />
            <Route path="/appointments" element={<AppLayout><AppointmentPage /></AppLayout>} />
            <Route path="/appointments/*" element={<AppLayout><AppointmentPage /></AppLayout>} />
            <Route path="/calendar" element={<AppLayout><FullCalendarPage /></AppLayout>} />
            <Route path="/emergency" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/chats" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/statistics" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/invoices" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/accounts" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/tips" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/payments" element={<AppLayout><Dashboard /></AppLayout>} />


            {/* </Route> */}
        </Route>
    )
)

export default Navigation
