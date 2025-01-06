import { useState } from 'react';
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
    Stack
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

// Interfaces
interface Users {
    id: number;
    user: string;
    email: string;
    date: string;
    status: 'Users' | 'Service Providers';
    verified: boolean;
}

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
    const [activeStatus, setActiveStatus] = useState('Not Started');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isServiceProviderDrawerOpen, setIsServiceProviderDrawerOpen] = useState(false);
    const [isServiceProviderFormDrawerOpen, setIsServiceProviderFormDrawerOpen] = useState(false);

    // Add these handlers inside the Dashboard component:
    const handleNewUser = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };
    // const navigate = useNavigate();
    // Sample data
    const users: Users[] = [
        {
            id: 1,
            user: "Sarah Maye",
            email: "mannjames@gmail.com",
            date: "Oct 20, 2024",
            status: 'Users',
            verified: true,
        },
        {
            id: 2,
            user: "Sarah Brown",
            email: "brownsarah@gmail.com",
            date: "Nov 15, 2023",
            status: 'Users',
            verified: false,
        },
        {
            id: 3,
            user: "David Johnson",
            email: "johnsondavid@gmail.com",
            date: "Dec 10, 2025",
            status: 'Users',
            verified: true,
        },
        {
            id: 4,
            user: "Emily Wilson",
            email: "wilsone@gmail.com",
            date: "Jan 5, 2024",
            status: 'Users',
            verified: false,
        },
        {
            id: 5,
            user: "Michael Lee",
            email: "leemichael@gmail.com",
            date: "Feb 18, 2023",
            status: 'Users',
            verified: false,
        },
        {
            id: 6,
            user: "Anna Garcia",
            email: "garciaanna@gmail.com",
            date: "Mar 22, 2025",
            status: 'Users',
            verified: true,
        },
        {
            id: 7,
            user: "Daniel Martinez",
            email: "martinezdaniel@gmail.com",
            date: "Apr 30, 2023",
            status: 'Users',
            verified: false,
        },
        {
            id: 8,
            user: "Olivia Rodriguez",
            email: "rodriguezolivia@gmail.com",
            date: "May 7, 2024",
            status: 'Users',
            verified: true,
        },
        {
            id: 9,
            user: "William Thomas",
            email: "thomaswilliam@gmail.com",
            date: "Jun 12, 2023",
            status: 'Users',
            verified: false,
        },
    ];

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

            {/* Status Filters */}
            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                {['Users', 'Service Providers'].map((status) => (
                    <StyledChip
                        key={status}
                        label={status}
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
                    { value: '5685', label: 'Users' },
                    { value: '128', label: 'Service Providers' },
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

            {/* Appointments List */}
            {users.map((user, index) => (
                <Box
                    key={user.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        borderBottom: index !== users.length - 1 ? '1px solid #E4E4E4' : 'none',
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
                            SM
                        </Avatar>
                        <Typography sx={{ fontWeight: 500 }}>{user.user}</Typography>
                    </Box>

                    {/* User */}
                    <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                            {user.email}
                        </Typography>
                    </Box>


                    {/* Date */}
                    <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon stroke='#777777' fill='' />
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            {user.date}
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
            ))}


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
                title="New Service Provider"
            >
                <ServiceProviderDetails
                    onSeeStatistics={() => console.log('Submitting')}
                />
            </CustomDrawer>
        </Box>
    );
};

export default Accounts
