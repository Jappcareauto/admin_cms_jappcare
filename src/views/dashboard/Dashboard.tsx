/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
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
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { XAxis, ResponsiveContainer, AreaChart, YAxis, Tooltip, Area } from 'recharts';
import AppointmentIcon from '../../components/Icones/AppointmentIcon';
import PieChartIcon from '../../components/Icones/PieChartIcon';
import LocationIcon from '../../components/Icones/LocationIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import NewServiceForm from '../../components/Drawer/serviceForm/NewServiceForm';
import ShopIcon from '../../components/Icones/ShopIcon';
import AppointmentDetails from '../../components/Drawer/appointmentDetails/AppointmentDetails';
import Images from '../../assets/Images/Images';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { AppointmentInterface, ServiceData } from '../../interfaces/Interfaces';
import { Close } from '@mui/icons-material';
import { formatValue } from '../../tools/formatValue';
import { format, parseISO } from 'date-fns';


// Sample data for the revenue chart
const revenueData = [
    { name: 'Mon', revenue: 1500 },
    { name: 'Tues', revenue: 12000 },
    { name: 'Wed', revenue: 22000 },
    { name: 'Thurs', revenue: 20000 },
    { name: 'Fri', revenue: 25000 },
    { name: 'Sat', revenue: 28000 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{
                bgcolor: 'background.paper',
                p: 1,
                borderRadius: 1,
                boxShadow: 3,
            }}>
                <Typography variant="body2">
                    {`${payload[0].value.toLocaleString()} Frs`}
                </Typography>
            </Box>
        );
    }
    return null;
};
// Custom styled components
interface StyledCardProps {
    bgcolor?: string;
}

