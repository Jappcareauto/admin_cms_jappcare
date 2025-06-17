import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Alert, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface NewTipFormProps {
    onSubmit: (data: any) => void;
}

const NewTip = ({ onSubmit }: NewTipFormProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const token = connectedUsers.accessToken;
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

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
        console.log("submit", onSubmit);

        try {
            const response = await JC_Services('JAPPCARE', 'tip', 'POST', formData, token);
            console.log("response", response);
            console.log("formData", formData);

            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201) {
                setSuccessMessage("Tip created successfully");
                setFormData({
                    title: '',
                    description: '',
                })
                onSubmit(response.body.data);

            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.details || 'Unauthorized to perform action');

            } else if (response && response.body.meta.statusCode === 409) {
                setErrorMessage('This Data already exists');
            }
            else {
                // Handle error
                setErrorMessage(response.body.details || "An error occurred while creating user");
            }
        } catch (error) {
            console.error("Error creating tip:", error);
            setErrorMessage('An error occurred while creating tip');
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden' // Prevent scrolling of the entire drawer
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    flex: 1,
                    overflow: 'auto', // Allow scrolling of the form content
                    p: 0,
                    pb: 9,// Add padding to prevent content from being hidden behind button
                    pt: 3
                }}
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
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Tip Summary"
                        placeholder='e.g Always rotate your car tires regularly'
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                    />
                </Stack>

                {/* Button Section */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            color: 'white',
                            bgcolor: '#000',
                            py: 1.5,
                            '&:hover': { bgcolor: '#333', borderColor: '#333' }
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Save Tip'}

                    </Button>
                </Box>
            </Box>


        </Box>
    );
};

export default NewTip;