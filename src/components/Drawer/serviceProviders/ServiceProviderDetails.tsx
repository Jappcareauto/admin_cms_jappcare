import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Alert, IconButton, CircularProgress, Chip, FormControlLabel, Switch } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import Images from '../../../assets/Images/Images';
import { ImageViewer } from '../../ImageViewer/ImageViewer';
import LocationIcon from '../../Icones/LocationIcon';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import ConfirmDialog from '../../dialogs/DeleteDialog';
import { formatValue } from '../../../tools/formatValue';
import ReusableGoogleMap from '../../googleMapIntegration/ReusableGoogleMap';
import { Service, ServiceProviderData, Users } from '../../../interfaces/Interfaces';


interface ServiceProviderDetailsProps {
    serviceProviderId?: string | number;
    initialEditMode?: boolean;
    onEditProfile?: () => void;
    onSeeStatistics?: () => void;
    onClose?: () => void;
}


const ServiceProviderDetails = ({ serviceProviderId, initialEditMode = false, onClose }: ServiceProviderDetailsProps) => {
    const [isEditMode, setIsEditMode] = useState(initialEditMode);
    const [loading, setLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    // Form data state
    const [serviceProviderData, setServiceProviderData] = useState<ServiceProviderData>({
        name: '',
        description: '',
        location: {
            latitude: 4.0511,
            longitude: 9.7679,
            name: '',
            description: ''
        },
        category: '',
        available: true,
        rating: 0,
        images: [],
        services: []
    });

    // Additional states for edit mode
    const [serviceData, setServiceData] = useState<Service[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [userAccounts, setUserAccounts] = useState<Users[]>([]);
    const [selectedOwner, setSelectedOwner] = useState<Users | null>(null);

    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const token = connectedUsers.accessToken;
    const userId = connectedUsers.id;

    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    useEffect(() => {
        setIsEditMode(initialEditMode);
    }, [initialEditMode]);

    // Fetch service provider details when component mounts
    useEffect(() => {
        if (serviceProviderId) {
            fetchServiceProviderDetails(serviceProviderId);
        }
    }, [serviceProviderId]);

    // Fetch additional data needed for edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchEditModeData = async () => {
                await Promise.all([
                    fetchServices(),
                    fetchUserAccounts()
                ]);
            };
            fetchEditModeData();

            if (serviceProviderData.name) {
                if (serviceProviderData.services && Array.isArray(serviceProviderData.services) && serviceProviderData.services.length > 0) {
                    setSelectedServices(serviceProviderData.services);
                } else if (serviceProviderData.category && !selectedServices.includes(serviceProviderData.category)) {
                    setSelectedServices([serviceProviderData.category]);
                }
            }
        }
    }, [isEditMode, serviceProviderData.name]);

    useEffect(() => {
        if (userAccounts.length > 0 && serviceProviderData.owner && serviceProviderData.owner.id && !selectedOwner) {
            const matchingOwner = userAccounts.find(user =>
                user.id.toString() === serviceProviderData.owner?.id?.toString()
            );
            if (matchingOwner) {
                setSelectedOwner(matchingOwner);
            }
        }
    }, [userAccounts, serviceProviderData.owner, selectedOwner]);

    useEffect(() => {
        if (serviceData.length > 0 && serviceProviderData.category && selectedServices.length === 0) {
            const matchingService = serviceData.find(service =>
                service.title.toLowerCase() === serviceProviderData.category.toLowerCase()
            );

            if (matchingService) {
                setSelectedServices([matchingService.title]);
            } else {
                setSelectedServices([serviceProviderData.category]);
            }
        }
    }, [serviceData, serviceProviderData.category, selectedServices.length]);

    const fetchServiceProviderDetails = async (id: string | number) => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `service-center/${id}`, 'GET', {}, token);
            console.log("fetchServiceProviderDetailsResp", response);

            if (response && response.body.meta.statusCode === 200) {
                const data = response.body.data;
                setServiceProviderData(data);

                if (data.services && Array.isArray(data.services) && data.services.length > 0) {
                    setSelectedServices(data.services);
                } else if (data.category) {
                    setSelectedServices([data.category]);
                }

                if (data.owner && data.owner.id) {
                    setSelectedOwner(data.owner);
                }
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching service provider details');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
        setLoading(false);
    };

    const fetchServices = async () => {
        try {
            const response = await JC_Services('JAPPCARE', `service/list`, 'POST', {}, token);
            if (response && response.body.meta.statusCode === 200) {
                setServiceData(response.body.data);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchUserAccounts = async () => {
        try {
            const response = await JC_Services('JAPPCARE', `user/list`, 'POST', {}, token);
            console.log("fetchUserAccountsResp", response);

            if (response && response.body.meta.statusCode === 200) {
                setUserAccounts(response.body.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setServiceProviderData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLocationChange = (location: { lat: number; lng: number; address?: string }) => {
        setServiceProviderData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                latitude: location.lat,
                longitude: location.lng,
                name: location.address || prev.location.name,
                description: location.address || prev.location.description
            }
        }));
    };

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setViewerOpen(true);
    };

    const handleServiceSelect = (serviceTitle: string) => {
        setSelectedServices(prev => {
            const isSelected = prev.includes(serviceTitle);
            if (isSelected) {
                return prev.filter(s => s !== serviceTitle);
            } else {
                return [...prev, serviceTitle];
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const updateData = {
                name: serviceProviderData.name,
                location: {
                    latitude: serviceProviderData.location.latitude,
                    longitude: serviceProviderData.location.longitude,
                    name: serviceProviderData.location.name,
                    description: serviceProviderData.location.description
                },
                category: selectedServices.length > 0 ? selectedServices[0] : serviceProviderData.category,
                available: serviceProviderData.available,
                updatedBy: userId,
                ...(selectedOwner && { ownerId: selectedOwner.id })
            };

            console.log("updateData", updateData);

            const response = await JC_Services('JAPPCARE', `service-center/${serviceProviderId}/update`, 'PUT', updateData, token);
            console.log("updateServiceProviderResp", response);

            if (response && (response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201)) {
                setSuccessMessage("Service provider updated successfully");
                setIsEditMode(false);
                if (serviceProviderId) fetchServiceProviderDetails(serviceProviderId);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage(response.body.meta.message || 'Error updating service provider');
            }
        } catch (error) {
            console.error("Error updating service provider:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        setOpenConfirmDialog(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        setOpenConfirmDialog(false);

        try {
            const response = await JC_Services('JAPPCARE', `service-center/${serviceProviderId}`, 'DELETE', {}, token);
            console.log("deleteServiceProviderResp", response);

            if (response && response.body.meta.statusCode === 200) {
                setSuccessMessage("Service provider deleted successfully");
                setTimeout(() => {
                    if (onClose) onClose();
                }, 1500);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage(response.body.meta.message || 'Error deleting service provider');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceProviderData(prev => ({
            ...prev,
            available: event.target.checked
        }));
    };

    const getServiceIcon = (serviceTitle: string): string => {
        const title = serviceTitle.toLowerCase();

        if (title.includes('maintenance') || title.includes('repair') || title.includes('mechanic')) {
            return Images.maintainanceicon || '/default-maintenance.png';
        }
        if (title.includes('body') || title.includes('paint') || title.includes('collision')) {
            return Images.bodyshopicon || '/default-bodyshop.png';
        }
        if (title.includes('clean') || title.includes('wash') || title.includes('detail')) {
            return Images.deepcleaningicon || '/default-cleaning.png';
        }

        const defaultIcons = [
            Images.maintainanceicon,
            Images.bodyshopicon,
            Images.deepcleaningicon
        ].filter(Boolean);

        if (defaultIcons.length > 0) {
            const hash = serviceTitle.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
            return defaultIcons[Math.abs(hash) % defaultIcons.length];
        }

        return '/default-service.png';
    };

    if (loading && !serviceProviderData.name) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* Success and Error Messages */}
            {successMessage && (
                <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                    action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseMessage}>
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
                        <IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseMessage}>
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </Alert>
            )}

            <Box sx={{ flex: 1, overflow: 'auto', pb: isEditMode ? 12 : 9 }}>
                {isEditMode ? (
                    // Edit Mode
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={3} sx={{ mt: 2 }}>
                            {/* Owner Selection */}
                            {/* <Autocomplete
                                options={userAccounts}
                                getOptionLabel={(option) => option.name}
                                value={selectedOwner}
                                onChange={(_event, newValue) => setSelectedOwner(newValue)}
                                sx={{
                                    '& .MuiAutocomplete-popper': {
                                        backgroundColor: 'white'
                                    }
                                }}
                                slotProps={{
                                    paper: {
                                        sx: {
                                            backgroundColor: 'white',
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            borderRadius: 1
                                        }
                                    },
                                    listbox: {
                                        sx: {
                                            backgroundColor: 'white',
                                            padding: 1
                                        }
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="Owner"
                                        placeholder="Select owner"
                                        variant="outlined"
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="body1">{option.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {option.email} • {option.status}
                                            </Typography>
                                        </Box>
                                    </li>
                                )}
                            /> */}

                            {/* Name Field */}
                            <TextField
                                fullWidth
                                label="Service Provider Name"
                                name="name"
                                value={serviceProviderData.name}
                                onChange={handleChange}
                                required
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={serviceProviderData.available}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1">Service Available</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {serviceProviderData.available ? 'Service center will be available for bookings' : 'Service center will be unavailable for bookings'}
                                        </Typography>
                                    </Box>
                                }
                                sx={{ mb: 1 }}
                            />

                            {/* Services Section */}
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                                    Services
                                </Typography>

                                {selectedServices.length > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                            Selected Services:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {selectedServices.map((service) => (
                                                <Chip
                                                    key={service}
                                                    label={formatValue(service)}
                                                    onDelete={() => handleServiceSelect(service)}
                                                    color="primary"
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                <Grid container spacing={1}>
                                    {serviceData.map((service) => {
                                        const isSelected = selectedServices.includes(service.title);
                                        const serviceIcon = getServiceIcon(service.title);

                                        return (
                                            <Grid item xs={4} key={service.id}>
                                                <Box
                                                    sx={{
                                                        bgcolor: isSelected ? '#E56A2F' : '#FFEDE6',
                                                        borderRadius: 1,
                                                        p: 2,
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.3s',
                                                        border: isSelected ? '2px solid #E56A2F' : '2px solid transparent',
                                                        '&:hover': {
                                                            bgcolor: isSelected ? '#E56A2F' : '#FFE0D1'
                                                        }
                                                    }}
                                                    onClick={() => handleServiceSelect(service.title)}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '12px',
                                                            textAlign: 'center',
                                                            lineHeight: 1.2,
                                                            mb: 2,
                                                            color: isSelected ? 'white' : 'inherit',
                                                            fontWeight: isSelected ? 600 : 400
                                                        }}
                                                    >
                                                        {formatValue(service.title)}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <img
                                                            src={serviceIcon}
                                                            alt={service.title}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>

                            {/* Location Section with Reusable Map */}
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                                    Location
                                </Typography>

                                <ReusableGoogleMap
                                    apiKey="AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I"
                                    containerId="edit-provider-map"
                                    initialLocation={{
                                        lat: serviceProviderData.location.latitude,
                                        lng: serviceProviderData.location.longitude
                                    }}
                                    onLocationChange={handleLocationChange}
                                    initialSearchAddress={serviceProviderData.location.name}
                                    height={200}
                                    zoom={14}
                                    markerTitle={serviceProviderData.name || "Service Provider"}
                                    searchPlaceholder="Search for a location"
                                />
                            </Box>
                        </Stack>
                    </Box>
                ) : (
                    // View Mode
                    <>
                        {/* Profile Section */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                            <Avatar
                                sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: '#1A1D1F',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#FF7A00',
                                    border: '2px solid #FF7A00',
                                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                                }}
                            >
                                {serviceProviderData.name?.charAt(0)?.toUpperCase() || 'SP'}
                            </Avatar>
                            <Box sx={{ ml: 2, flex: 1 }}>
                                <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500 }}>
                                    {serviceProviderData.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1 }}>
                                    <LocationIcon fill='#FF7A00' stroke='#FF7A00' />
                                    <Typography sx={{ fontSize: '14px', color: 'text.secondary', mr: 1 , ml: 1 }}>
                                        {serviceProviderData.location.name || 'Location not set'}
                                    </Typography>
                                    {/* <StarIcon sx={{ fontSize: 16, color: '#FF7A00', mr: 0.5 }} /> */}
                                    {/* <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                                        {serviceProviderData.rating || '4.75'}
                                    </Typography> */}
                                </Box>
                            </Box>
                        </Box>

                        {/* Description */}
                        {serviceProviderData.description && (
                            <Typography sx={{ fontSize: '14px', color: 'text.secondary', mb: 3 }}>
                                {serviceProviderData.description}
                            </Typography>
                        )}

                        {/* Images Section */}
                        {serviceProviderData.images && serviceProviderData.images.length > 0 && (
                            <>
                                <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                                    Images
                                </Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: 1,
                                    mb: 3
                                }}>
                                    {serviceProviderData.images.map((img, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => handleImageClick(index)}
                                            component="button"
                                            sx={{
                                                width: '100%',
                                                height: '80px',
                                                position: 'relative',
                                                p: 0,
                                                border: 'none',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                borderRadius: 1,
                                                '&:hover': {
                                                    '& img': {
                                                        transform: 'scale(1.05)',
                                                    }
                                                }
                                            }}
                                        >
                                            <img
                                                src={img}
                                                alt={`Service provider image ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.2s ease-in-out'
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}

                        {/* Services Section */}
                        <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                            Services
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                            {(serviceProviderData.services && serviceProviderData.services.length > 0) ? (
                                serviceProviderData.services.map((service, index) => (
                                    <Chip
                                        key={index}
                                        label={formatValue(service)}
                                        sx={{
                                            bgcolor: '#FFEDE6',
                                            color: '#E56A2F',
                                            fontWeight: 500,
                                            '&:hover': {
                                                bgcolor: '#FFE0D1'
                                            }
                                        }}
                                    />
                                ))
                            ) : (
                                <Chip
                                    label={formatValue(serviceProviderData.category)}
                                    sx={{
                                        bgcolor: '#FFEDE6',
                                        color: '#E56A2F',
                                        fontWeight: 500
                                    }}
                                />
                            )}
                        </Box>

                        {/* Location Section with Reusable Map */}
                        <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                            Location
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <ReusableGoogleMap
                                apiKey="AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I"
                                containerId="view-provider-map"
                                initialLocation={{
                                    lat: serviceProviderData.location.latitude,
                                    lng: serviceProviderData.location.longitude
                                }}
                                height={200}
                                zoom={14}
                                markerTitle={serviceProviderData.name || "Service Provider"}
                                markerDraggable={false}
                                showSearch={false}
                            />
                        </Box>

                        {/* Owner Information */}
                        {serviceProviderData.owner && (
                            <>
                                <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                                    Owner Information
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: '#f8f9fa',
                                    borderRadius: 1,
                                    mb: 3,
                                    border: '1px solid rgba(0, 0, 0, 0.12)'
                                }}>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>
                                        {serviceProviderData.owner.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                                        {serviceProviderData.owner.email}
                                    </Typography>
                                </Box>
                            </>
                        )}

                        {/* Status */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, mr: 1 }}>
                                Status:
                            </Typography>
                            <Chip
                                label={serviceProviderData.available ? 'Available' : 'Unavailable'}
                                color={serviceProviderData.available ? 'success' : 'error'}
                                size="small"
                            />
                        </Box>
                    </>
                )}
            </Box>

            {/* Image Viewer */}
            {viewerOpen && selectedImageIndex !== undefined && serviceProviderData.images && (
                <ImageViewer
                    open={viewerOpen}
                    images={serviceProviderData.images}
                    initialIndex={selectedImageIndex}
                    onClose={() => {
                        setViewerOpen(false);
                        setSelectedImageIndex(undefined);
                    }}
                />
            )}

            {/* Fixed Action Buttons */}
            <Box
                sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    p: 2,
                    display: 'flex',
                    gap: 1,
                    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                {isEditMode ? (
                    <>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                flex: 1,
                                bgcolor: '#FF7A00',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: '#E56A2F'
                                }
                            }}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                flex: 1,
                                borderColor: '#FF7A00',
                                color: '#FF7A00',
                                '&:hover': {
                                    borderColor: '#E56A2F',
                                    color: '#E56A2F',
                                    bgcolor: 'rgba(255, 122, 0, 0.04)'
                                }
                            }}
                            onClick={() => setIsEditMode(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ minWidth: 'auto', px: 2 }}
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            sx={{
                                flex: 1,
                                bgcolor: '#FF7A00',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: '#E56A2F'
                                }
                            }}
                            onClick={() => setIsEditMode(true)}
                        >
                            Edit Profile
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ flex:1, px: 2 }}
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                        {/* {onSeeStatistics && (
                            <Button
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    borderColor: '#FF7A00',
                                    color: '#FF7A00',
                                    '&:hover': {
                                        borderColor: '#E56A2F',
                                        color: '#E56A2F',
                                        bgcolor: 'rgba(255, 122, 0, 0.04)'
                                    }
                                }}
                                onClick={onSeeStatistics}
                            >
                                See Statistics
                            </Button>
                        )} */}
                    </>
                )}
            </Box>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                open={openConfirmDialog}
                title="Delete Service Provider"
                message="Are you sure you want to delete this service provider? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setOpenConfirmDialog(false)}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </Box>
    );
};

export default ServiceProviderDetails;