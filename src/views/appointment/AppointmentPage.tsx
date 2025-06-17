import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Appointment from './Appointment';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import AppointmentDetails from '../../components/Drawer/appointmentDetails/AppointmentDetails';
import ExpandedAppointmentDetails from './ExpandedAppointmentDetails ';
import { AppointmentInterface } from '../../interfaces/Interfaces';

const AppointmentPage = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();

    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);

    const handleExpand = (appointment: AppointmentInterface) => {
        setIsDrawerOpen(false);
        setSelectedAppointment(appointment);
        navigate(`/appointments/details/expanded/${appointment.id}`, {
            state: { appointmentData: appointment }
        });
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
                                appointment={selectedAppointment!}
                                onMarkCompleted={() => { }}
                                onExpand={() => handleExpand(selectedAppointment!)}
                            />
                        </CustomDrawer>
                    </Box>
                }
            />
            <Route
                path="/details/expanded/:id"
                element={
                    location.state?.appointmentData ? (
                        <ExpandedAppointmentDetails
                            appointment={location.state.appointmentData}
                            onClose={handleClose}
                        />
                    ) : (
                        <Box>No appointment details available</Box>
                    )
                }
            />
        </Routes>
    );
};

export default AppointmentPage;