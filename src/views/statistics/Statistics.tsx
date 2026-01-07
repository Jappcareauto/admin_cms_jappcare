/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Button,
    // CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PieChartIcon from '../../components/Icones/PieChartIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import ShopIcon from '../../components/Icones/ShopIcon';
import CalendarIcon from '../../components/Icones/calendarIcon';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ExportReport from '../../components/Drawer/exportReports/ExportReport';
import { JC_Services } from '../../services';


// Sample data for the revenue chart

// Custom styled components
interface StyledCardProps {
    bgcolor?: string;
}
// const revenueData = [
//     { year: '2017', revenue: 15000 },
//     { year: '2018', revenue: 5000 },
//     { year: '2019', revenue: 80000 },
//     { year: '2020', revenue: 10000 },
//     { year: '2021', revenue: 50000 },
//     { year: '2022', revenue: 18000 },
//     { year: '2023', revenue: 22000 },
//     { year: '2024', revenue: 100000 },

// ];

interface StatisticsData {
    overview: {
        appointments: number;
        orders: number;
        weeklyRevenue: number;
        vinRequests: number;
        totalUsers: number;
        emergencyRequests: number;
    };
    revenueChart: Array<{ year: string; revenue: number }>;
    appointmentStats: {
        totalRevenue: number;
        totalAppointments: number;
        completedAppointments: number;
        canceledAppointments: number;
    };
    emergencyStats: {
        totalRevenue: number;
        totalRequests: number;
        acceptedRequests: number;
        rejectedRequests: number;
    };
    vinStats: {
        totalRevenue: number;
        totalRequests: number;
        fromUsers: number;
        fromServiceProviders: number;
        successfulRequests: number;
        unsuccessfulRequests: number;
    };
}



