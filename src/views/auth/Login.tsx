import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Logi = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100vw',
                minHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            {/* Left side with logo */}
            <Box
                sx={{
                    width: '100%',
                    bgcolor: '#eb7a34',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src='src/assets/LoginImgPage.svg' alt='logo' />
            </Box>

            {/* Right side with login form */}
            <Box
                sx={{
                    width: '100%',
                    bgcolor: '#FDEEE7', // Softer pastel background
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        width: '100%',
                        maxWidth: '360px',
                        height: '70%',
                        p: 4,
                        borderRadius: 3,
                        bgcolor: 'white',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            color: '#FF7043',
                            fontSize: '1rem',
                            fontWeight: 900,
                            mb: 1,
                        }}
                    >
                        Jappcare Super Admin
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            mb: 3,
                            color: '#333',
                        }}
                    >
                        Sign In
                    </Typography>

                    <Box component="form" sx={{ mt: 1 }}>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#7D7D7D',
                                mb: 1,
                            }}
                        >
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Email"
                            variant="outlined"
                            size="small"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#FFF6F4',
                                    borderRadius: 1.5,
                                    '&:hover fieldset': {
                                        borderColor: '#FF7043',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FF7043',
                                    },
                                },
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#7D7D7D',
                                mb: 1,
                            }}
                        >
                            Password
                        </Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 1,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#FFF6F4',
                                    borderRadius: 1.5,
                                    '&:hover fieldset': {
                                        borderColor: '#FF7043',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FF7043',
                                    },
                                },
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mb: 10,
                            }}
                        >
                            <Typography
                                component="a"
                                href="#"
                                sx={{
                                    color: '#FF7043',
                                    fontSize: '0.75rem',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Forgot Password?
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#333',
                                color: 'white',
                                paddingTop: "200px",
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#555',
                                },
                            }}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Logi;
