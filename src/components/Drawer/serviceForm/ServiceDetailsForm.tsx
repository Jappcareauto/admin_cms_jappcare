import { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Stack,
    Alert,
    CircularProgress,
    Typography,
    IconButton
} from '@mui/material';
import EditIcon from '../../Icones/EditIcon';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';

interface ServiceDetailsProps {
    serviceId: string | number;
    initialEditMode?: boolean;
    onSubmit: () => void;
    onClose: () => void;
}

interface ServiceData {
    id: string | number;
    title: string;
    description: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

const ServiceDetails = ({ serviceId, initialEditMode = false, onSubmit, onClose }: ServiceDetailsProps) => {
    const [isEditMode, setIsEditMode] = useState(initialEditMode);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [serviceData, setServiceData] = useState<ServiceData>({
        id: '',
        title: '',
        description: ''
    });

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state
    );
    const token = connectedUsers.accessToken;

    // Fetch service details
    const fetchServiceDetails = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `service/${serviceId}`, 'GET', {}, token);
            console.log("fetchServiceDetailsResp", response);
            
            if (response && response.body.meta.statusCode === 200) {
                setServiceData(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching service details');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (serviceId) {
            fetchServiceDetails();
        }
    }, [serviceId]);

    useEffect(() => {
        setIsEditMode(initialEditMode);
    }, [initialEditMode]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle update service
    const handleUpdateService = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const updatePayload = {
                title: serviceData.title,
                description: serviceData.description
            };

            const response = await JC_Services(
                'JAPPCARE', 
                `service/${serviceId}`, 
                'PUT', 
                updatePayload, 
                token
            );
            
            console.log("updateServiceResp", response);

            if (response && (response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201)) {
                setSuccessMessage('Service updated successfully!');
                setIsEditMode(false);
                
                // Refresh service details
                await fetchServiceDetails();
                
                // Notify parent component
                setTimeout(() => {
                    onSubmit();
                }, 1500);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage(response.body.meta.message || 'Error updating service');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
        setLoading(false);
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        if (isEditMode) {
            // If canceling edit, reload original data
            fetchServiceDetails();
        }
        setIsEditMode(!isEditMode);
        setErrorMessage('');
        setSuccessMessage('');
    };

    if (loading && !serviceData.id) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                <CircularProgress />
            </Box>
        );
    }

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
        <Box component="form">
            {/* Header with Edit Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 100 , fontStyle: 'italic'}}>
                    {/* {isEditMode ? 'Edit Service' : 'Read Details'} */}
                </Typography>
                {!isEditMode && (
                    <IconButton onClick={toggleEditMode} size="small">
                        <EditIcon fill='#111111' />
                    </IconButton>
                )}
            </Box>

            {/* Alert Messages */}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Form Fields */}
            <Stack spacing={3}>
                <TextField
                    label="Service Title"
                    name="title"
                    value={serviceData.title}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditMode}
                    // variant={isEditMode ? "outlined" : "filled"}
                    // InputProps={{
                    //     readOnly: !isEditMode,
                    // }}
                />

                <TextField
                    label="Description"
                    name="description"
                    value={serviceData.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    disabled={!isEditMode}
                    // variant={isEditMode ? "outlined" : "filled"}
                    // InputProps={{
                    //     readOnly: !isEditMode,
                    // }}
                />

                {/* Metadata (Read-only) */}
                {!isEditMode && (
                    <>
                        <TextField
                            label="Service ID"
                            value={serviceData.id}
                            fullWidth
                            disabled
                            
                        />
                        
                        {serviceData.createdAt && (
                            <TextField
                                label="Created At"
                                name="createdAt"
                                value={new Date(serviceData.createdAt).toLocaleString()}
                                fullWidth
                                disabled
                            />
                        )}

                    
                        
                        {serviceData.updatedAt && (
                            <TextField
                                label="Updated At"
                                value={new Date(serviceData.updatedAt).toLocaleString()}
                                fullWidth
                                disabled
                                
                            />
                        )}
                    </>
                )}

                {/* Action Buttons */}

                 <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 1,
                               
                            }}>   
                    {isEditMode && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleUpdateService}
                            disabled={loading || !serviceData.title || !serviceData.description}
                            fullWidth
                            sx={{
                                bgcolor: '#FB7C37',
                                '&:hover': { bgcolor: '#E86B27' }
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update Service'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={toggleEditMode}
                            disabled={loading}
                            fullWidth
                            sx={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                )}

                            </Box>
                

                {!isEditMode && (
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
                        variant="outlined"
                        onClick={onClose}
                        fullWidth
                        sx={{
                            color: 'black',
                            borderColor: 'black',
                            mt: 2
                        }}
                    >
                        Close
                    </Button>

                   </Box>

                   
                )}
            </Stack>
        </Box>
        </Box>
    );
};

export default ServiceDetails;