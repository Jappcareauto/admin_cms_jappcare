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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImageIcon from '../../Icones/ImageIcon';
import { Grid, Snackbar, Alert, Chip, Switch, FormControlLabel } from '@mui/material';
import Images from '../../../assets/Images/Images';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import { formatValue } from '../../../tools/formatValue';
import { Service, ServiceCenterRequest, Users } from '../../../interfaces/Interfaces';
import ReusableGoogleMap from '../../googleMapIntegration/ReusableGoogleMap';

interface NewServiceProviderFormProps {
    onSubmit?: (data: any) => void;
}

interface LocationData {
    lat: number;
    lng: number;
    address?: string;
}

interface ServiceCenterServiceLink {
    id?: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: string;
    updatedAt?: string;
    serviceCenterId: string;
    serviceId: string;
    price: number;
    durationMinutes: number;
    available: boolean;
}

const NewServiceProviderForm = ({ onSubmit }: NewServiceProviderFormProps) => {
    const [formData, setFormData] = useState({
        companyName: '',
        name: '',
        email: '',
        password: '',
        homeAddress: '',
        phoneNumber: '',
        percentageCommission: '',
        countryCode: '+237',
        selectedUserId: '',
        available: true
    });

    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [serviceData, setServiceData] = useState<Service[]>([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [servicesPerPage] = useState(6);
    const [location, setLocation] = useState<LocationData>({ lat: 4.0511, lng: 9.7679 });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userAccounts, setUserAccounts] = useState<Users[]>([]);
    const [userAccountsLoading, setUserAccountsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const userId = connectedUsers.id;
    const token = connectedUsers.accessToken;

    // Service icon mapping - maps service titles to appropriate icons
    const getServiceIcon = (serviceTitle: string): string => {
        const title = serviceTitle.toLowerCase();

        // Check for specific service types and return appropriate icons
        if (title.includes('maintenance') || title.includes('repair') || title.includes('mechanic')) {
            return Images.maintainanceicon || '/default-maintenance.png';
        }
        if (title.includes('body') || title.includes('paint') || title.includes('collision')) {
            return Images.bodyshopicon || '/default-bodyshop.png';
        }
        if (title.includes('clean') || title.includes('wash') || title.includes('detail')) {
            return Images.deepcleaningicon || '/default-cleaning.png';
        }
        if (title.includes('tire') || title.includes('wheel')) {
            return '/default-tire.png';
        }
        if (title.includes('oil') || title.includes('change')) {
            return '/default-oil.png';
        }
        if (title.includes('electric') || title.includes('battery')) {
            return '/default-electric.png';
        }
        if (title.includes('brake')) {
            return '/default-brake.png';
        }
        if (title.includes('engine')) {
            return '/default-engine.png';
        }
        if (title.includes('transmission')) {
            return '/default-transmission.png';
        }
        if (title.includes('diagnostic')) {
            return '/default-diagnostic.png';
        }

        // Default fallback icons based on first letter or random selection
        const defaultIcons = [
            Images.maintainanceicon,
            Images.bodyshopicon,
            Images.deepcleaningicon
        ].filter(Boolean); // Remove any undefined icons

        if (defaultIcons.length > 0) {
            // Use service ID or title to consistently select the same icon for the same service
            const hash = serviceTitle.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
            return defaultIcons[Math.abs(hash) % defaultIcons.length];
        }

        // Ultimate fallback - return a placeholder
        return '/default-service.png';
    };

    // Service request body for API call
    const serviceRequestbody = {};

    // Function to fetch services from API
    const fetchService = async () => {
        try {
            const response = await JC_Services('JAPPCARE', `service/list`, 'POST', serviceRequestbody, connectedUsers.accessToken);
            console.log("service resp", response);
            if (response && response.body.meta.statusCode === 200) {
                setServiceData(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('No Data Found');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
    };

    // Function to fetch user accounts
    const fetchAccounts = async () => {
        setUserAccountsLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `user/list`, 'POST', {}, token);
            console.log("fecthaccountresp", response);
            if (response && response.body.meta.statusCode === 200) {
                setUserAccounts(
                    response.body.data.filter((user: any) =>
                        user?.authorities?.authoritiesClear?.ROLE?.some(
                            (role: string) => role === "ROLE_ADMIN" || role === "ROLE_GARAGE_MANAGER" || role === "ROLE_SERVICE_MANAGER"
                        )
                    )
                ); // Filter out users with ROLE_ADMIN or ROLE_MANAGER
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching user accounts');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
        setUserAccountsLoading(false);
    };

    // Fetch accounts and services on component mount
    useEffect(() => {
        fetchAccounts();
        fetchService();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle service selection (multiple selection)
    const handleServiceSelect = (service: Service) => {
        setSelectedServices(prev => {
            const isSelected = prev.some(s => s.id === service.id);
            if (isSelected) {
                return prev.filter(s => s.id !== service.id);
            } else {
                return [...prev, service];
            }
        });
    };

    // Handle user selection
    const handleUserSelect = (_event: React.SyntheticEvent, value: Users | null) => {
        setFormData(prev => ({
            ...prev,
            selectedUserId: value ? value.id.toString() : ''
        }));
    };

    // Navigation functions for services
    const handlePrevServices = () => {
        setCurrentServiceIndex(prev => Math.max(0, prev - servicesPerPage));
    };

    const handleNextServices = () => {
        setCurrentServiceIndex(prev =>
            Math.min(serviceData.length - servicesPerPage, prev + servicesPerPage)
        );
    };

    // Get currently visible services
    const visibleServices = serviceData.slice(currentServiceIndex, currentServiceIndex + servicesPerPage);

    // Handle location change from map
    const handleLocationChange = (newLocation: LocationData) => {
        setLocation(newLocation);
    };

    // Handle address change from map
    const handleAddressChange = (address: string) => {
        setFormData(prev => ({
            ...prev,
            homeAddress: address
        }));
    };

    // Function to link services to service center
    const linkServicesToServiceCenter = async (serviceCenterId: string) => {
        const linkPromises = selectedServices.map(async (service) => {
            const serviceLinkData: ServiceCenterServiceLink = {
                createdBy: userId,
                updatedBy: userId,
                serviceCenterId: serviceCenterId,
                serviceId: service.id,
                price: 0, // Default price - you might want to make this configurable
                durationMinutes: 60, // Default duration - you might want to make this configurable
                available: true
            };

            try {
                const response = await JC_Services(
                    'JAPPCARE',
                    `service-centers/${serviceCenterId}/services`,
                    'POST',
                    serviceLinkData,
                    connectedUsers.accessToken
                );

                console.log(`Service ${service.title} linked to service center:`, response);

                if (response && (response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201)) {
                    return { success: true, service: service.title };
                } else {
                    throw new Error(`Failed to link service ${service.title}: ${response.body.meta.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error(`Error linking service ${service.title}:`, error);
                throw new Error(`Failed to link service ${service.title}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        });

        await Promise.all(linkPromises);
    };

    const createServiceCenter = async () => {
        // Validate that a user is selected
        if (!formData.selectedUserId) {
            setError('Please select a user as the owner');
            return;
        }

        // Validate that at least one service is selected
        if (selectedServices.length === 0) {
            setError('Please select at least one service');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create a single service center
            const serviceCenterRequest: ServiceCenterRequest = {
                name: formData.name,
                ownerId: formData.selectedUserId,
                createdBy: userId,
                updatedBy: userId,
                location: {
                    latitude: location.lat,
                    longitude: location.lng,
                    name: formData.homeAddress,
                    description: `Service center located at ${formData.homeAddress}`
                },
                // category: selectedServices.map(s => s.title).join(', '), // Combined categories
                category: selectedServices.length > 0 ? selectedServices[0].title : 'General Service', // Use first service as primary category
                available: formData.available,
            };

            console.log('Service Center Request:', serviceCenterRequest);

            const response = await JC_Services('JAPPCARE', `service-center`, 'POST', serviceCenterRequest, connectedUsers.accessToken);
            console.log("Service center creation response:", response);

            if (response && (response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201)) {
                const serviceCenterId = response.body.data.id;
                console.log('Created service center with ID:', serviceCenterId);

                // Link all selected services to the created service center
                await linkServicesToServiceCenter(serviceCenterId);

                setSuccess(true);
                // Reset form after successful creation
                setFormData({
                    companyName: '',
                    name: '',
                    email: '',
                    password: '',
                    homeAddress: '',
                    phoneNumber: '',
                    percentageCommission: '',
                    countryCode: '+237',
                    selectedUserId: '',
                    available: true
                });
                setSelectedServices([]);

                if (onSubmit) {
                    onSubmit({ selectedServices, formData, serviceCenterId });
                }
            } else {
                throw new Error(`Error creating service center: ${response.body.meta.message || 'Unknown error'}`);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.error('Failed to create service center:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createServiceCenter();
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            available: event.target.checked
        }));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
            {/* User Details Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                            U
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
                {/* User Selection Field */}
                <Autocomplete
                    options={userAccounts}
                    getOptionLabel={(option) => option.name}
                    loading={userAccountsLoading}
                    onChange={handleUserSelect}
                    value={userAccounts.find(user => user.id.toString() === formData.selectedUserId) || null}
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
                            label="Select Owner"
                            placeholder="Choose a user as owner"
                            variant="outlined"
                            required
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {userAccountsLoading ? <Typography variant="caption">Loading...</Typography> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
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
                    noOptionsText="No users found"
                />

                {/* Name Field */}
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />

                {/* Home Address Field */}
                <TextField
                    fullWidth
                    label="Home Address"
                    name="homeAddress"
                    placeholder="Home Address"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <ImageIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Google Map Component */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Select Location
                    </Typography>
                    <ReusableGoogleMap
                        initialLocation={location}
                        onLocationChange={handleLocationChange}
                        onAddressChange={handleAddressChange}
                        height="300px"
                        apiKey="AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I&libraries=places"
                        containerId="service-provider-map"
                    />
                </Box>


                {/* Available Switch */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.available}
                            onChange={handleSwitchChange}
                            color="primary"
                        />
                    }
                    label="Available"
                    sx={{ alignSelf: 'flex-start' }}
                />

                {/* Services Selection Section */}
                {/* Services Selection Section */}
                <Box sx={{ mt: 3 }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                        Services
                    </Typography>

                    {/* Selected Services Display - Show at top like reference */}
                    {selectedServices.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                Selected Services ({selectedServices.length}):
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {selectedServices.map((service) => (
                                    <Chip
                                        key={service.id}
                                        label={formatValue(service.title)}
                                        onDelete={() => handleServiceSelect(service)}
                                        color="primary"
                                        size="small"
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Services Navigation - Only show if more than 6 services */}
                    {serviceData.length > 6 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <IconButton
                                onClick={handlePrevServices}
                                disabled={currentServiceIndex === 0}
                                size="small"
                            >
                                <ArrowBackIosIcon fontSize="small" />
                            </IconButton>

                            <Typography variant="caption" color="text.secondary">
                                {currentServiceIndex + 1} - {Math.min(currentServiceIndex + servicesPerPage, serviceData.length)} of {serviceData.length}
                            </Typography>

                            <IconButton
                                onClick={handleNextServices}
                                disabled={currentServiceIndex + servicesPerPage >= serviceData.length}
                                size="small"
                            >
                                <ArrowForwardIosIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}

                    {/* Services Grid - Using reference styling */}
                    <Grid container spacing={1}>
                        {visibleServices.map((service) => {
                            const isSelected = selectedServices.some(s => s.id === service.id);
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
                                        onClick={() => handleServiceSelect(service)}
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
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
                    {loading ? 'Creating Service Center...' : 'Create Service Center'}
                </Button>
            </Stack>

            {/* Snackbar for Success Messages */}
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Service center created and services linked successfully!
                </Alert>
            </Snackbar>

            {/* Snackbar for Error Messages */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setError(null)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>

            {/* Snackbar for General Error Messages */}
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setErrorMessage(null)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewServiceProviderForm;