import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AppLayout from '../Layout/AppLayOut';
import Dashboard from '../views/dashboard/Dashboard';
import Login from '../views/auth/Login';
import Shop from '../views/shop/Shop';

const Navigation = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path="/" element={<Login />} />
            {/* <Route element={<ProtectedComponent />}> */}
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/shop" element={<AppLayout><Shop /></AppLayout>} />

            {/* </Route> */}
        </Route>
    )
)

export default Navigation
