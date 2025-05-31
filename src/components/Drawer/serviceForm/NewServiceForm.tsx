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

interface NewServiceFormProps {
    onSubmit: (data: any) => void;

}


const NewServiceForm = ({ onSubmit }: NewServiceFormProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',

    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const ServiceCenterRequestbody = {};

    console.log("onSubmit", onSubmit);

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // onSubmit(formData);
        setLoading(true);
        try {
            const response = await JC_Services("JAPPCARE", "service", "POST", formData, connectedUsers.accessToken)
            console.log("response", response);
            console.log("formData", formData);

            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201) {
                setSuccessMessage("Service created successfully");

                setFormData({
                    title: '',
                    description: '',
                })

            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.details || 'Unauthorized to perform action');

            } else if (response && response.body.meta.statusCode === 409) {
                setErrorMessage('This Data already exists');
            }
            else {
                // Handle error
                setErrorMessage(response.body.details || "An error occurred while creating service");
            }
        }
        catch (error) {
            setErrorMessage("An error occurred while creating service");
        }
        setLoading(false);
    }

    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
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
            <Stack spacing={3} sx={{ mb: 21 }}>
                <TextField
                    fullWidth
                    label="Title"
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
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                p: 2
            }}>
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
                    {loading ? <CircularProgress size={24} /> : 'Create service'}
                </Button>
            </Box>
        </Box>
    );
};

export default NewServiceForm;