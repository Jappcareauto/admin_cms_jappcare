import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Grid,
    styled,
    Button,
    Stack,
    Alert
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../components/Icones/TrashIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import EditIcon from '../../components/Icones/EditIcon';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import ConfirmDialog from '../../components/dialogs/DeleteDialog';
import NewServiceForm from '../../components/Drawer/serviceForm/NewServiceForm';
import ServiceDetails from '../../components/Drawer/serviceForm/ServiceDetailsForm';
import { formatValue } from '../../tools/formatValue';
import TipIcon from '../../components/Icones/TipsIcon';

// Interfaces
interface Service {
    id: string | number;
    title: string;
    description: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Styled Components
const StyledCard = styled(Card)(() => ({
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const ServicesList = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isServiceDetailsDrawerOpen, setIsServiceDetailsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)
    const [selectedServiceId, setSelectedServiceId] = useState<string | number | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    console.log("loading", loading);

    const token = connectedUsers.accessToken;

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `service/list`, 'GET', {}, token);
            console.log("fetchServiceResp", response);
            if (response && response.body.meta.statusCode === 200) {
                setServices(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching services');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDeleteService = async (serviceId: string | number) => {
        setSelectedServiceId(serviceId);
        setOpenConfirmDialog(true);
    };

    const confirmDeleteService = async (serviceId: string | number) => {
        setLoading(true);
        setOpenConfirmDialog(false);

        try {
            const response = await JC_Services('JAPPCARE', `service/${serviceId}`, 'DELETE', "", token);
            console.log("deleteServiceResp", response);
            console.log("serviceId", serviceId);

            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201 || response.status === 204) {
                handleAlert("Service deleted successfully", false);
                // Refresh services list
                fetchServices();
            } else if (response && response.body.meta.statusCode === 401) {
                handleAlert(response.body.meta.message || 'Unauthorized to perform action', true);
            } else {
                handleAlert(response.body.meta.message || 'Error deleting service', true);
            }
        } catch (error) {
            console.error("Error:", error);
            handleAlert("Network Error Try Again Later!!!!", true);
        }
        setLoading(false);
    };

    // Handle alert messages
    const handleAlert = (message: string, isError: boolean) => {
        if (isError) {
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(''), 6000);
        } else {
            setSuccessMessage(message);
            setTimeout(() => setSuccessMessage(''), 6000);
        }
    };

    const handleCloseServiceDetails = () => {
        setIsServiceDetailsDrawerOpen(false);
        setSelectedServiceId(null);
        fetchServices(); // Refresh the list in case updates were made
    };

    // Handler for new service submission
    const handleNewService = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Refresh the services list after creating a new service
        fetchServices();
    };

    // Open service details drawer
    const openServiceDetails = (serviceId: string | number) => {
        setSelectedServiceId(serviceId);
        setIsServiceDetailsDrawerOpen(true);
    };

    const [isEditModeInitial, setIsEditModeInitial] = useState(false);
    const openServiceEdit = (serviceId: string | number) => {
        setSelectedServiceId(serviceId);
        setIsServiceDetailsDrawerOpen(true);
        // Pass initialEditMode flag to ServiceDetails
        setIsEditModeInitial(true);
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Services
                    </Typography>
                </Box>
                <Stack direction={"row"} spacing={2.5}>
                    <Button 
                        onClick={() => setIsDrawerOpen(true)}
                        variant="outlined" 
                        sx={{ 
                            borderRadius: 2, 
                            mb: 2, 
                            color: 'black', 
                            borderColor: 'black', 
                            padding: "20px 16px", 
                            width: 130, 
                            height: 40 
                        }}
                    >
                        New Service
                    </Button>
                </Stack>
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

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {[
                    { value: `${services.length}`, label: 'Total Services' },
                ].map((stat, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <StyledCard>
                            <CardContent>
                                <Box>
                                    <Typography variant="h4" color="#000000" fontWeight="bold">
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            <Grid item xs={12} md={8}>
                {/* Services List */}
                {
                    services.length > 0 ? (
                        services.map((service, index) => (
                            <Box
                                key={service.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                    borderBottom: index !== services.length - 1 ? '1px solid #E4E4E4' : 'none',
                                }}
                            >
                                {/* Service Title */}
                                <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                                        {formatValue(service.title)}
                                    </Typography>
                                </Box>

                                {/* Service Description */}
                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                        {service.description}
                                    </Typography>
                                </Box>

                                {/* Actions */}
                                <Box sx={{
                                    display: 'flex', 
                                    width: 100, 
                                    justifyContent: 'flex-end', 
                                    gap: 2,
                                    ml: 'auto'
                                }}>
                                    <IconButton 
                                        size="small" 
                                        onClick={() => handleDeleteService(service.id)} 
                                        disabled={loading}
                                    >
                                        <TrashIcon stroke='#141B34' fill='' />
                                    </IconButton>
                                    <IconButton 
                                        size="small" 
                                        sx={{ color: '#FB7C37' }} 
                                        onClick={() => openServiceEdit(service.id)}
                                    >
                                        <EditIcon fill='#111111' />
                                    </IconButton>
                                    <IconButton 
                                        size="small" 
                                        sx={{ color: '#FB7C37' }} 
                                        onClick={() => openServiceDetails(service.id)}
                                    >
                                        {/* <Typography sx={{ fontSize: '1.2rem' }}>📋</Typography> */}
                                        <TipIcon fill='#111111' />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{
                            p: 4,
                            textAlign: 'center',
                            border: '1px dashed #ccc',
                            borderRadius: 2,
                            bgcolor: '#f9f9f9'
                        }}>
                            <Typography color="text.secondary">
                                No Services available. Add a new service to get started.
                            </Typography>
                        </Box>
                    )
                }
            </Grid>

            {/* New Service Drawer */}
            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="New Service"
            >
                <NewServiceForm
                    onSubmit={handleNewService}
                />
            </CustomDrawer>

            {/* Service Details Drawer */}
            <CustomDrawer
                open={isServiceDetailsDrawerOpen}
                onClose={() => {
                    handleCloseServiceDetails();
                    setIsEditModeInitial(false); // Reset the flag
                }}
                title={isEditModeInitial ? "Edit Service" : "Service Details"}
            >
                <ServiceDetails
                    serviceId={selectedServiceId || ''}
                    initialEditMode={isEditModeInitial}
                    onSubmit={() => {
                        console.log('Submitting');
                        handleCloseServiceDetails();
                    }}
                    onClose={() => {
                        handleCloseServiceDetails();
                        setIsEditModeInitial(false); // Reset the flag
                    }}
                />
            </CustomDrawer>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                open={openConfirmDialog}
                title="Confirm Deletion"
                message="Are you sure you want to delete this service? This action cannot be undone."
                onConfirm={() => {
                    confirmDeleteService(selectedServiceId!);
                    setOpenConfirmDialog(false);
                }}
                onCancel={() => setOpenConfirmDialog(false)}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </Box>
    );
};

export default ServicesList;