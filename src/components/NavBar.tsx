import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Avatar,
    Button,
} from '@mui/material';
// import { Emergency } from '@mui/icons-material';
import PieChartIcon from './Icones/PieChartIcon';
import DashBoardIcon from './Icones/DashBoardIcon';
import ShopIcon from './Icones/ShopIcon';
import AppointmentIcon from './Icones/AppointmentIcon';
import ChatsIcon from './Icones/ChatsIcon';
// import InvoiceIcon from './Icones/InvoiceIcon';
import UserIcon from './Icones/UserIcon';
import UsersIcon from './Icones/UsersIcon';
import TipIcon from './Icones/TipsIcon';
import WalletIcon from './Icones/WalletIcon';
import LogOutIcon from './Icones/LogOutIcon';
import { iUsersAction } from '../interfaces/UsersInterface';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface NavBarProps {
    isSidebarCollapsed: boolean;
}

const drawerWidth = 270;

const NavBar = ({ isSidebarCollapsed }: NavBarProps) => {
    // const location = useLocation();
    const navigate = useNavigate();
    const dispatch: Dispatch<iUsersAction> = useDispatch();

    const menuItems = [
        { text: 'Dashboard', icon: <DashBoardIcon stroke='#111111' fill='#111111' />, path: '/dashboard' },
        { text: 'Shop', icon: <ShopIcon stroke='' fill='' />, path: '/shop' },
        { text: 'Appointments', icon: <AppointmentIcon stroke='#111111' fill='#111111' />, path: '/appointments' },
        // { text: 'Emergency Assistance', icon: <Emergency />, path: '/emergency' },
        { text: 'Chats', icon: <ChatsIcon stroke='#111111' fill='#111111' />, path: '/servicecenterchats' },
        { text: 'Statistics', icon: <PieChartIcon stroke="#111111" fill="#111111" />, path: '/statistics' },
        // { text: 'Invoices', icon: <InvoiceIcon stroke='#111111' fill='#111111' />, path: '/invoices' },
        { text: 'Profile', icon: <UserIcon fill='#111111' />, path: '/profile' },
        { text: 'Accounts', icon: <UsersIcon fill='#111111' />, path: '/accounts' },
        { text: 'Tips', icon: <TipIcon fill='#111111' />, path: '/tips' },
        { text: 'Payments', icon: <WalletIcon fill='#111111' />, path: '/payments' },
    ];

    const handleItemClick = (path: string) => {
        navigate(path);
        console.log(path);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        const action: iUsersAction = {
            type: "LOGOUT",
            users: {}
        }
        dispatch(action);

        navigate('/');
    };

    const isSelected = (path: string) => location.pathname === path;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isSidebarCollapsed ? 0 : drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isSidebarCollapsed ? 0 : drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'rgba(248, 201, 187, 0.1)',
                    border: 'none',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
                    transition: ' 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                },
            }}
        >
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#1A1D1F',
                        fontSize: '14px',
                        fontWeight: 600,
                        marginTop: '0px',
                        marginLeft: '15px',
                        fontFamily: 'Arial, Helvetica, sans-serif, Plus Jakarta Sans',
                        paddingTop: '60px',
                    }}
                >
                    Welcome Back
                    <span style={{ fontSize: '20px' }}>👋</span>,
                </Typography>
                <Box
                    sx={{
                        backgroundColor: '#FFF5F3',
                        padding: '10px',
                        borderRadius: '16px',
                        margin: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        border: '1px dashed #E4E4E4',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {!isSidebarCollapsed && (
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: '#1A1D1F',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#FF7A00',
                                    border: '2px solid #FF7A00',
                                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

                                }}
                            >
                                DG
                            </Avatar>
                        )}
                        {!isSidebarCollapsed && (
                            <Box>
                                <Typography
                                    sx={{
                                        color: '#1A1D1F',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Dave's Garage
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    padding: '10px',
                    maxHeight: 'calc(100vh - 200px)',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '3px',
                        margin: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 112, 67, 0.3)',
                        borderRadius: '3px',
                        '&:hover': {
                            background: 'rgba(255, 112, 67, 0.5)',
                        },
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 112, 67, 0.3) rgba(0, 0, 0, 0.05)',
                }}
            >
                <List>
                    {menuItems.map((item) => {
                        const selected = isSelected(item.path);
                        return (
                            <ListItem
                                onClick={() => handleItemClick(item.path)}
                                key={item.text}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '12px',
                                    padding: '0px 16px 0px 16px',
                                    mb: 1,
                                    height: '44px',
                                    cursor: 'pointer',
                                    bgcolor: selected ? 'rgba(255, 112, 67, 0.1)' : 'transparent',
                                    color: selected ? '#FF7043' : 'inherit',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 112, 67, 0.1)',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        width: "36px",
                                        color: selected ? '#FF7043' : '#000000',
                                    }}
                                >
                                    {React.cloneElement(item.icon, {
                                        stroke: selected ? '#FF7043' : '',
                                        fill: selected ? '#FF7043' : '#000000'
                                    })}
                                </ListItemIcon>
                                {!isSidebarCollapsed && (
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: selected ? '#FF7043' : 'inherit',
                                            },
                                        }}
                                    />
                                )}
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Box sx={{ padding: '16px', textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                    sx={{ width: '100%' }}
                >
                    <LogOutIcon />
                    <Box sx={{ marginLeft: '8px' }}>Log Out</Box>
                </Button>
            </Box>
        </Drawer>
    );
};

export default NavBar;
