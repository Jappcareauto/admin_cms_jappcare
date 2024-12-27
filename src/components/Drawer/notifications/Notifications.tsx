;
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import NotifIcon from '../../Icones/NotifIcon';

interface NotificationItemProps {
    icon: React.ReactNode;
    type: string;
    message: string;
    color: string;
}

const NotificationItem = ({ icon, type, message, color }: NotificationItemProps) => (
    <Paper
        elevation={0}
        sx={{
            p: 2,
            borderRadius: 1,
            '&:hover': { bgcolor: 'action.hover' }
        }}
    >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{ color: color }}>
                {icon}
            </Box>
            <Box>
                <Typography
                    color={color}
                    sx={{
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        mb: 0.5
                    }}
                >
                    {type}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {message}
                </Typography>
            </Box>
        </Box>
    </Paper>
);

interface NotificationsProps {
    onClose: () => void;
}

const Notifications = ({ onClose }: NotificationsProps) => {

    console.log("Close", onClose);

    const notifications = [
        {
            icon: <NotifIcon stroke='#FF6B00' fill='#FF6B00' />,
            type: 'Notification',
            message: 'New Appointment scheduled, from James for a body shop repair',
            color: '#FF6B00'
        },
        {
            icon: <NotifIcon stroke='#FF6B00' fill='#FF6B00' />,
            type: 'Task',
            message: 'Complete weekly report and send to team',
            color: '#FF6B00'
        },
        {
            icon: <NotifIcon stroke='#FF6B00' fill='#FF6B00' />,
            type: 'Meeting',
            message: 'Discuss project updates with stakeholders',
            color: '#FF6B00'
        },
        {
            icon: <NotifIcon stroke='#FF6B00' fill='#FF6B00' />,
            type: 'Deadline',
            message: 'Submit final design drafts for review',
            color: '#FF6B00'
        },
        {
            icon: <NotifIcon stroke='#FF6B00' fill='#FF6B00' />,
            type: 'Reminder',
            message: 'Renew annual subscription for design software',
            color: '#FF6B00'
        },
        {
            icon: <NotifIcon stroke='#FF6B00' fill='#FF6B00' />,
            type: 'Event',
            message: 'Attend design conference next month',
            color: '#FF6B00'
        }
    ];

    return (
        <Box >



            {/* Notifications List */}
            <Stack spacing={2}>
                {notifications.map((notification, index) => (
                    <NotificationItem
                        key={index}
                        icon={notification.icon}
                        type={notification.type}
                        message={notification.message}
                        color={notification.color}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Notifications;