const StyledCard = styled(Card)<StyledCardProps>(({ theme, bgcolor }) => ({
    height: '100%',
    backgroundColor: bgcolor || theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

// Scrollable container for services
const ScrollableServicesContainer = styled(Box)(({ }) => ({
    maxHeight: '300px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#c1c1c1',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#a8a8a8',
        },
    },
}));

const ServiceItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#F4EEFF',
    borderRadius: 16,
    marginBottom: theme.spacing(2),
    '&:last-child': {
        marginBottom: 0
    }
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



const Dashboard = () => {
    // const [isExpanded, setIsExpanded] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAppointmentDrawerOpen, setIsAppointmentDrawerOpen] = useState(false);
    const [serviceData, setServiceData] = useState<ServiceData[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);
    const serviceRequestbody = {}
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const [Allappointments, setAllAppointments] = useState<AppointmentInterface[]>([]);
    const [activeStatus, setActiveStatus] = useState('IN_PROGRESS');




    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    // Add these handlers inside the Dashboard component:
    const handleNewService = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };

    const fetchService = async () => {
        try {

            const response = await JC_Services('JAPPCARE', `service/list`, 'POST', serviceRequestbody, connectedUsers.accessToken);
            console.log("service resp", response);
            if (response && response.body.meta.statusCode === 200) {
                setServiceData(response.body.data); // Display all services instead of slicing

            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('No Data Found');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

    };

    const fetchAppointments = async () => {
        try {
            const response = await JC_Services('JAPPCARE', `appointment/list`, 'POST', {}, connectedUsers.accessToken);
            console.log("appointment resp", response);

            if (response && response.body.meta.statusCode === 200) {
                // Filter appointments by status
                const filteredAppointments = response.body.data.filter(
                    (appointment: AppointmentInterface) => appointment.status === activeStatus
                );

                // Sort appointments by date
                const sortedAppointments = filteredAppointments.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                );

                setAppointments(sortedAppointments.slice(0, 2)); // Limit to 2 appointments
                setAllAppointments(response.body.data); // Store all appointments for potential future use
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('No Appointments Found');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
    };


    useEffect(() => {
        fetchService();
        fetchAppointments();
    }, [activeStatus]);

    const handleCloseMessage = () => {
        setErrorMessage('');
    };

    const handleSeeDetails = (appointment: AppointmentInterface) => {
        setSelectedAppointment(appointment);
        setIsAppointmentDrawerOpen(true);
    };

    const renderAppointmentCard = (appointment: AppointmentInterface) => (
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
                            {appointment.vehicle.detail.make.substring(0, 2).toUpperCase()}
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
                            {appointment.serviceCenter.name.substring(0, 2).toUpperCase()}

                        </Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Handled by
                            </Typography>
                            <Typography variant="body2">
                                {appointment.serviceCenter.name}
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
                            {formatValue(appointment.locationType === 'CUSTOM' ? 'At Home' : appointment.locationType)}
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
                    onClick={() => handleSeeDetails(appointment)}
                >
                    See Details
                </Button>
            </Box>
        </Box>
    );
    return (
        <Box sx={{ p: 3, minHeight: '100vh', overflowX: 'hidden' }}>
            <Grid container spacing={3}>
                {/* Main content - Left column (8 units) */}
                <Grid item xs={12} md={8} sx={{ marginBottom: 3 }}>
                    <Grid container spacing={3}>
                        {/* Stats Cards Row */}
                        <Grid item xs={12} md={6}>
                            <StyledCard bgcolor="#FB7C37">
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <AppointmentIcon fill='white' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="white" sx={{ fontWeight: 'bold' }}>
                                            {Allappointments.length}
                                        </Typography>
                                        <Typography variant="body1" color="white" sx={{ mt: 1 }}>
                                            Appointments
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            28,000 Frs
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Revenue
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/* Recent Appointments Section */}
                        <Grid item xs={12} md={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AppointmentIcon fill='#111111' stroke='' />
                                <Typography variant="h6">Recent Appointments</Typography>
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
                                </Box>

                                {errorMessage ? (
                                    <Typography color="error">{errorMessage}</Typography>
                                ) : (
                                    <>
                                        {appointments.length > 0 ? (
                                            appointments.map((appointment) => renderAppointmentCard(appointment))
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
                    <Stack spacing={3}>

                        {/* Revenue Chart */}
                        <Grid item xs={12} height={300} >
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>

                                        <Typography variant="body2" color="text.secondary">Revenue</Typography>
                                    </Box>
                                    <Box sx={{ height: 120, width: '100%' }}>
                                        <ResponsiveContainer>
                                            <AreaChart
                                                data={revenueData}
                                                margin={{
                                                    top: 10,
                                                    right: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#FF7A00" stopOpacity={0.2} />
                                                        <stop offset="100%" stopColor="#FF7A00" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#6F767E', fontSize: 12 }}
                                                />
                                                <YAxis hide />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#FF7A00"
                                                    strokeWidth={2}
                                                    fill="url(#colorRevenue)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        {/* Services Section */}
                        <Box>
                            {errorMessage && (
                                <Alert
                                    severity="error"
                                    sx={{ mb: 2 }}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={handleCloseMessage}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {errorMessage}
                                </Alert>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Services</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Scroll to see all
                                </Typography>
                            </Box>

                            {/* Scrollable container for services */}
                            <ScrollableServicesContainer>
                                <Stack spacing={2}>
                                    {serviceData.map((service, index) => (
                                        <ServiceItem key={service.id}>
                                            <Box>
                                                <Typography variant="h6">
                                                    {formatValue(service.title)}
                                                </Typography>
                                            </Box>
                                            <Box
                                                component="img"
                                                src={index % 2 === 0 ? Images.vehiclereport : Images.GPSLocator}
                                                alt={service.title}
                                                sx={{ width: 200, height: 120 }}
                                            />
                                        </ServiceItem>
                                    ))}
                                </Stack>
                            </ScrollableServicesContainer>

                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                    mt: 2,
                                    borderColor: 'grey.800',
                                    color: 'text.primary',
                                    px: 3,
                                }}
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                New Service
                            </Button>
                        </Box>

                        {/* Orders Section */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ShopIcon fill='#000' stroke='' />
                                <Typography variant="h6" sx={{ ml: 1 }}>Orders</Typography>

                            </Box>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        {/* Left Section */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    bgcolor: '#1A1D1F',
                                                    fontSize: '16px',
                                                    fontWeight: 600,
                                                    color: '#FF7A00',
                                                    border: '2px solid #FF7A00',
                                                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

                                                }}
                                            >
                                                JM
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    James Mann
                                                </Typography>
                                            </Box>


                                        </Box>

                                        <Box sx={{ alignItems: 'center', justifyContent: 'space-between' }}>

                                            <Box sx={{ alignItems: 'center' }}>

                                                <Typography variant="body2" color="text.secondary">
                                                    Service
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500}>
                                                    Vehicle Report
                                                </Typography>
                                            </Box>

                                            {/* Right Section */}
                                            <Box sx={{ alignSelf: 'flex-end' }}>
                                                <Typography variant="body1" fontWeight={600} color="#FF7A00">
                                                    5,000 Frs
                                                </Typography>
                                            </Box>
                                        </Box>



                                    </Box>
                                </CardContent>


                            </StyledCard>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>

            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Create service"
            >
                <NewServiceForm
                    onSubmit={handleNewService}
                />
            </CustomDrawer>
            <CustomDrawer
                open={isAppointmentDrawerOpen}
                onClose={() => setIsAppointmentDrawerOpen(false)}
                title="Appointment Details"
            >
                {selectedAppointment && (
                    <AppointmentDetails
                        appointment={selectedAppointment}
                        onMarkCompleted={() => { }}
                        onExpand={() => { }}
                    />
                )}
            </CustomDrawer>
        </Box>
    );
};

export default Dashboard;