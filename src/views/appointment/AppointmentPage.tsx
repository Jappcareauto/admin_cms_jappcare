import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Appointment from './Appointment';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import AppointmentDetails from '../../components/Drawer/appointmentDetails/AppointmentDetails';
import ExpandedAppointmentDetails from './ExpandedAppointmentDetails ';

const AppointmentPage = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleExpand = () => {
        setIsDrawerOpen(false);
        navigate('/appointments/details/expanded');
    };

    const handleClose = () => {
        navigate('/appointments');
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Box>
                        <Appointment /> {/* Your main appointment component */}
                        <CustomDrawer
                            open={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                            title="Appointment Details"
                        >
                            <AppointmentDetails
                                onMarkCompleted={() => { }}
                                onExpand={handleExpand}
                            />
                        </CustomDrawer>
                    </Box>
                }
            />
            <Route
                path="/details/expanded"
                element={<ExpandedAppointmentDetails onClose={handleClose} />}
            />
        </Routes>
    );
};

export default AppointmentPage;