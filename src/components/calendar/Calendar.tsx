import { Box, Typography, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ExpendIcon from '../Icones/ExpendIcon';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

// Custom styled components
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
    isEvent?: boolean;
}

const DayCell = styled(Box)<DayCellProps>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: isSelected ? '32px' : '8px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#FB7C37' : 'transparent',
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

const EventsList = styled(Box)({
    marginTop: '24px',
});

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

const Calendar = () => {
    const events = [
        {
            title: "Bodyshop appointment",
            time: "11:00 AM - 4:00 PM",
            subtitle: "Porsche Taycan",
            user: "James Mann",
            color: "#FB7C37"  // Orange
        },
        {
            title: "Bodyshop appointment",
            time: "11:00 AM - 4:00 PM",
            subtitle: "Porsche Taycan",
            user: "James Mann",
            color: "#7B61FF"  // Purple
        },
        {
            title: "Bodyshop appointment",
            time: "11:00 AM - 4:00 PM",
            subtitle: "Porsche Taycan",
            user: "James Mann",
            color: "#FF6161"  // Red
        },
        {
            title: "Bodyshop appointment",
            time: "11:00 AM - 4:00 PM",
            subtitle: "Porsche Taycan",
            user: "James Mann",
            color: "#05CD99"  // Green
        }
    ];

    // const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const weekData = [
        { day: 'M', date: '01' },
        { day: 'T', date: '02' },
        { day: 'W', date: '03' },
        { day: 'T', date: '04' },
        { day: 'F', date: '05' },
        { day: 'S', date: '06' },
        { day: 'S', date: '07' },
    ];

    const navigate = useNavigate();

    return (
        <CalendarContainer>
            <CalendarHeader>
                <Box>
                    <Typography variant="h5" color="#FB7C37" fontWeight={600}>
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
                    <IconButton size="small" onClick={() => navigate('/calendar')}>
                        <ExpendIcon fill='#111111' />
                    </IconButton>
                </Box>
            </CalendarHeader>


            <CalendarGrid>
                {weekData.map((item, index) => (
                    <DayCell
                        key={index}
                        isSelected={index === 3}
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
            // fullWidth
            >
                Show Calendar
            </Button>

            <EventsList>
                {events.map((event, index) => (
                    <EventCard key={index} color={event.color}>
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
                                    JM
                                </Avatar>
                                <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
                                    {event.user}
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                color="#111111"
                                sx={{ fontSize: '13px' }}
                            >
                                {event.subtitle}
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
                                {event.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="#111111"
                                sx={{ fontSize: '13px' }}
                            >
                                {event.time}
                            </Typography>
                        </Box>
                    </EventCard>
                ))}
            </EventsList>
        </CalendarContainer>
    );
};

export default Calendar;