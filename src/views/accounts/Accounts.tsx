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
    Button,
    Stack,
    Alert
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarIcon from '../../components/Icones/calendarIcon';
// import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../components/Icones/TrashIcon';
import UserIcon from '../../components/Icones/UserIcon';
import UsersIcon from '../../components/Icones/UsersIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import NewUserForm from '../../components/Drawer/userDetails/NewUserForm';
import ServiceProviderDetails from '../../components/Drawer/serviceProviders/ServiceProviderDetails';
import NewServiceProviderForm from '../../components/Drawer/serviceProviders/NewServiceProviderForm';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Users } from '../../interfaces/Interfaces';

// Styled Components
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

const Accounts = () => {
    const [activeTab, setActiveTab] = useState('Users');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isServiceProviderDrawerOpen, setIsServiceProviderDrawerOpen] = useState(false);
    const [isServiceProviderFormDrawerOpen, setIsServiceProviderFormDrawerOpen] = useState(false);
    const [userAccounts, setuserAccounts] = useState<Users[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [serviceCenterData, setServiceCenterData] = useState<any[]>([]);
    const ServiceCenterRequestbody = {};
    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    console.log("loading", loading);

    // console.log("userconnected", connectedUsers);
    const token = connectedUsers.accessToken

    // Add these handlers inside the Dashboard component:
    const handleNewUser = async (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({}).toString();

            const response = await JC_Services('JAPPCARE', `user/list?${params}`, 'GET', "", token);
            console.log("fecthaccountresp", response);
            if (response && response.body.meta.statusCode === 200) {
                // setSuccessMessage('Successful!');
                setuserAccounts(response.body.data.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching payments');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    const fetchServiceCenter = async () => {
        try {
            const response = await JC_Services('JAPPCARE', `service-center/list`, 'POST', ServiceCenterRequestbody, connectedUsers.accessToken);
            console.log("resp", response);
            if (response && response.body.meta.statusCode === 200) {
                // Make sure we're storing an array of properly formatted objects
                const data = Array.isArray(response.body.data.data)
                    ? response.body.data.data
                    : [];
                setServiceCenterData(data);
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

    useEffect(() => {
        fetchAccounts();
        fetchServiceCenter();
    }, []);

    // Format date function
    const formatDate = (dateString: string) => {
        if (!dateString) return "Oct 20, 2024"; // Default date
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Helper function to safely get string values with a default
    const getStringValue = (value: any, defaultValue: string = 'N/A') => {
        if (value === null || value === undefined) return defaultValue;
        return typeof value === 'string' ? value : String(value);
    };

    // Function to safely format categories
    const formatCategory = (category: any) => {
        if (!category) return 'General';
        if (typeof category === 'string') {
            return category.replace(/_/g, ' ');
        }
        return 'General';
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <UsersIcon fill='#111111' />
                    <Typography variant="h6" fontWeight={600}>
                        Accounts
                    </Typography>
                </Box>
                <Stack direction={"row"} spacing={2.5}>
                    <Button onClick={() => setIsDrawerOpen(true)}
                        variant="outlined" sx={{ borderRadius: 2, mb: 2, color: 'black', borderColor: 'black', padding: "20px 16px", width: 101, height: 40 }}>
                        Add User
                    </Button>
                    <Button onClick={() => setIsServiceProviderDrawerOpen(true)}
                        variant="outlined" sx={{ borderRadius: 2, mb: 2, color: 'black', borderColor: 'black', padding: "20px 16px", height: 40 }}>
                        Add Service Provider
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Status Filters */}
                <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                    {['Users', 'Service Providers'].map((status) => (
                        <StyledChip
                            key={status}
                            label={status}
                            className={activeTab === status ? 'active' : ''}
                            onClick={() => setActiveTab(status)}
                            sx={{
                                bgcolor: activeTab === status ? '#FB7C37' : '#fff',
                                '&:hover': {
                                    bgcolor: activeTab === status ? '#FB7C37' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {[
                    { value: userAccounts.length || '0', label: 'Users' },
                    { value: serviceCenterData.length || '0', label: 'Service Providers' },
                ].map((stat, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <UserIcon fill='#FB7C37' />
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

            {/* Error message */}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert>
            )}

            {/* Users List (Shown when activeTab is 'Users') */}
            {activeTab === 'Users' && (
                userAccounts.length > 0 ? (
                    userAccounts.map((user, index) => (
                        <Box
                            key={user.id || index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderBottom: index !== userAccounts.length - 1 ? '1px solid #E4E4E4' : 'none',
                            }}
                        >
                            {/* User Avatar */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 2 }}>
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
                                    {user.name ? user.name.substring(0, 2).toUpperCase() : 'SM'}
                                </Avatar>
                                <Typography sx={{ fontWeight: 500 }}>
                                    {getStringValue(user.name, 'Unknown User')}
                                </Typography>
                            </Box>

                            {/* User Email */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                                    {getStringValue(user.email, 'No Email')}
                                </Typography>
                            </Box>

                            {/* Date */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarIcon stroke='#777777' fill='' />
                                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                    {/* {formatDate(user.createdAt)} */}
                                    Oct 20, 2024
                                </Typography>
                            </Box>

                            {/* Status */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                    label={user.verified ? "Verified" : "Not Verified"}
                                    sx={{
                                        borderRadius: 4,
                                        bgcolor: user.verified ? "#C4FFCD" : "#F4EEFF",
                                        mr: 4,
                                        height: 34,
                                        px: 1,
                                    }}
                                />
                            </Box>

                            {/* Actions */}
                            <Box sx={{
                                display: 'flex', width: 50, justifyContent: 'flex-end', gap: 3,
                                ml: 'auto'
                            }}>
                                <IconButton size="small">
                                    <TrashIcon stroke='#141B34' fill='' />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#FB7C37' }} onClick={() => { setIsServiceProviderFormDrawerOpen(true) }}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box sx={{
                        p: 4,
                        textAlign: 'center',
                        border: '1px dashed #ccc',
                        borderRadius: 2,
                        bgcolor: '#f9f9f9'
                    }}>
                        <Typography color="text.secondary">
                            No users available. Add a new user to get started.
                        </Typography>
                    </Box>
                )
            )}

            {/* Service Providers List (Shown when activeTab is 'Service Providers') */}
            {activeTab === 'Service Providers' && (
                serviceCenterData.length > 0 ? (
                    serviceCenterData.map((provider, index) => (
                        <Box
                            key={provider.id || index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderBottom: index !== serviceCenterData.length - 1 ? '1px solid #E4E4E4' : 'none',
                            }}
                        >
                            {/* Service Provider Avatar */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: '#1A1D1F',
                                        color: '#FB7C37',
                                        border: '2px solid #FB7C37',
                                        width: 48,
                                        height: 48,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)',
                                    }}
                                >
                                    {provider.name && typeof provider.name === 'string'
                                        ? provider.name.substring(0, 2).toUpperCase()
                                        : 'SP'}
                                </Avatar>
                                <Typography sx={{ fontWeight: 500 }}>
                                    {getStringValue(provider.name, 'Unknown Provider')}
                                </Typography>
                            </Box>

                            {/* Service Provider Category */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                                    {formatCategory(provider.category)}
                                </Typography>
                            </Box>

                            {/* Date */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarIcon stroke='#777777' fill='' />
                                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                    {formatDate(getStringValue(provider.createdAt))}
                                </Typography>
                            </Box>

                            {/* Location */}
                            <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                    label={provider.location?.name || 'N/A'}
                                    sx={{
                                        borderRadius: 4,
                                        bgcolor: "#E6F7FF",
                                        mr: 4,
                                        height: 34,
                                        px: 1,
                                    }}
                                />
                            </Box>

                            {/* Actions */}
                            <Box sx={{
                                display: 'flex', width: 50, justifyContent: 'flex-end', gap: 3,
                                ml: 'auto'
                            }}>
                                <IconButton size="small">
                                    <TrashIcon stroke='#141B34' fill='' />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#FB7C37' }} onClick={() => { setIsServiceProviderFormDrawerOpen(true) }}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box sx={{
                        p: 4,
                        textAlign: 'center',
                        border: '1px dashed #ccc',
                        borderRadius: 2,
                        bgcolor: '#f9f9f9'
                    }}>
                        <Typography color="text.secondary">
                            No service providers available. Add a new service provider to get started.
                        </Typography>
                    </Box>
                )
            )}

            {/* Drawers */}
            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="User Details"
            >
                <NewUserForm
                    onSubmit={handleNewUser}
                />
            </CustomDrawer>
            <CustomDrawer
                open={isServiceProviderDrawerOpen}
                onClose={() => setIsServiceProviderDrawerOpen(false)}
                title="Service Provider Details"
            >
                <NewServiceProviderForm
                    onSubmit={() => console.log('Submitting')}
                />
            </CustomDrawer>
            <CustomDrawer
                open={isServiceProviderFormDrawerOpen}
                onClose={() => setIsServiceProviderFormDrawerOpen(false)}
                title=" Service Provider Details"
            >
                <ServiceProviderDetails
                    onSeeStatistics={() => console.log('Submitting')}
                />
            </CustomDrawer>
        </Box>
    );
};

export default Accounts;