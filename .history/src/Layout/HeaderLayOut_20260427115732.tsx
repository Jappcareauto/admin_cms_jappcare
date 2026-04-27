import { Suspense, lazy, useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
} from '@mui/material';
import { Menu as MenuIcon, } from '@mui/icons-material';
import NotificationIcon from '../components/Icones/NotificationIcon';
import SettingIcon from '../components/Icones/SettingIcon';
import CustomDrawer from '../components/Drawer/CustomDrawer';

const SettingsForm = lazy(() => import('../components/Drawer/settingsForm/SettingsForm'));
const Notifications = lazy(() => import('../components/Drawer/notifications/Notifications'));

interface HeaderLayoutProps {
    // toggleTheme: () => void;
    toggleSidebar: () => void;
}

const HeaderLayout = ({ toggleSidebar }: HeaderLayoutProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
    const [hasOpenedSettings, setHasOpenedSettings] = useState(false);
    const [hasOpenedNotifications, setHasOpenedNotifications] = useState(false);

    useEffect(() => {
        const preload = () => {
            import('../components/Drawer/settingsForm/SettingsForm');
            import('../components/Drawer/notifications/Notifications');
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(preload);
        } else {
            const timer = setTimeout(preload, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    // Add these handlers inside the Dashboard component:
    const handleSettings = (data: any) => {
        void data;
        setIsDrawerOpen(false);
        // Handle the new service data here
    };
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'rgba(248, 201, 187, 0.1)',
                borderBottom: '1px solid #E4E4E4',

            }}
        >
            <Toolbar sx={{ height: 72, justifyContent: 'space-between' }}>
                <IconButton
                    edge="start"
                    onClick={toggleSidebar}
                    sx={{ color: '#1A1D1F', mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton sx={{
                        color: '#6F767E',
                        bgcolor: '#F4F4F4',
                        borderRadius: '12px',
                        width: 40,
                        height: 40,
                    }}
                        onMouseEnter={() => import('../components/Drawer/notifications/Notifications')}
                        onFocus={() => import('../components/Drawer/notifications/Notifications')}
                        onClick={() => {
                            setHasOpenedNotifications(true);
                            setIsNotificationDrawerOpen(true);
                        }}
                    >
                        <NotificationIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: '#6F767E',
                            bgcolor: '#F4F4F4',
                            borderRadius: '12px',
                            width: 40,
                            height: 40,
                        }}
                        onMouseEnter={() => import('../components/Drawer/settingsForm/SettingsForm')}
                        onFocus={() => import('../components/Drawer/settingsForm/SettingsForm')}
                        onClick={() => {
                            setHasOpenedSettings(true);
                            setIsDrawerOpen(true);
                        }}
                    >
                        <SettingIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Settings"
            >
                {(isDrawerOpen || hasOpenedSettings) && (
                    <Suspense fallback={<Box sx={{ p: 2 }}>Loading...</Box>}>
                        <SettingsForm
                            onSubmit={handleSettings}
                            onClose={() => setIsDrawerOpen(false)}
                        />
                    </Suspense>
                )}
            </CustomDrawer>
            <CustomDrawer
                open={isNotificationDrawerOpen}
                onClose={() => setIsNotificationDrawerOpen(false)}
                title="Notifications"
            >
                {(isNotificationDrawerOpen || hasOpenedNotifications) && (
                    <Suspense fallback={<Box sx={{ p: 2 }}>Loading...</Box>}>
                        <Notifications
                            onClose={() => setIsNotificationDrawerOpen(false)}
                        />
                    </Suspense>
                )}
            </CustomDrawer>
        </AppBar>
    );
};

export default HeaderLayout;