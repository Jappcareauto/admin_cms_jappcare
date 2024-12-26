import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { Menu as MenuIcon, } from '@mui/icons-material';
import NotificationIcon from '../components/Icones/NotificationIcon';
import SettingIcon from '../components/Icones/SettingIcon';
import CustomDrawer from '../components/Drawer/CustomDrawer';
import SettingsForm from '../components/Drawer/settingsForm/SettingsForm';
import Notifications from '../components/Drawer/notifications/Notifications';

interface HeaderLayoutProps {
    toggleTheme: () => void;
    toggleSidebar: () => void;
}

const HeaderLayout = ({ toggleTheme, toggleSidebar }: HeaderLayoutProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

    // Add these handlers inside the Dashboard component:
    const handleSettings = (data: any) => {
        console.log('New service data:', data);
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
                        onClick={() => setIsNotificationDrawerOpen(true)}
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
                        onClick={() => setIsDrawerOpen(true)}
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
                <SettingsForm
                    onSubmit={handleSettings}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </CustomDrawer>
            <CustomDrawer
                open={isNotificationDrawerOpen}
                onClose={() => setIsNotificationDrawerOpen(false)}
                title="Notifications"
            >
                <Notifications
                    // onSubmit={handleSettings}
                    onClose={() => setIsNotificationDrawerOpen(false)}
                />
            </CustomDrawer>
        </AppBar>
    );
};

export default HeaderLayout;