import { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    CardContent,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar,
    styled,
    IconButton,
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventApi } from '@fullcalendar/core';
import { ArrowBack, ArrowForward, ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import CalendarViews from '../../../components/calendar/CalendarViews';
import { useNavigate } from 'react-router-dom';
// import CloseIcon from '../../../components/Icones/CloseIcon';

const appointmentTypes = [
    { value: 'bodyshop', label: 'Body Shop', color: '#FFE4E1' },
    { value: 'rearbumper', label: 'Rear Bumper', color: '#F0F8FF' },
    { value: 'engine', label: 'Engine Replacement', color: '#E0FFE0' }
];

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
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
});

interface DayCellProps {
    isToday?: boolean;
    isSelected?: boolean;
    isEvent?: boolean;
}

const DayCell = styled(Box)<DayCellProps>(({ isToday, isSelected, isEvent }) => ({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#FB7C37' : isEvent ? '#FFEDE6' : 'transparent',
    color: isSelected ? '#fff' : isEvent ? '#FB7C37' : '#1A1D1F',
    fontWeight: isToday ? 600 : 400,
    '&:hover': {
        backgroundColor: !isSelected && '#FFEDE6',
        color: !isSelected && '#FB7C37',
    },
}));

const FullCalendarPage = () => {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [selectedType, setSelectedType] = useState('bodyshop');
    const navigate = useNavigate();

    const handleDateClick = (selected: { view: { calendar: any; }; start: Date; end: Date; allDay: boolean; }) => {
        const calendarApi = selected.view.calendar;
        calendarApi.addEvent({
            id: `${selected.start.toISOString()}-${selectedType}`,
            title: appointmentTypes.find(type => type.value === selectedType)?.label || '',
            start: selected.start,
            end: selected.end,
            allDay: selected.allDay,
            extendedProps: {
                type: selectedType
            }
        });
    };
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];


    const handleEventClick = (selected: { event: { title: any; remove: () => void; }; }) => {
        if (window.confirm(`Delete '${selected.event.title}'?`)) {
            selected.event.remove();
        }
    };

    const renderEventContent = (eventInfo: any) => {
        const type = eventInfo.event.extendedProps.type || 'bodyshop';
        const appointmentType = appointmentTypes.find(t => t.value === type);

        return (
            <Box sx={{
                p: '4px 8px',
                borderRadius: '4px',
                bgcolor: appointmentType?.color || '#FFE4E1',
                fontSize: '12px',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                <Typography variant="caption" sx={{ display: 'block', color: '#333' }}>
                    {eventInfo.event.title}
                </Typography>
            </Box>
        );
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
            <Grid container spacing={3}>

                <Grid item xs={12} md={8} sx={{ pr: 3 }}>

                    <CardContent>
                        <Box sx={{ mb: 3 }}>
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Appointment Type</InputLabel>
                                <Select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    label="Appointment Type"
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: 'white', // Dropdown background color
                                            },
                                        },
                                    }}
                                >
                                    {appointmentTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev',
                                center: 'title',
                                right: 'next'
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            eventsSet={(events) => setCurrentEvents(events)}
                            eventContent={renderEventContent}
                            initialEvents={[
                                {
                                    id: '1',
                                    title: 'Body Shop',
                                    date: '2024-10-20',
                                    allDay: true,
                                    extendedProps: {
                                        type: 'bodyshop'
                                    }
                                }
                            ]}
                            height="800px"
                            dayHeaderFormat={{ weekday: 'short' }}
                            titleFormat={{ month: 'long' }}
                            stickyHeaderDates={true}
                            firstDay={1}
                            buttonText={{
                                today: 'Today',
                                month: 'Month',
                                week: 'Week',
                                day: 'Day'
                            }}
                            views={{
                                dayGrid: {
                                    titleFormat: { month: 'long', year: 'numeric' }
                                }
                            }}
                            eventTimeFormat={{
                                hour: '2-digit',
                                minute: '2-digit',
                                meridiem: false
                            }}
                            slotLabelFormat={{
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }}
                            // Custom calendar styling
                            dayCellClassNames="calendar-day"
                            eventClassNames="calendar-event"
                        />
                    </CardContent>


                    <style>
                        {`
                        .calendar-day {
                            padding: 1px !important;
                            height: 150px !important;
                        }
                        .fc-daygrid-day-number {
                            font-size: 14px;
                            color: #333;
                            text-decoration: none;
                        }
                        .fc-col-header-cell {
                            padding: 12px 0 !important;
                            background: #fff !important;
                            border-bottom: 1px solid #eee !important;
                        }
                        .fc-day-today {
                            background: #fff !important;
                        }
                        .fc-day-today .fc-daygrid-day-number {
                            color: #FB7C37;
                            font-weight: bold;
                        }
                        .calendar-event {
                            margin: 1px 0 !important;
                            border: none !important;
                            background: none !important;
                        }
                        .fc-header-toolbar {
                            padding: 0 16px;
                            margin-bottom: 24px !important;
                        }
                        .fc-button {
                            background: #fff !important;
                            border: 1px solid #eee !important;
                            color: #333 !important;
                            box-shadow: none !important;
                        }
                        .fc-button:hover {
                            background: #f5f5f5 !important;
                        }
                        .fc-toolbar-title {
                            font-size: 1.2rem !important;
                            font-weight: 600 !important;
                        }
                        `}
                    </style>
                </Grid>

                <Grid item xs={12} md={4} sx={{ borderLeft: '1px solid #E4E4E4', pl: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, }}>
                        <Typography variant="h6" color="#111">
                            October
                        </Typography>
                        {/* <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography
                                component="span"
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    '&:hover': { color: 'text.primary' }
                                }}
                            >
                                ←
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    '&:hover': { color: 'text.primary' }
                                }}
                            >
                                →
                            </Typography>
                        </Box> */}
                    </Box>

                    {/* Calendar Days Header */}
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                        <CalendarContainer>
                            <CalendarHeader>
                                <Box>
                                    <Typography variant="h6" color="#1A1D1F" fontWeight={600}>
                                        Today's Calendar
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Thurs, Oct 20, 2024
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small">
                                        <ArrowBack />
                                    </IconButton>
                                    <IconButton size="small">
                                        <ArrowForward />
                                    </IconButton>

                                </Box>
                            </CalendarHeader>

                            <CalendarGrid>
                                {weekDays.map((day) => (
                                    <Box key={day} sx={{ textAlign: 'center', color: '#6F767E', fontSize: '14px' }}>
                                        {day}
                                    </Box>
                                ))}
                                {Array.from({ length: 31 }, (_, i) => (
                                    <DayCell
                                        key={i + 1}
                                        isToday={i + 1 === 20}
                                        isSelected={i + 1 === 20}
                                        isEvent={[20].includes(i + 1)}
                                    >
                                        {i + 1}
                                    </DayCell>
                                ))}
                            </CalendarGrid>




                        </CalendarContainer>
                    </Grid>

                    {/* Upcoming Appointments */}
                    <Box sx={{ mt: 4 }}>
                        {currentEvents.map((event, index) => (
                            <Box
                                key={event.id}
                                sx={{
                                    mb: 2,
                                    p: 1,
                                    borderRadius: 1,
                                    border: '1px solid #E0E0E0',
                                    bgcolor: '#FFF4F0',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: '4px',
                                        borderRadius: '4px 0 0 4px',
                                        bgcolor: index === 0 ? '#FB7C37' :
                                            index === 1 ? '#7B61FF' :
                                                index === 2 ? '#FB7C37' : '#4CAF50'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                bgcolor: '#1A1D1F',
                                                fontSize: '10px',
                                                color: '#FF7A00',
                                                border: '1px solid #FF7A00',
                                                boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)'
                                            }}
                                        >
                                            JM
                                        </Avatar>
                                        <Typography variant="body2">James Mann</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        Porsche Taycan
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 4 }}>
                                    <Typography variant="body2" sx={{ color: '#111', fontWeight: 500 }}>
                                        Bodyshop appointment
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        11:00 AM - 4:00 PM
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                </Grid>
            </Grid>

            {/* <Grid item xs={12}>
                <CalendarViews />
            </Grid> */}
        </Box>
    );
};

export default FullCalendarPage;