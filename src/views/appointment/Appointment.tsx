import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Chip,
    Button,
    Stack,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { XAxis, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import AppointmentIcon from '../../components/Icones/AppointmentIcon';
import LocationIcon from '../../components/Icones/LocationIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import AppointmentDetails from '../../components/Drawer/appointmentDetails/AppointmentDetails';
import CalendarIcon from '../../components/Icones/calendarIcon';
import ExpandedAppointmentDetails from './ExpandedAppointmentDetails ';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';
import MenuChip from '../../components/Icones/MenuChip';
import MenuListChip from '../../components/Icones/MenuListChip';
import { useSelector } from 'react-redux';
import { JC_Services } from '../../services';
import { format, parseISO, isAfter, startOfToday, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { AppointmentInterface } from '../../interfaces/Interfaces';
import { formatValue } from '../../tools/formatValue';


// Styled components (kept from original)
const StyledCard = styled(Card)<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
    height: '100%',
    backgroundColor: bgcolor || theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const StyledChip = styled(Chip)<{ status?: string }>(({ status }) => {
    const getStatusStyle = () => {
        switch (status?.toLowerCase()) {
            case 'in_progress':
                return {
                    backgroundColor: '#FB7C37',
                    color: '#ffffff',
                };
            case 'completed':
                return {
                    backgroundColor: '#E8F5E9',
                    color: '#4CAF50',
                };
            default:
                return {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    color: 'rgba(0, 0, 0, 0.6)',
                };
        }
    };

    return {
        height: '34px',
        ...getStatusStyle(),
        '& .MuiChip-label': {
            padding: '15px 20px 15px 20px',
            fontSize: '13px',
            fontWeight: 600,
        },
    };
});

const Appointment = () => {
    const [isAppointmentDrawerOpen, setIsAppointmentDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);
    const [activeStatus, setActiveStatus] = useState('IN_PROGRESS');
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [weeklyData, setWeeklyData] = useState([
        { day: 'Mon', value: 0 },
        { day: 'Tue', value: 0 },
        { day: 'Wed', value: 0 },
        { day: 'Thu', value: 0 },
        { day: 'Fri', value: 0 },
        { day: 'Sat', value: 0 },
        { day: 'Sun', value: 0 },
    ]);

    const navigate = useNavigate();

    // Redux selector for connected user
    const connectedUsers = useSelector((state: any) => state);
    const token = connectedUsers.accessToken;
    console.log("selectedAppointment", selectedAppointment);


    const handleSeeDetails = (appointment: AppointmentInterface) => {
        setSelectedAppointment(appointment);
        setIsAppointmentDrawerOpen(true);
    };

    // Fetch appointments from API
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `appointment/list`, 'POST', {}, token);
            console.log("response", response);

            if (response && response.body.meta.statusCode === 200) {
                // Filter appointments by status
                const filteredAppointments = response.body.data.filter(
                    (appointment: AppointmentInterface) => appointment.status === activeStatus
                );

                // Sort appointments by date
                const sortedAppointments = filteredAppointments.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                );

                // Separate past and future appointments
                const today = startOfToday();

                const upcomingAppointments: AppointmentInterface[] = sortedAppointments.filter(
                    (appointment: AppointmentInterface): boolean => isAfter(parseISO(appointment.date), today)
                );

                // If no upcoming appointments, use the most recent past appointment
                const finalAppointments = upcomingAppointments.length > 0
                    ? upcomingAppointments
                    : sortedAppointments.slice(-1);

                setAppointments(finalAppointments);

                // Calculate weekly data based on appointments
                const weekStart = startOfWeek(today);
                const weekEnd = endOfWeek(today);
                interface WeeklyDataPoint {
                    day: string;
                    value: number;
                }

                const weeklyAppointmentCount: WeeklyDataPoint[] = sortedAppointments.reduce((acc: WeeklyDataPoint[], appointment: AppointmentInterface): WeeklyDataPoint[] => {
                    const appointmentDate: Date = parseISO(appointment.date);
                    if (isWithinInterval(appointmentDate, { start: weekStart, end: weekEnd })) {
                        const dayIndex: number = appointmentDate.getDay();
                        const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        const dayName: string = days[dayIndex];
                        const dayObj: WeeklyDataPoint | undefined = acc.find(d => d.day === dayName);
                        if (dayObj) {
                            dayObj.value += 1;
                        }
                    }
                    return acc;
                }, [...weeklyData]);

                setWeeklyData(weeklyAppointmentCount);

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


    // Fetch appointments when component mounts or status changes
    useEffect(() => {
        fetchAppointments();
    }, [activeStatus]);

    const handleExpand = (appointment: AppointmentInterface) => {
        navigate(`/appointments/details/expanded/${appointment.id}`, { state: { appointmentData: appointment } });
    };



    const handleClose = () => {
        navigate('/appointments');
    };

    // Render appointment card
    const renderAppointmentCard = (appointment: AppointmentInterface, _section: 'Up Next' | 'Later') => (
        <Box sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.100',
            mb: 2
        }}>
            {/* Top row with avatars, names, and status */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* User Avatar and Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                bgcolor: '#1A1D1F',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#FF7A00',
                                border: '2px solid #FF7A00',
                                boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                            }}
                        >
                            {appointment.vehicle.name.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Typography>
                            {`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
                        </Typography>
                    </Box>

                    {/* Divider */}
                    <Box sx={{
                        height: '28px',
                        width: '1px',
                        bgcolor: 'grey.300',
                    }} />

                    {/* Garage Avatar and Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                bgcolor: '#1A1D1F',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#FF7A00',
                                border: '2px solid #FF7A00',
                                boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                            }}
                        >
                            DG
                        </Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Handled by
                            </Typography>
                            <Typography variant="body2">
                                Dave's Garage
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <StyledChip
                    label={formatValue(appointment.status.replace('_', ' '))}
                    size="small"
                    status={appointment.status}
                />
            </Box>

            {/* Appointment Details */}
            <Box sx={{ mb: 2 }}>
                <Typography sx={{ color: '#FF7A00', mb: 0.5 }}>
                    {formatValue(appointment.service.title)}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
                </Typography>
            </Box>

            {/* Bottom row with date, location, and button */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AppointmentIcon stroke="#797676" fill='' />
                        <Typography variant="body2" color="text.secondary">
                            {format(parseISO(appointment.date), 'MMM dd, yyyy hh:mm a')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon stroke="#797676" fill='' />
                        <Typography variant="body2" color="text.secondary">
                            {appointment.locationType === 'CUSTOM' ? 'At Home' : appointment.locationType}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        borderColor: 'grey.800',
                        color: 'text.primary',
                        px: 3,
                    }}
                    // onClick={() => setIsAppointmentDrawerOpen(true)}
                    onClick={() => handleSeeDetails(appointment)}
                >
                    See Details
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Main content - Left column (8 units) */}
                <Grid item xs={12} md={8} sx={{ marginBottom: 3 }}>
                    <Grid container spacing={3}>
                        {/* Stats Cards Row */}
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <CalendarIcon fill='#FB7C37' stroke='' />
                                        <Chip
                                            label={formatValue(activeStatus.replace('_', ' '))}
                                            sx={{
                                                bgcolor: '#FFEDE6',
                                                color: '#FB7C37',
                                                padding: '15px 8px 15px 8px'
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            {appointments.length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Appointments
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/* Weekly Bar Chart Card (kept as original) */}
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip label="This Week" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: "12px 10px" }} />
                                    </Box>
                                    <Box sx={{ mt: 2, height: 100 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={weeklyData}>
                                                <CartesianGrid vertical={false} horizontal={false} />
                                                <XAxis
                                                    dataKey="day"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#666' }}
                                                />
                                                <Bar
                                                    dataKey="value"
                                                    fill="#FB7C37"
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/*  Appointments Section */}
                        <Grid item xs={12} md={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AppointmentIcon fill='#111111' stroke='' />
                                <Typography variant="h6"> Appointments</Typography>
                            </Box>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
                                                <Button
                                                    key={status}
                                                    variant={activeStatus === status ? 'contained' : 'outlined'}
                                                    size="small"
                                                    sx={{
                                                        borderRadius: 8,
                                                        padding: '5px 20px 5px 20px',
                                                        bgcolor: activeStatus === status ? '#FB7C37' : "#FFEDE6",
                                                        border: "none",
                                                        color: activeStatus === status ? 'white' : "#111111"
                                                    }}
                                                    onClick={() => setActiveStatus(status)}
                                                >
                                                    {formatValue(status.replace('_', ' '))}
                                                </Button>
                                            ))}
                                        </Box>
                                    </Stack>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Stack direction="row" spacing={-1}>
                                            <IconButton>
                                                <MenuChip fill='#FB7C37' iconfill='white' />
                                            </IconButton>
                                            <IconButton onClick={() => navigate('/appointments/list')}>
                                                <MenuListChip fill='#FFEDE6' />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Box>

                                {loading ? (
                                    <Typography>Loading...</Typography>
                                ) : errorMessage ? (
                                    <Typography color="error">{errorMessage}</Typography>
                                ) : (
                                    <>
                                        {appointments.length > 0 ? (
                                            <>
                                                <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontSize: 20, color: '#111111' }}>
                                                    Up Next
                                                </Typography>
                                                {renderAppointmentCard(appointments[0], 'Up Next')}

                                                {appointments.length > 1 && (
                                                    <>
                                                        <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontSize: 20, color: '#111111' }}>
                                                            Later
                                                        </Typography>
                                                        {appointments.slice(1).map((appointment) =>
                                                            renderAppointmentCard(appointment, 'Later')
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <Typography>No appointments found.</Typography>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Sidebar - Right column (4 units) */}
                <Grid item xs={12} md={4}>
                    <Calendar />
                </Grid>
            </Grid>

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

export default Appointment;