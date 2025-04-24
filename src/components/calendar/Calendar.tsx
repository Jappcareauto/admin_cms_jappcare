import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    Tooltip,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ExpendIcon from '../Icones/ExpendIcon';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    format,
    parseISO,
    startOfWeek,
    endOfWeek,
    addWeeks,
    subWeeks,
    isWithinInterval,
    isToday
} from 'date-fns';
import { AppointmentInterface } from '../../interfaces/Interfaces';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { JC_Services } from '../../services';

// (Previous styled components remain the same)
const CalendarContainer = styled(Box)({
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
});

const CalendarHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
});

const CalendarGrid = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
});

interface DayCellProps {
    isToday?: boolean;
    isSelected?: boolean;
    hasAppointment?: boolean;
}


const DayCell = styled(Box)<DayCellProps>(({ isSelected, hasAppointment }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: isSelected ? '32px' : '8px',
    cursor: 'pointer',
    backgroundColor: isSelected
        ? '#FB7C37'
        : hasAppointment
            ? 'rgba(251, 124, 55, 0.1)'
            : 'transparent',
    color: isSelected ? '#fff' : '#1A1D1F',
    '& .day': {
        fontSize: '14px',
        color: isSelected ? '#fff' : '#6F767E',
        marginBottom: '4px',
    },
    '& .date': {
        fontSize: '16px',
        fontWeight: isSelected ? 600 : 400,
    },
}));

// const EventsList = styled(Box)({
//     marginTop: '24px',
// });

interface EventCardProps {
    color: string;
}

const EventCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'color',
})<EventCardProps>(({ color }) => ({
    padding: '10px',
    backgroundColor: `${color}15`,
    borderRadius: '12px',
    marginBottom: '12px',
    gap: '12px',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        backgroundColor: color,
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
    },
}));

const Calendar: React.FC = () => {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const navigate = useNavigate();

    // Get token from Redux store
    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state
    );
    const token = connectedUsers.accessToken;

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `appointment/list`, 'POST', {}, token);

            if (response && response.body.meta.statusCode === 200) {
                // Filter appointments for the current week
                const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday
                const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 }); // Sunday

                const filteredAppointments = response.body.data.filter(
                    (appointment: AppointmentInterface) => {
                        const appointmentDate = parseISO(appointment.date);
                        return isWithinInterval(appointmentDate, { start: weekStart, end: weekEnd });
                    }
                );

                setAppointments(filteredAppointments);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error. Try Again Later!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchAppointments();
    }, [currentWeek]);

    // Generate week data with appointments check
    const generateWeekData = () => {
        const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });

        return Array.from({ length: 7 }, (_, index) => {
            const currentDate = new Date(weekStart);
            currentDate.setDate(weekStart.getDate() + index);

            // Check if the current date has any appointments
            const hasAppointment = appointments.some(
                appointment =>
                    format(parseISO(appointment.date), 'yyyy-MM-dd') ===
                    format(currentDate, 'yyyy-MM-dd')
            );

            return {
                day: format(currentDate, 'EEE'),
                date: format(currentDate, 'dd'),
                fullDate: currentDate,
                isToday: isToday(currentDate),
                isSelected: format(currentDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'),
                hasAppointment
            };
        });
    };

    // Filter appointments for selected date
    const getAppointmentsForSelectedDate = () => {
        return appointments.filter(
            appointment =>
                format(parseISO(appointment.date), 'yyyy-MM-dd') ===
                format(selectedDate, 'yyyy-MM-dd')
        );
    };

    // Navigate between weeks
    const handlePreviousWeek = () => {
        setCurrentWeek(prevWeek => subWeeks(prevWeek, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
    };

    // Render loading state
    if (loading) {
        return (
            <CalendarContainer>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            </CalendarContainer>
        );
    }

    // Render error state
    if (errorMessage) {
        return (
            <CalendarContainer>
                <Typography color="error" variant="body1">
                    {errorMessage}
                </Typography>
            </CalendarContainer>
        );
    }

    // Week data with appointment information
    const weekData = generateWeekData();
    const selectedDateAppointments = getAppointmentsForSelectedDate();

    return (
        <CalendarContainer>
            <CalendarHeader>
                <Box>
                    <Typography variant="h5" color="#FB7C37" fontWeight={600}>
                        {format(currentWeek, 'MMMM yyyy')}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={handlePreviousWeek}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton size="small" onClick={handleNextWeek}>
                        <ArrowForward />
                    </IconButton>
                    <Tooltip title="Appointments Calendar">
                        <IconButton size="small" onClick={() => navigate('/calendar')}>
                            <ExpendIcon fill='#111111' />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CalendarHeader>

            <CalendarGrid>
                {weekData.map((item, index) => (
                    <DayCell
                        key={index}
                        isSelected={item.isSelected}
                        hasAppointment={item.hasAppointment}
                        onClick={() => setSelectedDate(item.fullDate)}
                    >
                        <Typography className="day">{item.day}</Typography>
                        <Typography className="date">{item.date}</Typography>
                    </DayCell>
                ))}
            </CalendarGrid>

            <Button
                variant="outlined"
                sx={{
                    mt: 2,
                    borderRadius: '20px',
                    color: '#6F767E',
                    borderColor: '#E6E8EC',
                    '&:hover': {
                        borderColor: '#FB7C37',
                        color: '#FB7C37',
                    }
                }}
                onClick={() => navigate('/appointments/calendarviews')}
            >
                Show Full Calendar
            </Button>

            {selectedDateAppointments.length > 0 ? (
                <Box mt={2}>
                    <Typography variant="h6" mb={2}>
                        Appointments on {format(selectedDate, 'EEEE, MMMM dd')}
                    </Typography>
                    {selectedDateAppointments.map((appointment, index) => (
                        <EventCard key={index} color={getStatusColor(appointment.status)}>
                            {/* Existing event card content remains the same */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar
                                        sx={{
                                            width: 38,
                                            height: 38,
                                            bgcolor: '#1A1D1F',
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            color: '#FF7A00',
                                            border: '2px solid #FF7A00',
                                            boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                                        }}
                                    >
                                        {appointment.vehicle.name.substring(0, 2).toUpperCase()}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
                                        {`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="#111111"
                                    sx={{ fontSize: '13px' }}
                                >
                                    {appointment.locationType.replace('_', ' ')}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        mb: 0.5
                                    }}
                                >
                                    {appointment.service.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="#111111"
                                    sx={{ fontSize: '13px' }}
                                >
                                    {`${format(parseISO(appointment.date), 'hh:mm a')} - ${format(parseISO(appointment.date), 'MMM dd, yyyy')}`}
                                </Typography>
                            </Box>
                        </EventCard>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="textSecondary" mt={2}>
                    No appointments on this date
                </Typography>
            )}
        </CalendarContainer>
    );
};

export default Calendar;

// Helper function for status color (keep from previous implementation)
const getStatusColor = (status: string) => {
    switch (status) {
        case 'IN_PROGRESS': return '#FB7C37'; // Orange
        case 'COMPLETED': return '#05CD99'; // Green
        case 'SCHEDULED': return '#7B61FF'; // Purple
        default: return '#FF6161'; // Red
    }
};