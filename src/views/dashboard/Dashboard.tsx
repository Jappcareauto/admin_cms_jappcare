import React, { useState } from 'react';
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
    Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import AppointmentIcon from '../../components/Icones/AppointmentIcon';
import PieChartIcon from '../../components/Icones/PieChartIcon';
import NotificationIcon from '../../components/Icones/NotificationIcon';
import NotifIcon from '../../components/Icones/NotifIcon';
import { ArrowDropDown, LocationOnOutlined } from '@mui/icons-material';
import DropdownIcon from '../../components/Icones/DropdownIcon';
import LocationIcon from '../../components/Icones/LocationIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import NewServiceForm from '../../components/Drawer/serviceForm/NewServiceForm';
import ShopIcon from '../../components/Icones/ShopIcon';
import AppointmentDetails from '../../components/Drawer/appointmentDetails/AppointmentDetails';

// Sample data for the revenue chart
const revenueData = [
    { name: 'Mon', value: 1500 },
    { name: 'Tues', value: 12000 },
    { name: 'Wed', value: 22000 },
    { name: 'Thurs', value: 20000 },
    { name: 'Fri', value: 25000 },
    { name: 'Sat', value: 28000 },
];

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

const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: '#FFF4ED',
    color: '#FF7A00',
    height: '34px',
    '& .MuiChip-label': {
        padding: '15px 20px 15px 20px',
        fontSize: '13px',
        fontWeight: 600,
    },
}));


const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAppointmentDrawerOpen, setIsAppointmentDrawerOpen] = useState(false);

    // Add these handlers inside the Dashboard component:
    const handleNewService = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
                                            02
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



                        {/* Emergency Request Stats */}
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>14</Typography>
                                        <Typography variant="body2" color="text.secondary">Accepted Emergency Requests</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>05</Typography>
                                        <Typography variant="body2" color="text.secondary">Rejected Emergency Requests</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/* Emergency Assistance Request */}
                        <Grid item xs={12}>
                            <StyledCard>
                                <CardContent>
                                    {/* Header - Always visible */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: isExpanded ? 2 : 0
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <NotifIcon stroke='#000000' fill='#000000' />
                                            <Typography variant="body1">
                                                Emergency Assistance Request
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={handleToggle}
                                            sx={{
                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s'
                                            }}
                                        >
                                            <DropdownIcon />
                                        </IconButton>
                                    </Box>

                                    {/* Collapsible Content */}
                                    <Collapse in={isExpanded} timeout="auto">
                                        {/* Main Content */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                            {/* Left Section */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        bgcolor: '#1A1D1F',
                                                        fontSize: '16px',
                                                        fontWeight: 600,
                                                        color: '#FF7A00',
                                                        border: '2px solid #FF7A00',
                                                    }}
                                                >
                                                    SM
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                        Sarah Maye
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Porsche Taycan Turbo S
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Right Section */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <StyledChip
                                                    label="Break Failure"
                                                    size="small"
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    7000 Frs
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    12km Away
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Service Provider */}
                                        <Box sx={{ mt: 0.5, ml: 8 }}>
                                            <Typography variant="caption" color="text.secondary">
                                                handled by{' '}
                                                <Box component="span" sx={{ color: 'text.primary' }}>
                                                    Dave's Garage
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </Collapse>
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
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: 8, padding: '5px 20px 5px 20px' }}
                                    >
                                        Not Started
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            padding: '5px 20px 5px 20px',
                                            borderRadius: 8,
                                            bgcolor: '#FF7F50',
                                            '&:hover': { bgcolor: '#FF6B3D' }
                                        }}
                                    >
                                        In Progress
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: 8, padding: '5px 20px 5px 20px' }}
                                    >
                                        Completed
                                    </Button>
                                </Stack>

                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'background.paper',
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'grey.100',
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
                                                    }}
                                                >
                                                    JM
                                                </Avatar>
                                                <Typography>James Mann</Typography>
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

                                        <StyledChip label="In Progress" size="small" />
                                    </Box>

                                    {/* Appointment Details */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ color: '#FF7A00', mb: 0.5 }}>
                                            Body shop appointment
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                            Porsche Taycan Turbo S
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
                                                    Oct, 20, 2024 10am
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationIcon stroke="#797676" fill='' />
                                                <Typography variant="body2" color="text.secondary">
                                                    At Home
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
                                            onClick={() => setIsAppointmentDrawerOpen(true)}

                                        >
                                            See Details
                                        </Button>
                                    </Box>
                                </Box>
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
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body2" sx={{ bgcolor: '#FF7F50', color: 'white', px: 2, borderRadius: 8, fontSize: '0.75rem' }}>
                                            28,000Frs
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">Revenue</Typography>
                                    </Box>
                                    <Box sx={{ height: 120, width: '100%' }}>
                                        <ResponsiveContainer>
                                            <LineChart data={revenueData}>
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                                <Line type="monotone" dataKey="value" stroke="#FF7F50" strokeWidth={2} dot={{ fill: '#FF7F50', r: 4 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        {/* Services Section */}
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>Services</Typography>
                            <Stack spacing={2}>
                                <ServiceItem>
                                    <Box>
                                        <Typography variant="h6">Vehicle Reports</Typography>
                                    </Box>
                                    <Box component="img" src="src\assets\Group 37097.svg" alt="Vehicle Reports" sx={{ width: 200, height: 120 }} />
                                </ServiceItem>

                                <ServiceItem>
                                    <Box>
                                        <Typography variant="h6">GPS Locator</Typography>
                                    </Box>
                                    <Box component="img" src="src\assets\Group 37102.svg" alt="GPS Locator" sx={{ width: 200, height: 120 }} />
                                </ServiceItem>

                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="outlined"
                                        className='w-fit rounded-full px-3'
                                        onClick={() => setIsDrawerOpen(true)}
                                        sx={{
                                            color: 'black',
                                            borderColor: 'black',
                                            '&:hover': {
                                                color: '#FF7A00',
                                            },
                                        }}


                                    >
                                        New service
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Orders Section */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ShopIcon fill='#000' stroke='#000' />
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
                    onCancel={() => setIsDrawerOpen(false)}
                />
            </CustomDrawer>
            <CustomDrawer
                open={isAppointmentDrawerOpen}
                onClose={() => setIsAppointmentDrawerOpen(false)}
                title="Appointment Details"
            >
                <AppointmentDetails
                    onMarkCompleted={() => handleNewService}
                    onExpand={() => setIsAppointmentDrawerOpen(false)}
                />
            </CustomDrawer>
        </Box>
    );
};

export default Dashboard;