import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, CircularProgress, MenuItem } from '@mui/material';

interface NewUserFormProps {
    onSubmit: (data: any) => void;
}

/// <reference types="@types/google.maps" />
declare global {
    interface Window {
        google: typeof google;
    }
}

const ROLES = [
    "ROLE_ADMIN",
    "ROLE_GARAGE_MANAGER",
    "ROLE_SERVICE_MANAGER",
    "ROLE_TECHNICIAN",
    "ROLE_CUSTOMER",
    "ROLE_RECEPTIONIST"
];

const NewUserForm = ({ onSubmit }: NewUserFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        verified: true,
        role: ''
    });

    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("submit", onSubmit);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await JC_Services("JAPPCARE", "user/create", "POST", formData, connectedUsers.accessToken)
            console.log("response", response);
            console.log("formData", formData);

            if (response && response.status === 200 || response.status === 201) {
                setSuccessMessage("User created successfully");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    verified: true,
                    role: ''
                })

            } else if (response && response.status === 401) {
                setErrorMessage(response.body.details || 'Unauthorized to perform action');

            } else if (response && response.status === 409) {
                setErrorMessage('This Data already exists');
            }
            else {
                // Handle error
                setErrorMessage(response.body.details || "An error occurred while creating user");
            }
        }
        catch (error) {
            setErrorMessage("An error occurred while creating user");
        }
        setLoading(false);
    };

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        };

        const initializeMap = () => {
            const map = new google.maps.Map(document.getElementById('provider-map-container') as HTMLElement, {
                center: { lat: 4.0511, lng: 9.7679 }, // Coordinates for Douala, Cameroon
                zoom: 14,
            });

            new google.maps.Marker({
                position: { lat: 4.0511, lng: 9.7679 },
                map,
                title: "Dave's Garage",
            });
        };

        if (!window.google) {
            loadGoogleMapsScript();
        } else {
            initializeMap();
        }
    }, []);

    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}

        >
            {/* Success and Error Messages */}
            <>
                {successMessage && (
                    <Alert
                        severity="success"
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
                        {successMessage}
                    </Alert>
                )}

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
            </>
            {/* User Details Header */}

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Avatar Section with Edit Icon */}
                <Box sx={{ position: 'relative', width: 'fit-content', mb: 4, display: "flex", alignItems: "center", }}>
                    <Avatar
                        sx={{
                            width: 128,
                            height: 128,
                            bgcolor: 'black',
                            border: '4px solid #FB7C37',
                            boxShadow: 'inset 0 0 0 4px rgb(255, 255, 255)',
                        }}
                    >
                        <Typography sx={{ color: '#FB7C37', fontSize: '24px', fontWeight: 600 }}>
                            SM
                        </Typography>
                    </Avatar>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 5,
                            bgcolor: '#FB7C37',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <EditIcon sx={{ color: 'white', fontSize: 16 }} />
                    </Box>
                </Box>
            </Box>


            <Stack spacing={2.5}>
                {/* Name Field */}
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                />

                {/* Email Field */}
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                />

                {/* Home Address Field */}
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Phone Number Field */}
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: 2 }}>


                    <TextField
                        fullWidth
                        // sx={{ pl: 1 }}
                        label="Role"
                        name="role"
                        placeholder="Hint text"
                        value={formData.role}
                        onChange={handleChange}
                        variant="outlined"
                        select
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        bgcolor: 'white',
                                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)'
                                    }
                                }
                            }
                        }}

                    >
                        <MenuItem value="" disabled selected>Select Role</MenuItem>
                        {ROLES.map((role) => (
                            <MenuItem key={role} value={role} sx={{ bgcolor: "white" }}>
                                {role.replace("ROLE_", "").replace(/_/g, " ")} {/* Formats text */}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>



                {/* Home Location Section - Prepared for API integration */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        sx={{
                            mb: 1,
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.87)'
                        }}
                    >
                        Home Location
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: 200,
                            borderRadius: 1,
                            overflow: 'hidden',
                            position: 'relative',
                            bgcolor: '#f5f5f5',
                            border: '1px solid rgba(0, 0, 0, 0.12)'
                        }}
                    >
                        {/* Map container - Ready for API implementation */}
                        {/* <div id="map-container" style={{ width: '100%', height: '100%' }} /> */}
                        <div id="provider-map-container" style={{ width: '100%', height: '100%', background: '#f5f5f5' }} />


                        {/* Expand button */}
                        {/* <IconButton
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                bgcolor: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)'
                                }
                            }}
                        >
                            <Box
                                component="svg"
                                sx={{ width: 16, height: 16 }}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M16,3H8V5H16V3M21,3V5H18V3H21M3,3H6V5H3V3M21,19H18V21H21V19M16,19H8V21H16V19M3,19H6V21H3V19M21,11H18V13H21V11M16,11H8V13H16V11M3,11H6V13H3V11Z"
                                />
                            </Box>
                        </IconButton> */}
                    </Box>
                </Box>

                <Box sx={{
                    // position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    // zIndex: 1,
                }}>
                    {/* Submit Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            py: 1.5,
                            textTransform: 'none',
                            borderRadius: 1,
                            mt: 1,
                            '&:hover': {
                                bgcolor: '#333'
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Create User'}
                    </Button>
                </Box>

            </Stack>
        </Box>
    );
};

export default NewUserForm;