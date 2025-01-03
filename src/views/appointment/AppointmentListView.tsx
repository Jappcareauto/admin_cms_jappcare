import React, { useState } from 'react';
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarIcon from '../../components/Icones/calendarIcon';
import MenuChip from '../../components/Icones/MenuChip';
import MenuListChip from '../../components/Icones/MenuListChip';
import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../components/Icones/TrashIcon';
import LocationIcon from '../../components/Icones/LocationIcon';

// Interfaces
interface Appointment {
    id: number;
    user: string;
    location: string;
    service: string;
    date: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    onSite: boolean;
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

const AppointmentListView = () => {
    const [activeStatus, setActiveStatus] = useState('Not Started');
    const navigate = useNavigate();
    // Sample data
    const appointments: Appointment[] = Array(9).fill(null).map((_, i) => ({
        id: i + 1,
        user: 'Sarah Maye',
        location: "Dave's Garage",
        service: 'Porsche Taycan Turbo S',
        date: 'Oct. 20, 2024',
        status: 'Not Started',
        onSite: true
    }));

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
                {['Not Started', 'In Progress', 'Completed'].map((status) => (
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
                    { value: '07', label: 'Current Appointments' },
                    { value: '128', label: 'Total Appointments' },
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

            {/* Appointments List */}
            {appointments.map((appointment, index) => (
                <Box
                    key={appointment.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        borderBottom: index !== appointments.length - 1 ? '1px solid #E4E4E4' : 'none',
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
                            SM
                        </Avatar>
                        <Typography sx={{ fontWeight: 500 }}>{appointment.user}</Typography>
                    </Box>

                    {/* Service */}
                    <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                        {appointment.service}
                    </Typography>

                    {/* Location */}
                    <Typography sx={{ width: 150, fontSize: '0.875rem', color: 'text.secondary' }}>
                        {appointment.location}
                    </Typography>

                    {/* Date */}
                    <Box sx={{ width: 150, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon stroke='#777777' fill='' />
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            {appointment.date}
                        </Typography>
                    </Box>
                    <Box sx={{ width: 150, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon stroke='#777777' fill='' />
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            {appointment.onSite ? "On Site" : "Not On Site"}
                        </Typography>
                    </Box>

                    {/* Status */}
                    <Chip
                        label={appointment.status}
                        sx={{
                            borderRadius: 4,
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
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
                        <IconButton size="small" sx={{ color: '#FB7C37' }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}

        </Box>
    );
};

export default AppointmentListView;