import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Grid,
    styled,
    Stack
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarIcon from '../../components/Icones/calendarIcon';
import MenuChip from '../../components/Icones/MenuChip';
import MenuListChip from '../../components/Icones/MenuListChip';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TrashIcon from '../../components/Icones/TrashIcon';
import LocationIcon from '../../components/Icones/LocationIcon';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { JC_Services } from '../../services';
import { format, parseISO } from 'date-fns';
import { AppointmentInterface } from '../../interfaces/Interfaces';
import { formatValue } from '../../tools/formatValue';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import AppointmentDetails from '../../components/Drawer/appointmentDetails/AppointmentDetails';
import ExpandedAppointmentDetails from './ExpandedAppointmentDetails ';



// Styled Components (keep existing styles)
const StyledCard = styled(Card)(() => ({
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const StyledChip = styled(Chip)(() => ({
    borderRadius: 28,
    padding: '20px 14px',
    '&.active': {
        backgroundColor: "#FB7C37",
        color: 'white',
    },
}));

const AppointmentListView = () => {
    const [activeStatus, setActiveStatus] = useState('NOT_STARTED');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [appointmentsData, setAppointments] = useState<AppointmentInterface[]>([]);
    const [AllappointmentsData, setAllAppointmentsData] = useState<AppointmentInterface[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAppointmentDrawerOpen, setIsAppointmentDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    const token = connectedUsers.accessToken

    const handleSeeDetails = (appointment: AppointmentInterface) => {
        setSelectedAppointment(appointment);
        setIsAppointmentDrawerOpen(true);
    };

    const handleExpand = (appointment: AppointmentInterface) => {
        navigate(`/appointments/details/expanded/${appointment.id}`, { state: { appointmentData: appointment } });
    };


    const handleClose = () => {
        navigate('/appointments');
    };
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `appointment/list`, 'GET', {}, token);
            console.log("response", response);

            if (response && response.body.meta.statusCode === 200) {
                // Filter appointments by status if needed
                setAllAppointmentsData(response.body.data);
                const filteredAppointments = response.body.data.filter(
                    (appointment: AppointmentInterface) => appointment.status === activeStatus
                );

                setAppointments(filteredAppointments);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchAppointments();
    }, [activeStatus]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS': return '#FB7C37';
            case 'COMPLETED': return '#4CAF50';
            case 'NOT_STARTED': return '#9E9E9E';
            default: return '#9E9E9E';
        }
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <CalendarIcon fill='#111111' stroke='' />
                    <Typography variant="h6" fontWeight={600}>
                        Appointments
                    </Typography>
                </Box>
                {errorMessage && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Stack direction="row" spacing={-1}>
                        <IconButton onClick={() => navigate('/appointments')}>
                            <MenuChip fill='#FFEDE6' iconfill='#242424' />
                        </IconButton>
                        <IconButton onClick={() => navigate('/appointments/list')}>
                            <MenuListChip fill='#FB7C37' />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

            {/* Status Filters */}
            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                {['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
                    <StyledChip
                        key={status}
                        label={formatValue(status.replace('_', ' '))}
                        className={activeStatus === status ? 'active' : ''}
                        onClick={() => setActiveStatus(status)}
                        sx={{
                            bgcolor: activeStatus === status ? '#FB7C37' : '#fff',
                            '&:hover': {
                                bgcolor: activeStatus === status ? '#FB7C37' : 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    />
                ))}
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {[
                    { value: appointmentsData.length.toString(), label: 'Current Appointments' },
                    { value: AllappointmentsData.length.toString(), label: 'Total Appointments' },
                ].map((stat, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <CalendarIcon fill='#FB7C37' stroke='' />
                                </Box>
                                <Box>
                                    <Typography variant="h4" color="#000000" fontWeight="bold">
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>


            {loading ? (
                <Typography>Loading...</Typography>
            ) :
                (
                    <>
                        {appointmentsData.length === 0 ? (
                            <Typography>No appointments found</Typography>) :
                            (
                                <>
                                    {/* Appointments List */}
                                    {appointmentsData.map((appointment, index) => (
                                        <Box
                                            key={appointment.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 1,
                                                borderBottom: index !== appointmentsData.length - 1 ? '1px solid #E4E4E4' : 'none',
                                            }}
                                        >
                                            {/* User Avatar */}
                                            <Box sx={{ width: 200, display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: '#1A1D1F',
                                                        color: '#FF7A00',
                                                        border: '2px solid #FF7A00',
                                                        width: 48,
                                                        height: 48,
                                                        fontSize: 16,
                                                        fontWeight: 600,
                                                        boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)',
                                                    }}
                                                >
                                                    {appointment.vehicle.name.substring(0, 2).toUpperCase()}
                                                </Avatar>
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    {`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
                                                </Typography>
                                            </Box>

                                            {/* Service */}
                                            <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                                                {appointment.service.title}
                                            </Typography>

                                            {/* Location */}
                                            <Typography sx={{ width: 150, fontSize: '0.875rem', color: 'text.secondary' }}>
                                                {appointment.locationType.replace('_', ' ')}
                                            </Typography>

                                            {/* Date */}
                                            <Box sx={{ width: 150, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarIcon stroke='#777777' fill='' />
                                                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                                    {format(parseISO(appointment.date), 'MMM dd, yyyy')}
                                                </Typography>
                                            </Box>

                                            {/* On Site */}
                                            <Box sx={{ width: 150, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationIcon stroke='#777777' fill='' />
                                                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                                    {appointment.locationType === 'CUSTOM' ? 'On Site' : 'Not On Site'}
                                                </Typography>
                                            </Box>

                                            {/* Status */}
                                            <Chip
                                                label={formatValue(appointment.status.replace('_', ' '))}
                                                sx={{
                                                    borderRadius: 4,
                                                    bgcolor: getStatusColor(appointment.status),
                                                    color: 'white',
                                                    mr: 4,
                                                    height: 34,
                                                    px: 1,
                                                }}
                                            />

                                            {/* Actions */}
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton size="small">
                                                    <TrashIcon stroke='#141B34' fill='' />
                                                </IconButton>
                                                <IconButton size="small" sx={{ color: '#FB7C37' }}
                                                    onClick={() => handleSeeDetails(appointment)}

                                                >
                                                    <ArrowForwardIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))}
                                </>
                            )
                        }


                    </>
                )
            }

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <CustomDrawer
                                open={isAppointmentDrawerOpen}
                                onClose={() => setIsAppointmentDrawerOpen(false)}
                                title="Appointment Details"
                            >
                                {selectedAppointment && (
                                    <AppointmentDetails
                                        appointment={selectedAppointment}
                                        onMarkCompleted={() => { }}
                                        onExpand={() => handleExpand(selectedAppointment)}
                                    />
                                )}
                            </CustomDrawer>
                        </>
                    }
                />
                <Route
                    path="/details/expanded"
                    element={
                        selectedAppointment ? (
                            <ExpandedAppointmentDetails
                                appointment={selectedAppointment}
                                onClose={handleClose}
                                onMarkCompleted={() => { }}
                            />
                        ) : null
                    }
                />
            </Routes>

        </Box>
    );
};

export default AppointmentListView;