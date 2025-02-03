import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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

const SERVICE_TYPES = [
    "VEHICLE_REPAIR",
    "VIN_DETECTION",
    "EXHAUST_SYSTEM_REPAIR",
    "WASH_AND_DETAILING",
    "VEHICLE_HISTORY_CHECK",
    "FUEL_SYSTEM_SERVICE",
    "SUSPENSION_REPAIR",
    "CUSTOM",
    "AIR_CONDITIONING_SERVICE",
    "PRE_PURCHASE_INSPECTION",
    "VIN_DETECTION_PREMIUM",
    "TIRE_REPLACEMENT",
    "PAINT_JOB",
    "EMISSIONS_TESTING",
    "VEHICLE_MAINTENANCE",
    "BRAKE_INSPECTION",
    "ENGINE_DIAGNOSTICS",
    "BODYWORK_REPAIR",
    "TRANSMISSION_REPAIR",
    "BATTERY_REPLACEMENT",
    "INSURANCE_INSPECTION",
    "ELECTRICAL_SYSTEM_CHECK"
];

const NewServiceForm = ({ onSubmit }: NewServiceFormProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        definition: '',
        serviceCenterId: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [serviceCenterData, setServiceCenterData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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

            if (response && response.status === 200 || response.status === 201) {
                setSuccessMessage("Service created successfully");

            } else if (response && response.status === 401) {
                setErrorMessage(response.body.details || 'Unauthorized to perform action');

            } else if (response && response.status === 409) {
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

    const fetchServiceCenter = async () => {
        try {

            const response = await JC_Services('JAPPCARE', `service-center`, 'GET', "", connectedUsers.accessToken);
            console.log("resp", response);
            if (response && response.status === 200) {
                setServiceCenterData(response.body.data);
            } else if (response && response.status === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('No Data Found');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

    };

    useEffect(() => {
        fetchServiceCenter();
    }, [])

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

                <TextField
                    select
                    fullWidth
                    label="Definition"
                    name="definition"
                    value={formData.definition}
                    onChange={handleChange}
                    required
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
                // sx={{
                //     '& .MuiSelect-select': {
                //         // bgcolor: 'white'
                //     },
                //     '& .MuiMenu-paper': {
                //         // bgcolor: 'white'
                //     }
                // }}
                >
                    <MenuItem value="" disabled selected>Select Definition</MenuItem>
                    {SERVICE_TYPES.map((service) => (
                        <MenuItem key={service} value={service} sx={{ bgcolor: "white" }}>
                            {service.replace(/_/g, " ")} {/* Converts ENUM format to readable text */}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="Service Center"
                    name="serviceCenterId"
                    value={formData.serviceCenterId}
                    onChange={handleChange}
                    required
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
                    <MenuItem value="" disabled>Select Service Center</MenuItem>
                    {Array.isArray(serviceCenterData) && serviceCenterData.length > 0 ? (
                        serviceCenterData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="">No Service Center available</MenuItem>
                    )}
                </TextField>


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