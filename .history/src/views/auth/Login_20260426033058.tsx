import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginImg from '../../assets/LoginImgPage.svg';
import { iUsersAction, iUsersConnected } from '../../interfaces/UsersInterface';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { JC_Services } from '../../services';
import { useSelector } from 'react-redux';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "", extend: true });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    // console.log("credentials", credentials);

    const handleLogin = async () => {
        if (!credentials.email || !credentials.password) {
            setErrorMessage('Please enter both email and password');
            return;
        }
        try {
            setLoading(true);
            const response = await JC_Services("JAPPCARE", 'auth/login', 'POST', credentials);

            if (response && response.body.meta.statusCode === 200) {
                const users: iUsersConnected = response.body.data;

                const action: iUsersAction = {
                    type: "LOGIN",
                    users: users
                }
                dispatch(action);

                // After dispatching the login action, get the token from the store
                try {
                    // Assuming the token is stored in the users object
                    const token = users.accessToken; // adjust this based on your actual structure
                    const userInfoResponse = await JC_Services("JAPPCARE", 'user/logged-in', 'GET', "", token);

                    if (userInfoResponse && userInfoResponse.body.meta.statusCode === 200) {
                        // Update the store with additional user info
                        const updatedUsers: iUsersConnected = {
                            ...users,
                            ...userInfoResponse.body.data,
                            accessTokenExpiry: Number(response.body.accessTokenExpiry),
                            refreshTokenExpiry: Number(response.body.refreshTokenExpiry)
                        };

                        const updateAction: iUsersAction = {
                            type: "LOGIN",
                            users: updatedUsers
                        }
                        dispatch(updateAction);
                    } else {
                        console.error('Failed to fetch user info:', userInfoResponse);
                    }
                } catch (userInfoError) {
                    console.error('Error fetching user info:', userInfoError);
                }

                // Navigate and set messages after attempting to fetch user info
                navigate('/dashboard');
                setSuccessMessage('Login successful!');
                setErrorMessage('');
            } else if (response && response.body.meta.statusCode === 401) {
                // Invalid credentials, handle error (display message, etc.)
                setErrorMessage('Invalid email or password');
            } else {
                // Login failed, handle error (display message, etc.)
                setErrorMessage(response.body.meta.message);
                setSuccessMessage('');
                console.error('Login failed:', response.body.meta.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred during login. Try again later.');
            console.error('Error:', error);
        }
        setLoading(false);
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    //     setCredentials({ ...credentials, [key]: e.target.value });
    // };

    const handleChange = (e: { target: { value: any; }; }, field: any) => {
        setCredentials(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        // Clear error message when user starts typing
        if (errorMessage) setErrorMessage('');
    };

    // Handle form submission with Enter key
    // const handleKeyPress = (e: { key: string; }) => {
    //     if (e.key === 'Enter' && !loading) {
    //         handleLogin();
    //     }
    // };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                minHeight: '100dvh',
                overflow: 'hidden',
            }}
        >
            {/* Left side with logo */}
            <Box
                sx={{
                    width: { xs: '0%', md: '50%' },
                    bgcolor: '#eb7a34',
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 3,
                }}
            >
                <Box
                    component="img"
                    src={LoginImg}
                    alt="Jappcare login illustration"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={560}
                    height={560}
                    sx={{
                        width: 'min(70%, 560px)',
                        height: 'auto',
                        maxHeight: '70vh',
                    }}
                />
            </Box>

            {/* Right side with login form */}
            <Box
                sx={{
                    width: { xs: '100%', md: '50%' },
                    bgcolor: '#FDEEE7', // Softer pastel background
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        width: '100%',
                        maxWidth: '420px',
                        p: { xs: 2.5, sm: 3.5, md: 4 },
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

                    {errorMessage && (
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    )}

                    {successMessage && (
                        <Alert severity='success'>
                            {successMessage}
                        </Alert>
                    )}

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
                            value={credentials.email}
                            onChange={(e) => handleChange(e, 'email')}
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
                            value={credentials.password}
                            onChange={(e) => handleChange(e, 'password')}
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
                                mb: 3,
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
                                bgcolor: '#111111',
                                color: 'white',
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#555',
                                },
                            }}
                            onClick={handleLogin}
                        >
                            {loading ? <CircularProgress size={24} color='inherit' /> : "Sign In"}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Login;
