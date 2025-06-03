import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    styled,
    Paper,
    IconButton,
    CircularProgress,
    Select,
    SelectChangeEvent,
    MenuItem,

} from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
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
    isSameDay,
    startOfMonth,
    endOfMonth,

} from 'date-fns';
import { AppointmentInterface } from '../../interfaces/Interfaces';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { JC_Services } from '../../services';

// Existing styled components remain the same as in the previous implementation
const TimeSlot = styled(Box)({
    position: 'relative',
    height: '80px',
    borderBottom: '1px solid #f0f0f0',
});

const TimeLabel = styled(Typography)({
    position: 'absolute',
    left: -50,
    top: -10,
    color: '#6F767E',
    fontSize: '12px',
});

const AppointmentBox = styled(Box)<{ color?: string }>(() => ({
    position: 'absolute',
    left: '2px',
    right: '2px',
    height: "185px",
    width: 147.57,
    borderRadius: '8px',
    padding: '16px 12px',
    backgroundColor: '#FFF4F0',
    cursor: 'pointer',
    borderLeft: '4px solid #FB7C37',
    '&:hover': {
        opacity: 0.95,
    },
}));

const CustomerInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
});

const AppointmentTitle = styled(Typography)({
    color: '#1A1D1F',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '2px',
});

const VehicleInfo = styled(Typography)({
    color: '#6F767E',
    fontSize: '12px',
});

const DayColumn = styled(Box)({
    flex: 1,
    position: 'relative',
    borderRight: '1px solid #f0f0f0',
    minWidth: '150px',
    '&:last-child': {
        borderRight: 'none',
    },
});

const UnavailableSlot = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #ffffff 10px, #ffffff 20px)',
    opacity: 0.5,
});

const MonthGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
    marginBottom: '24px',
});

const DayCell = styled(Box)<{ isToday?: boolean }>(({ isToday }) => ({
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '14px',
    color: isToday ? '#fff' : '#1A1D1F',
    backgroundColor: isToday ? '#FB7C37' : 'transparent',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: isToday ? '#FB7C37' : '#f5f5f5',
    },
}));

