import { useState } from 'react';
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



interface StyledCardProps {
    bgcolor?: string;
}
// Custom styled components
const StyledCard = styled(Card)<StyledCardProps>(({ theme, bgcolor }) => ({
    height: '100%',
    backgroundColor: bgcolor || theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const weeklyData = [
    { day: 'Mon', value: 70 },
    { day: 'Tue', value: 25 },
    { day: 'Wed', value: 35 },
    { day: 'Thu', value: 45 },
    { day: 'Fri', value: 30 },
    { day: 'Sat', value: 35 },
    { day: 'Sun', value: 40 },
];

const StyledChip = styled(Chip)<{ status?: string }>(({ status }) => {
    const getStatusStyle = () => {
        switch (status?.toLowerCase()) {
            case 'in progress':
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


interface AppointmentProps {
    customerName?: string;
    serviceName?: string;
    vehicleName?: string;
    date?: string;
    time?: string;
    location?: string;
    status?: string;
    serviceProvider?: string;
    onSeeDetails?: () => void;
}

const Appointment: React.FC<AppointmentProps> = () => {
    const [isAppointmentDrawerOpen, setIsAppointmentDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleExpand = () => {
        // Close the drawer and navigate to full page view
        navigate('/appointments/details/expanded');
    };
    const handleClose = () => {
        // Navigate back to the main appointments view
        navigate('/appointments');
    };



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
                                        <Chip label="In Progress" sx={{ bgcolor: '#FFEDE6', color: '#FB7C37', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            02
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Appointments
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>



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
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: 8, padding: '5px 20px 5px 20px', bgcolor: "#FFEDE6", border: "none", color: "#111111" }}
                                    >
                                        Not Started
                                    </Button>
                                    <Button
                                        variant="contained"
                                        // size="small"
                                        sx={{
                                            padding: '7px 14px',
                                            borderRadius: 8,
                                            bgcolor: '#FB7C37',
                                            // '&:hover': { bgcolor: '#FF6B3D' }
                                        }}
                                    >
                                        In Progress
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: 8, padding: '5px 20px 5px 20px', bgcolor: "#FFEDE6", border: "none", color: "#111111" }}
                                    >
                                        Completed
                                    </Button>
                                </Stack>


                                <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontSize: 20, color: '#111111' }}>
                                    Up Next
                                </Typography>
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
                                                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

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
                                                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

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

                                <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontSize: 20, color: '#111111' }}>
                                    Later
                                </Typography>

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
                                                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

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
                                                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

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
                    <Calendar />

                </Grid>
            </Grid>

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {/* Your main Appointment list component here */}
                            <CustomDrawer
                                open={isAppointmentDrawerOpen}
                                onClose={() => setIsAppointmentDrawerOpen(false)}
                                title="Appointment Details"
                            >
                                <AppointmentDetails
                                    onMarkCompleted={() => { }}
                                    onExpand={handleExpand}
                                />
                            </CustomDrawer>
                        </>
                    }
                />
                <Route
                    path="/details/expanded"
                    element={<ExpandedAppointmentDetails onClose={handleClose} />}
                />
            </Routes>

        </Box>
    );
};

export default Appointment;