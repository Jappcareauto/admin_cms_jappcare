import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import NavBar from '../components/NavBar';
import HeaderLayout from './HeaderLayOut';
import BodyLayout from './BodyLayOut';
import FooterLayout from './FooterLayOut';

// Import Plus Jakarta Sans font
import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // const drawerWidth = isSidebarCollapsed ? 0 : 270;   // in case i can change to 80

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#FF7043',
            },
            background: {
                // default: 'rgba(241, 176, 156, 0.1)',
                paper: 'rgba(241, 176, 156, 0.1)',
            },
            text: {
                primary: '#1A1D1F',
                secondary: '#6F767E',
            },
        },
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {

                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
                        border: '1px solid #E4E4E4',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 28,
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        textTransform: 'none',
                        outline: 'none', // Removes focus outline
                        boxShadow: 'none', // Prevents box-shadow on click
                        '&:hover': {
                            border: '1px solid #FF7043'
                        },
                        '&:focus': {
                            outline: 'none', // Ensures no focus outline
                            boxShadow: 'none', // Prevents box-shadow on focus
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        outline: 'none', // Removes focus outline
                        boxShadow: 'none', // Prevents box-shadow on click
                        '&:focus': {
                            outline: 'none', // Ensures no focus outline
                            boxShadow: 'none', // Prevents box-shadow on focus
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                    },
                },
            },
        },



        typography: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            h1: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            h2: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            h3: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            h4: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            h5: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            h6: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            subtitle1: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            subtitle2: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            body1: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            body2: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
            button: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
        },


    });

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };



    useEffect(() => {
        localStorage.removeItem('theme-mode');
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles
                styles={{
                    '*::-webkit-scrollbar': { width: '6px' },
                    '*::-webkit-scrollbar-track': {
                        background: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '3px',
                        margin: '8px',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 112, 67, 0.3)',
                        borderRadius: '3px',
                        '&:hover': { background: 'rgba(255, 112, 67, 0.5)' },
                    },
                }}
            />
            <Box sx={{
                display: 'flex',
                // width: '151%',
                minHeight: '100vh',
                overflow: 'hidden',
                overflowX: 'hidden'  // Add this to prevent horizontal scrolling

            }}>
                <CssBaseline />
                <Box>
                    <NavBar isSidebarCollapsed={isSidebarCollapsed} />

                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        overflowX: 'hidden'  // Add this to prevent horizontal scrolling
                    }}
                >
                    <HeaderLayout toggleSidebar={toggleSidebar} />
                    <BodyLayout>{children}</BodyLayout>
                    <FooterLayout />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AppLayout;