const StyledCard = styled(Card)<StyledCardProps>(({ theme, bgcolor }) => ({
    height: '100%',
    backgroundColor: bgcolor || theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

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




const Statistics = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
const [statisticsData, setStatisticsData] = useState<StatisticsData>({
        overview: {
            appointments: 0,
            orders: 0,
            weeklyRevenue: 0,
            vinRequests: 0,
            totalUsers: 0,
            emergencyRequests: 0,
        },
        revenueChart: [],
        appointmentStats: {
            totalRevenue: 0,
            totalAppointments: 0,
            completedAppointments: 0,
            canceledAppointments: 0,
        },
        emergencyStats: {
            totalRevenue: 0,
            totalRequests: 0,
            acceptedRequests: 0,
            rejectedRequests: 0,
        },
        vinStats: {
            totalRevenue: 0,
            totalRequests: 0,
            fromUsers: 0,
            fromServiceProviders: 0,
            successfulRequests: 0,
            unsuccessfulRequests: 0,
        },
    });


    const navigate = useNavigate();
    // Add these handlers inside the Dashboard component:
    const handleNewService = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };
        const connectedUsers = JSON.parse(localStorage.getItem('connectedUsers') || '{}');

         // Fetch Overview Statistics
    const fetchOverviewStats = async () => {
        try {
            const response = await JC_Services(
                'JAPPCARE',
                'statistics/overview',
                'POST',
                { period: 'week' }, // Adjust request body as needed
                connectedUsers.accessToken
            );

            if (response && response.body.meta.statusCode === 200) {
                const data = response.body.data;
                setStatisticsData(prev => ({
                    ...prev,
                    overview: {
                        appointments: data.appointments || 0,
                        orders: data.orders || 0,
                        weeklyRevenue: data.weeklyRevenue || 0,
                        vinRequests: data.vinRequests || 0,
                        totalUsers: data.totalUsers || 0,
                        emergencyRequests: data.emergencyRequests || 0,
                    },
                }));
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('No Data Found');
            }
        } catch (error) {
            console.error('Error fetching overview stats:', error);
            setErrorMessage('Network Error Try Again Later!!!!');
        }
    };

    // Fetch Revenue Chart Data
    const fetchRevenueChart = async () => {
        try {
            const response = await JC_Services(
                'JAPPCARE',
                'statistics/revenue-chart',
                'POST',
                { years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
                connectedUsers.accessToken
            );

            if (response && response.body.meta.statusCode === 200) {
                const data = response.body.data;
                setStatisticsData(prev => ({
                    ...prev,
                    revenueChart: Array.isArray(data) ? data : [],
                }));
            }
        } catch (error) {
            console.error('Error fetching revenue chart:', error);
        }
    };

    // Fetch Appointment Statistics
    const fetchAppointmentStats = async () => {
        try {
            const response = await JC_Services(
                'JAPPCARE',
                'statistics/appointments',
                'POST',
                { period: 'week' },
                connectedUsers.accessToken
            );

            if (response && response.body.meta.statusCode === 200) {
                const data = response.body.data;
                setStatisticsData(prev => ({
                    ...prev,
                    appointmentStats: {
                        totalRevenue: data.totalRevenue || 0,
                        totalAppointments: data.totalAppointments || 0,
                        completedAppointments: data.completedAppointments || 0,
                        canceledAppointments: data.canceledAppointments || 0,
                    },
                }));
            }
        } catch (error) {
            console.error('Error fetching appointment stats:', error);
        }
    };

    // Fetch Emergency Statistics
    const fetchEmergencyStats = async () => {
        try {
            const response = await JC_Services(
                'JAPPCARE',
                'statistics/emergency',
                'POST',
                { period: 'week' },
                connectedUsers.accessToken
            );

            if (response && response.body.meta.statusCode === 200) {
                const data = response.body.data;
                setStatisticsData(prev => ({
                    ...prev,
                    emergencyStats: {
                        totalRevenue: data.totalRevenue || 0,
                        totalRequests: data.totalRequests || 0,
                        acceptedRequests: data.acceptedRequests || 0,
                        rejectedRequests: data.rejectedRequests || 0,
                    },
                }));
            }
        } catch (error) {
            console.error('Error fetching emergency stats:', error);
        }
    };

    // Fetch VIN Statistics
    const fetchVinStats = async () => {
        try {
            const response = await JC_Services(
                'JAPPCARE',
                'statistics/vin-requests',
                'POST',
                { period: 'week' },
                connectedUsers.accessToken
            );

            if (response && response.body.meta.statusCode === 200) {
                const data = response.body.data;
                setStatisticsData(prev => ({
                    ...prev,
                    vinStats: {
                        totalRevenue: data.totalRevenue || 0,
                        totalRequests: data.totalRequests || 0,
                        fromUsers: data.fromUsers || 0,
                        fromServiceProviders: data.fromServiceProviders || 0,
                        successfulRequests: data.successfulRequests || 0,
                        unsuccessfulRequests: data.unsuccessfulRequests || 0,
                    },
                }));
            }
        } catch (error) {
            console.error('Error fetching VIN stats:', error);
        }
    };

    // Fetch all statistics
    const fetchAllStatistics = async () => {
        // setLoading(true);
        setErrorMessage('');
        
        try {
            await Promise.all([
                fetchOverviewStats(),
                fetchRevenueChart(),
                fetchAppointmentStats(),
                fetchEmergencyStats(),
                fetchVinStats(),
            ]);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        if (connectedUsers.accessToken) {
            fetchAllStatistics();
        }
    }, [connectedUsers.accessToken]);

   

    // if (loading) {
    //     return (
    //         <Box sx={{ 
    //             display: 'flex', 
    //             justifyContent: 'center', 
    //             alignItems: 'center', 
    //             minHeight: '100vh' 
    //         }}>
    //             <CircularProgress sx={{ color: '#FB7C37' }} />
    //         </Box>
    //     );
    // }

    if (errorMessage) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography color="error">{errorMessage}</Typography>
                <Button 
                    variant="contained" 
                    onClick={fetchAllStatistics}
                    sx={{ bgcolor: '#FB7C37' }}
                >
                    Retry
                </Button>
            </Box>
        );
    }



    return (
        <Box sx={{ p: 3, minHeight: '100vh', overflowX: 'hidden' }}>
            <Grid container spacing={3}>
                {/* Main content - Left column (12 units) */}
                <Grid item xs={12} md={12} sx={{ marginBottom: 3 }}>
                   

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6">Overview</Typography>
                        <Box sx={{ gap: 1, display: 'flex' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#111111',
                                    border: '1px solid #6F767E',
                                    color: '#ffffff',
                                    height: 40,
                                    padding: '20px 16px',
                                    '&:hover': {
                                        color: '1px solid rgb(236, 115, 44)',
                                        border: 'none'
                                    }
                                }}
                                onClick={() => { setIsDrawerOpen(true) }}
                            >
                                Download Reports
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#111111',
                                    border: '1px solid #6F767E',
                                    color: '#ffffff',
                                    height: 40,
                                    padding: '20px 16px',
                                    '&:hover': {
                                        color: '1px solid rgb(236, 115, 44)',
                                        border: 'none'
                                    }
                                }}
                                onClick={() => { navigate("/payments") }}
                            >
                                Payments
                            </Button>
                        </Box>

                    </Box>


                    <Grid container spacing={3}>
                        {/* Stats Cards Row */}
                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <CalendarIcon fill='#FB7C37' stroke='' />
                                        <Chip label="In Progress" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                                 {statisticsData.overview.appointments.toLocaleString()}

                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Appointments
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <ShopIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                                  {statisticsData.overview.orders.toLocaleString()}

                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Orders
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>



                        {/* Emergency Request Stats */}
                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}> {statisticsData.vinStats.totalRevenue.toLocaleString()} Frs</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Revenue</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.vinStats.totalRequests.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>VIN Request Made</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                           {statisticsData.vinStats.fromUsers.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Total Users
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            {statisticsData.emergencyStats.totalRequests.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Emergency Request
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>


                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <StyledCard>
                        <CardContent>
                             <Box>
                                    <Typography color="text.secondary" variant="body2">
                                        Total Revenue
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                        {statisticsData.revenueChart.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()} Frs
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Chip
                                            label="Revenue"
                                            size="small"
                                            sx={{
                                                bgcolor: '#FFEDE6',
                                                color: '#FB7C37',
                                                padding: '15px 8px 15px 8px',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </Box>
                                    <Chip
                                        label="This Week"
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(175, 169, 169, 0.2)',
                                            color: 'text.secondary',
                                            padding: '15px 8px 15px 8px'
                                        }}
                                    />
                                </Box>
                            
                            {/* <Box sx={{ height: 300, width: '100%' }}>
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
                                            dataKey="year"
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
                            </Box> */}

                             <Box sx={{ height: 300, width: '100%' }}>
                                <ResponsiveContainer>
                                    <AreaChart
                                        data={statisticsData.revenueChart.length > 0 ? statisticsData.revenueChart : [{ year: '2024', revenue: 0 }]}
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
                                            dataKey="year"
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



            </Grid>

            {/* Detailed Statistics */}
            <Box>

                <Box sx={{ mt: 4, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PieChartIcon fill='#FF7A00' stroke='' />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Stats Breakdown by Category
                    </Typography>
                </Box>

                {/* Appointment Stats */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6">Appointment Stats</Typography>
                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />

                    </Box>
                    <Grid container spacing={3}>
                        {/* Stats Cards Row */}
                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <CalendarIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            {statisticsData.appointmentStats.totalRevenue.toLocaleString()} Frs

                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Total Revenue
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <CalendarIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                           {statisticsData.appointmentStats.totalAppointments.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Total Appointments
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <CalendarIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.appointmentStats.completedAppointments.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Completed Appointments</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <CalendarIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.appointmentStats.canceledAppointments.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Canceled Appointments</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                    </Grid>

                </Box>

                {/* Emergency Stats */}
                <Box sx={{ mt: 3 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6">Emergency Stats</Typography>
                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />

                    </Box>
                    <Grid container spacing={3}>
                        {/* Stats Cards Row */}
                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                           {statisticsData.emergencyStats.totalRevenue.toLocaleString()} Frs
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Total Revenue
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            {statisticsData.emergencyStats.totalRequests.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Emergency Request
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}> {statisticsData.emergencyStats.acceptedRequests.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Accepted Request</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.emergencyStats.rejectedRequests.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Rejected Request</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                    </Grid>

                </Box>

                {/* VIN Request */}
                <Box sx={{ mt: 3 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6">Vin Requests</Typography>
                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />

                    </Box>
                    <Grid container spacing={3}>
                        {/* Stats Cards Row */}
                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            {statisticsData.vinStats.totalRevenue.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            Total Revenue
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.vinStats.totalRequests}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Total Request</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            {statisticsData.vinStats.fromUsers.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>
                                            From Users
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>



                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.vinStats.fromServiceProviders.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>From Service Providers</Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.vinStats.successfulRequests.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Successful VIN Request </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{statisticsData.vinStats.unsuccessfulRequests.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="#FB7C37" sx={{ mt: 1 }}>Unsucessful VIN Request </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>


                    </Grid>

                </Box>

            </Box>
            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Export Data"
            >
                <ExportReport
                    onSubmit={handleNewService}
                />
            </CustomDrawer>

        </Box>
    );
};


export default Statistics
