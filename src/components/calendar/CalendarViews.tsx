import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    styled,
    Paper,
    IconButton,
    Select,
    SelectChangeEvent,
    Button,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Close, KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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



interface Appointment {
    id: string;
    title: string;
    start: string;
    end: string;
    customer: string;
    vehicle: string;
    borderColor: string;
    dayIndex: number;
}

const appointments: Appointment[] = [
    // {
    //     id: '1',
    //     title: 'Bodyshop appointment',
    //     start: '09:00',
    //     end: '11:00',
    //     customer: 'James Mann',
    //     vehicle: 'Porsche Taycan',
    //     borderColor: '#FB7C37',
    //     dayIndex: 0 // Monday
    // },
    {
        id: '2',
        title: 'Bodyshop appointment',
        start: '10:00',
        end: '12:00',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#FB7C37',
        dayIndex: 1 // Tuesday
    },
    {
        id: '3',
        title: 'Bodyshop appointment',
        start: '11:00',
        end: '13:00',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#FB7C37',
        dayIndex: 2 // Wednesday
    },
    // {
    //     id: '4',
    //     title: 'Bodyshop appointment',
    //     start: '12:00',
    //     end: '14:00',
    //     customer: 'James Mann',
    //     vehicle: 'Porsche Taycan',
    //     borderColor: '#FB7C37',
    //     dayIndex: 3 // Thursday
    // },
    {
        id: '5',
        title: 'Bodyshop appointment',
        start: '13:00',
        end: '15:00',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#FB7C37',
        dayIndex: 4 // Friday
    },
    {
        id: '6',
        title: 'Bodyshop appointment',
        start: '14:00',
        end: '16:00',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#FB7C37',
        dayIndex: 5 // Saturday
    },

    // Car Checkup appointments
    {
        id: '8',
        title: 'Car Checkup',
        start: '13:00',
        end: '14:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 0 // Monday
    },
    {
        id: '9',
        title: 'Car Checkup',
        start: '14:00',
        end: '15:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 1 // Tuesday
    },
    {
        id: '10',
        title: 'Car Checkup',
        start: '15:00',
        end: '16:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 2 // Wednesday
    },
    {
        id: '11',
        title: 'Car Checkup',
        start: '16:00',
        end: '17:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 3 // Thursday
    },
    {
        id: '12',
        title: 'Car Checkup',
        start: '09:00',
        end: '10:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 4 // Friday
    },
    {
        id: '13',
        title: 'Car Checkup',
        start: '10:00',
        end: '11:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 5 // Saturday
    },
    {
        id: '14',
        title: 'Car Checkup',
        start: '11:00',
        end: '12:30',
        customer: 'James Mann',
        vehicle: 'Porsche Taycan',
        borderColor: '#7B61FF',
        dayIndex: 6 // Sunday
    }
];

const CalendarViews: React.FC = () => {
    const [view, setView] = useState<string>('week');
    const timeSlots = Array.from({ length: 9 }, (_, i) => i + 9);
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const currentDate = new Date(2024, 9, 20); // October 20, 2024
    const navigate = useNavigate();

    // Generate days for the month view
    const generateMonthDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const days = [];
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay - 1; i++) {
            days.push(<DayCell key={`empty-${i}`} />);
        }

        // Add the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <DayCell
                    key={i}
                    isToday={i === 20}
                >
                    {i}
                </DayCell>
            );
        }
        return days;
    };


    const getAppointmentStyle = (start: string, end: string) => {
        const startHour = parseInt(start.split(':')[0]);
        const endHour = parseInt(end.split(':')[0]);
        const startMinutes = parseInt(start.split(':')[1]);
        const endMinutes = parseInt(end.split(':')[1]);

        const topPosition = (startHour - 9) * 60 + startMinutes;
        const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes));

        return {
            top: `${topPosition}px`,
            height: `${height}px`,
        };
    };

    return (
        <Box sx={{ p: 3 }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                {/* Chevron Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small">
                        <ChevronLeft />
                    </IconButton>
                    <IconButton size="small">
                        <ChevronRight />
                    </IconButton>
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
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                variant="outlined"
                                endIcon={<KeyboardArrowDown />}
                                sx={{
                                    textTransform: "none",
                                    color: "#ff5722",
                                    borderColor: "#ff5722",
                                    fontWeight: "bold",
                                }}
                            >
                                Week
                            </Button>
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
                                .filter(appointment => appointment.dayIndex === dayIndex)
                                .map((appointment) => (
                                    <AppointmentBox
                                        key={appointment.id}
                                        sx={{
                                            ...getAppointmentStyle(appointment.start, appointment.end),
                                            borderLeft: `4px solid ${appointment.borderColor}`,
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
                                                {appointment.customer.split(' ').map(n => n[0]).join('')}
                                            </Avatar>
                                            <Typography sx={{ fontSize: '12px', color: '#1A1D1F' }}>
                                                {appointment.customer}
                                            </Typography>
                                        </CustomerInfo>
                                        <AppointmentTitle>
                                            {appointment.title}
                                        </AppointmentTitle>
                                        <VehicleInfo>
                                            {appointment.vehicle}
                                        </VehicleInfo>
                                    </AppointmentBox>
                                ))}
                        </DayColumn>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default CalendarViews;