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
import { Roles } from '../../../interfaces/Interfaces';

interface NewUserFormProps {
    onSubmit: (data: any) => void;
}

/// <reference types="@types/google.maps" />
declare global {
    interface Window {
        google: typeof google;
    }
}

const NewUserForm = ({ onSubmit }: NewUserFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        verified: true,
        role: ''
    });

    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Roles[]>([]);

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

            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201) {
                setSuccessMessage("User created successfully");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    verified: true,
                    role: ''
                })

            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.details || 'Unauthorized to perform action');

            } else if (response && response.body.meta.statusCode === 409) {
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

    const fetchRoles = async () => {
        setLoading(true);
        try {

            const response = await JC_Services('JAPPCARE', `authorities/roles`, 'GET', "", connectedUsers.accessToken);
            console.log("fetchroleresp", response);
            if (response && response.body.meta.statusCode === 200) {
                // setSuccessMessage('Successful!');
                setRoles(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching Roles');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);


    // useEffect(() => {
    //     const loadGoogleMapsScript = () => {
    //         const script = document.createElement('script');
    //         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I`;
    //         script.async = true;
    //         script.defer = true;
    //         script.onload = initializeMap;
    //         document.body.appendChild(script);
    //     };

    //     const initializeMap = () => {
    //         const map = new google.maps.Map(document.getElementById('provider-map-container') as HTMLElement, {
    //             center: { lat: 4.0511, lng: 9.7679 }, // Coordinates for Douala, Cameroon
    //             zoom: 14,
    //         });

    //         new google.maps.Marker({
    //             position: { lat: 4.0511, lng: 9.7679 },
    //             map,
    //             title: "Dave's Garage",
    //         });
    //     };

    //     if (!window.google) {
    //         loadGoogleMapsScript();
    //     } else {
    //         initializeMap();
    //     }
    // }, []);

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
                        {Array.isArray(roles) && roles.length > 0 ? (
                            roles.map((option) => (
                                <MenuItem key={option.id} value={option.definition}>
                                    {option.definition.replace("ROLE_", "").replace(/_/g, " ")}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">No Role available</MenuItem>
                        )}
                    </TextField>
                </Box>



                {/* Home Location Section - Prepared for API integration */}
                {/* <Box sx={{ mb: 2 }}>
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
                       
                        <div id="provider-map-container" style={{ width: '100%', height: '100%', background: '#f5f5f5' }} />

                    </Box>
                </Box> */}

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