const CalendarViews: React.FC = () => {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
    const [currentView, setCurrentView] = useState<'week' | 'month'>('week');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

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
                let filteredAppointments: AppointmentInterface[] = [];

                if (currentView === 'week') {
                    // Filter appointments for the current week
                    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday
                    const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 }); // Sunday

                    filteredAppointments = response.body.data.filter(
                        (appointment: AppointmentInterface) => {
                            const appointmentDate = parseISO(appointment.date);
                            return isWithinInterval(appointmentDate, { start: weekStart, end: weekEnd });
                        }
                    );
                } else {
                    // Filter appointments for the current month
                    const monthStart = startOfMonth(selectedDate);
                    const monthEnd = endOfMonth(selectedDate);

                    filteredAppointments = response.body.data.filter(
                        (appointment: AppointmentInterface) => {
                            const appointmentDate = parseISO(appointment.date);
                            return isWithinInterval(appointmentDate, { start: monthStart, end: monthEnd });
                        }
                    );
                }

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
    }, [currentWeek, currentView, selectedDate]);

    const timeSlots = Array.from({ length: 9 }, (_, i) => i + 9);
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    // Generate days for the month view
    const generateMonthDays = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const days = [];
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            days.push(<DayCell key={`empty-${i}`} />);
        }

        // Add the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = new Date(year, month, i);
            days.push(
                <DayCell
                    key={i}
                    isToday={isSameDay(currentDay, new Date())}
                    onClick={() => {
                        setSelectedDate(currentDay);
                        if (currentView === 'week') {
                            setCurrentWeek(currentDay);
                        }
                    }}
                    sx={{
                        backgroundColor: (
                            isSameDay(currentDay, selectedDate) ? '#FB7C37' :
                                isSameDay(currentDay, new Date()) ? 'rgba(251, 124, 55, 0.2)' : 'transparent'
                        ),
                        color: (
                            isSameDay(currentDay, selectedDate) ? '#fff' :
                                isSameDay(currentDay, new Date()) ? '#FB7C37' : '#1A1D1F'
                        )
                    }}
                >
                    {i}
                </DayCell>
            );
        }
        return days;
    };



    // Navigate between weeks/months
    const handlePreviousPeriod = () => {
        if (currentView === 'week') {
            setCurrentWeek(prevWeek => subWeeks(prevWeek, 1));
        } else {
            const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
            setSelectedDate(newDate);
        }
    };

    const handleNextPeriod = () => {
        if (currentView === 'week') {
            setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
        } else {
            const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
            setSelectedDate(newDate);
        }
    };

    const getAppointmentStyle = (appointmentDate: string) => {
        const date = parseISO(appointmentDate);
        const hour = date.getHours();
        const minutes = date.getMinutes();

        const topPosition = (hour - 9) * 60 + minutes;
        const height = 120; // Fixed height for simplicity, can be made dynamic if needed

        return {
            top: `${topPosition}px`,
            height: `${height}px`,
        };
    };

    // Navigate between weeks
    // const handlePreviousWeek = () => {
    //     setCurrentWeek(prevWeek => subWeeks(prevWeek, 1));
    // };

    // const handleNextWeek = () => {
    //     setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
    // };

    // Helper function to get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS': return '#FB7C37'; // Orange
            case 'COMPLETED': return '#05CD99'; // Green
            case 'SCHEDULED': return '#7B61FF'; // Purple
            default: return '#FF6161'; // Red
        }
    };

    // Render loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Render error state
    if (errorMessage) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error" variant="body1">
                    {errorMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                {/* Chevron Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={handlePreviousPeriod}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton size="small" onClick={handleNextPeriod}>
                        <ChevronRight />
                    </IconButton>
                    <Typography variant="subtitle1">
                        {currentView === 'week'
                            ? format(currentWeek, 'MMMM yyyy')
                            : format(selectedDate, 'MMMM yyyy')
                        }
                    </Typography>
                </Box>

                {/* Close Button */}
                <IconButton
                    size="small"
                    onClick={() => navigate(-1)}
                    sx={{ color: '#6F767E' }}
                >
                    <Close />
                </IconButton>
            </Box>

            <Paper elevation={0} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: "745px",
                            height: "304px",
                            backgroundColor: "#fff3f1",
                            borderRadius: "24px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "24px",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Calendar
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            <Select
                                value={currentView}
                                onChange={(e: SelectChangeEvent) => setCurrentView(e.target.value as 'week' | 'month')}
                                size="small"
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    transformOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    },
                                    PaperProps: {
                                        sx: {
                                            bgcolor: '#FFFFFF'
                                        }
                                    }
                                }}
                                sx={{
                                    '.MuiSelect-select': {
                                        color: "#ff5722",
                                        bgcolor: '#FFFFFF',
                                        fontWeight: 'bold',
                                        borderColor: "#ff5722",
                                        padding: '6px 8px'
                                    },
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: "#ff5722"
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "#ff5722"
                                    }
                                }}
                            >
                                <MenuItem value="week">Week</MenuItem>
                                <MenuItem value="month">Month</MenuItem>
                            </Select>
                        </Box>
                    </Box>

                    <MonthGrid>
                        {weekDays.map(day => (
                            <Typography
                                key={day}
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    color: '#6F767E',
                                    mb: 1
                                }}
                            >
                                {day}
                            </Typography>
                        ))}
                        {generateMonthDays()}
                    </MonthGrid>
                </Box>

                {/* Week View */}
                {currentView === 'week' && (
                    <Box sx={{ display: 'flex', position: 'relative', ml: 7 }}>
                        {weekDays.map((day, dayIndex) => (
                            <DayColumn key={day}>
                                <Typography
                                    align="center"
                                    sx={{
                                        py: 1,
                                        borderBottom: '1px solid #f0f0f0',
                                        color: '#6F767E',
                                        fontSize: '14px'
                                    }}
                                >
                                    {day}
                                </Typography>

                                {/* Time slots */}
                                {timeSlots.map((hour) => (
                                    <TimeSlot key={hour}>
                                        {dayIndex === 0 && (
                                            <TimeLabel>
                                                {`${hour}:00`}
                                            </TimeLabel>
                                        )}
                                    </TimeSlot>
                                ))}

                                {dayIndex === 0 && (
                                    <UnavailableSlot
                                        sx={{
                                            top: '0px',
                                            height: '120px'
                                        }}
                                    />
                                )}

                                {/* Filter appointments for current day */}
                                {appointments
                                    .filter(appointment =>
                                        new Date(parseISO(appointment.date)).getDay() === (dayIndex + 1) % 7
                                    )
                                    .map((appointment) => (
                                        <AppointmentBox
                                            key={appointment.id}
                                            sx={{
                                                ...getAppointmentStyle(appointment.date),
                                                borderLeft: `4px solid ${getStatusColor(appointment.status)}`,
                                            }}
                                        >
                                            <CustomerInfo>
                                                <Avatar
                                                    sx={{
                                                        width: 28,
                                                        height: 28,
                                                        fontSize: '10px',
                                                        bgcolor: '#1A1D1F',
                                                        border: '1px solid #FF7A00',
                                                        color: '#FF7A00',
                                                        boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)',
                                                    }}
                                                >
                                                    {appointment.vehicle.name.substring(0, 2).toUpperCase()}
                                                </Avatar>
                                                <Typography sx={{ fontSize: '12px', color: '#1A1D1F' }}>
                                                    {appointment.vehicle.name}
                                                </Typography>
                                            </CustomerInfo>
                                            <AppointmentTitle>
                                                {appointment.service.title}
                                            </AppointmentTitle>
                                            <VehicleInfo>
                                                {`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
                                            </VehicleInfo>
                                        </AppointmentBox>
                                    ))}
                            </DayColumn>
                        ))}
                    </Box>
                )}

                {/* Month View (placeholder for future detailed implementation) */}
                {currentView === 'month' && (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">
                            Detailed Month View Coming Soon
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Currently showing appointments for the selected month
                        </Typography>
                        {appointments.map((appointment) => (
                            <Box key={appointment.id} sx={{ mb: 1, p: 1, border: '1px solid #f0f0f0' }}>
                                <Typography>{appointment.service.title}</Typography>
                                <Typography variant="body2">
                                    {format(parseISO(appointment.date), 'MMMM d, yyyy HH:mm')}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default CalendarViews;