/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PieChartIcon from '../../components/Icones/PieChartIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import ShopIcon from '../../components/Icones/ShopIcon';
import CalendarIcon from '../../components/Icones/calendarIcon';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ExportReport from '../../components/Drawer/exportReports/ExportReport';


// Sample data for the revenue chart

// Custom styled components
interface StyledCardProps {
    bgcolor?: string;
}
const revenueData = [
    { year: '2017', revenue: 15000 },
    { year: '2018', revenue: 5000 },
    { year: '2019', revenue: 80000 },
    { year: '2020', revenue: 10000 },
    { year: '2021', revenue: 50000 },
    { year: '2022', revenue: 18000 },
    { year: '2023', revenue: 22000 },
    { year: '2024', revenue: 100000 },

];

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
    const navigate = useNavigate();
    // Add these handlers inside the Dashboard component:
    const handleNewService = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh', overflowX: 'hidden' }}>
            <Grid container spacing={3}>
                {/* Main content - Left column (12 units) */}
                <Grid item xs={12} md={12} sx={{ marginBottom: 3 }}>
                    {/* <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: '#111111',
                            color: '#FF7A00',
                            fontSize: '22px',
                            fontWeight: 600,
                            border: '2px solid #FF7A00',
                            boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',

                        }}
                    >
                        DG
                    </Avatar> */}
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                            <Box>
                                <Typography sx={{
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    color: '#1A1D1F'
                                }}>
                                    Dave's Garage
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LocationIcon fill='#FF7A00' stroke='#FF7A00' />
                                    <Typography sx={{
                                        fontSize: '15px',
                                        color: '#6F767E'
                                    }}>
                                        Deido, Douala
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Rating value={4.5} readOnly precision={0.5} sx={{ color: '#FF7A00' }} />
                                    <Typography sx={{ color: '#FF7A00', fontSize: '15px' }}>
                                        4.5/5
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    // bgcolor: '#fff',
                                    border: '1px solid #6F767E',
                                    color: '#111111',
                                    height: 40,
                                    width: 113,
                                    padding: '20px 16px',
                                    '&:hover': {
                                        bgcolor: '#f5f5f5'
                                    }
                                }}
                                onClick={() => { navigate('/profile') }}
                            >
                                View Profile
                            </Button>
                        </Box>


                    </Box> */}

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
                                            02
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
                                            35
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>128,000 Frs</Typography>
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>182</Typography>
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
                                            5637
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
                                            26
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2">
                                        Total Revenue
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                        28,000 Frs
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {/* <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FF7A00' }} /> */}
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
                            </Box>
                            <Box sx={{ height: 300, width: '100%' }}>
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
                                            65,000 Frs
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
                                            128
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>123</Typography>
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>05</Typography>
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
                                            265,000 Frs
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
                                            28
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>26</Typography>
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>182</Typography>
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
                                            265,000 Frs
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>167</Typography>
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
                                            158
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>28</Typography>
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>182</Typography>
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
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>03</Typography>
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
