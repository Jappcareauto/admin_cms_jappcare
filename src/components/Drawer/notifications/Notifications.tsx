import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import NotifIcon from '../../Icones/NotifIcon';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect, useState } from 'react';
import { NotificationData } from '../../../interfaces/Interfaces';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Alert, Fade, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';
import { formatValue } from '../../../tools/formatValue';

interface NotificationItemProps {
    icon: React.ReactNode;
    notificationType: string;
    description?: string;
    color: string;
    onMarkRead: () => void;
    isRead: boolean;
}

const NotificationItem = ({ icon, notificationType, description, color, onMarkRead, isRead }: NotificationItemProps) => (
    <Fade in={true}>
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 1,
                transition: 'all 0.3s ease',
                opacity: isRead ? 0.7 : 1,
                '&:hover': { bgcolor: 'action.hover' }
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ color }}>
                    {icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        color={color}
                        sx={{
                            fontWeight: isRead ? 400 : 500,
                            fontSize: '0.875rem',
                            mb: 0.5
                        }}
                    >
                        {formatValue(notificationType)}
                    </Typography>
                    {description && (
                        <Typography variant="body2" color="text.primary">
                            {description}
                        </Typography>
                    )}
                </Box>
                {!isRead && (
                    <IconButton
                        onClick={onMarkRead}
                        size="small"
                        sx={{
                            color: 'success.main',
                            '&:hover': {
                                backgroundColor: 'success.light',
                                color: 'success.dark'
                            }
                        }}
                    >
                        <Tooltip title="Mark as read">
                            <CheckCircleOutlineIcon />
                        </Tooltip>

                    </IconButton>
                )}
            </Box>
        </Paper>
    </Fade>
);

interface NotificationsProps {
    onClose: () => void;
}

const Notifications = ({ onClose }: NotificationsProps) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [notificationData, setNotificationData] = useState<NotificationData[]>([]);

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state);

    console.log("onClose", onClose);

    const fetchNotification = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `notification/user/${connectedUsers.id}`, 'GET', "", connectedUsers.accessToken);

            if (response && response.body.meta.statusCode === 200) {
                const unreadNotifications = response.body.filter(
                    (notification: NotificationData) => !notification.isRead
                );
                setNotificationData(unreadNotifications);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('An error occurred while fetching notifications');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            const response = await JC_Services('JAPPCARE', `notification/${notificationId}/mark-read`, 'PATCH', "", connectedUsers.accessToken);

            console.log("response", response);

            if (response && response.body.meta.statusCode === 200) {
                // Update the local state to remove the marked notification
                setNotificationData(prev => prev.filter(notification => notification.id !== notificationId));
            } else {
                setErrorMessage('Failed to mark notification as read');
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
            setErrorMessage("Failed to update notification status");
        }
    };

    useEffect(() => {
        fetchNotification();
    }, [connectedUsers.id, connectedUsers.accessToken]);

    const handleCloseMessage = () => {
        setErrorMessage('');
    };

    return (
        <Box>
            {loading && <Typography>Loading...</Typography>}

            {errorMessage && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseMessage}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </Alert>
            )}

            {!loading && notificationData.length === 0 && (
                <Typography sx={{ p: 2 }}>
                    No unread notifications
                </Typography>
            )}

            <Stack spacing={2}>
                {notificationData.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        icon={<NotifIcon stroke='#FF6B00' fill='#FF6B00' />}
                        notificationType={notification.notificationType}
                        description={notification.description}
                        color="#FF6B00"
                        isRead={notification.isRead}
                        onMarkRead={() => notification.id && handleMarkAsRead(notification.id)}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Notifications;