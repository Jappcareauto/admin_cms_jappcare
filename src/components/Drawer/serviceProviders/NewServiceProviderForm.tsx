import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '../../Icones/ImageIcon';
import { Grid, Snackbar, Alert } from '@mui/material';
import Images from '../../../assets/Images/Images';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';


interface NewServiceProviderFormProps {
    onSubmit?: (data: any) => void;
}

interface ServiceCenterRequest {
    name: string;
    ownerId: string;
    location: {
        id?: string;
        latitude: number;
        longitude: number;
        name: string;
        description: string;
    };
    category: 'GENERAL_MAINTENANCE' | 'BODY_SHOP' | 'DEEP_CLEANING';
    // ownerIdAsUuid: string;
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
        countryCode: '+237'
    });

    const [selectedCategory, setSelectedCategory] = useState<'GENERAL_MAINTENANCE' | 'BODY_SHOP' | 'DEEP_CLEANING'>('GENERAL_MAINTENANCE');
    const [location, setLocation] = useState({ lat: 4.0511, lng: 9.7679 }); // Default coordinates for Douala
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const userId = connectedUsers.id;
    const [searchAddress, setSearchAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState<Array<{
        place_id: string;
        description: string;
        structured_formatting: {
            main_text: string;
            secondary_text: string;
        };
    }>>([]);
    const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelect = (category: 'GENERAL_MAINTENANCE' | 'BODY_SHOP' | 'DEEP_CLEANING') => {
        setSelectedCategory(category);
    };

    const createServiceCenter = async () => {
        setLoading(true);
        setError(null);

        try {
            // Generate a random UUID for the owner (in a real app, this would be a valid user ID)
            // const ownerId = crypto.randomUUID ? crypto.randomUUID() : '3fa85f64-5717-4562-b3fc-2c963f66afa6';

            const serviceCenterRequest: ServiceCenterRequest = {
                name: formData.name,
                ownerId: userId, // Using name as ownerId
                location: {
                    latitude: location.lat,
                    longitude: location.lng,
                    name: formData.homeAddress,
                    description: `Service center located at ${formData.homeAddress}`
                },
                category: selectedCategory,
                // ownerIdAsUuid: ownerId
            };

            console.log('Service Center Request:', serviceCenterRequest);

            // Make the API call
            // const response = await fetch('api/v1/service-center', { method: 'POST', headers: {  'Content-Type': 'application/json',},
            //     body: JSON.stringify(serviceCenterRequest)
            // });
            const response = await JC_Services('JAPPCARE', `service-center`, 'POST', serviceCenterRequest, connectedUsers.accessToken);
            console.log("response", response);

            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201) {
                setSuccess(true);
            }
            else {
                throw new Error(`Error: ${response.status}`);

            }

            // If onSubmit prop is provided, call it with the form data
            if (onSubmit) {
                onSubmit(serviceCenterRequest);
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

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        };

        const initializeMap = () => {
            const mapElement = document.getElementById('provider-map-container') as HTMLElement;
            if (!mapElement) return;

            const map = new google.maps.Map(mapElement, {
                center: location,
                zoom: 14,
            });

            mapRef.current = map;

            // Initialize the Places services
            autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
            placesServiceRef.current = new google.maps.places.PlacesService(map);

            // Create a marker that can be dragged to set location
            const marker = new google.maps.Marker({
                position: location,
                map,
                title: formData.companyName || "New Service Center",
                draggable: true
            });

            markerRef.current = marker;

            // Update location state when marker is dragged
            google.maps.event.addListener(marker, 'dragend', function () {
                const position = marker.getPosition();
                if (position) {
                    setLocation({
                        lat: position.lat(),
                        lng: position.lng()
                    });

                    // Try to get address from coordinates (reverse geocoding)
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: position }, (results, status) => {
                        if (status === "OK" && results && results[0]) {
                            setSearchAddress(results[0].formatted_address);

                            // Update address field if user hasn't entered anything
                            if (!formData.homeAddress) {
                                setFormData(prev => ({
                                    ...prev,
                                    homeAddress: results[0].formatted_address
                                }));
                            }
                        }
                    });
                }
            });

            // Also allow clicking on the map to set location
            interface MapClickEvent {
                latLng: google.maps.LatLng;
            }

            google.maps.event.addListener(map, 'click', function (event: MapClickEvent) {
                marker.setPosition(event.latLng);
                setLocation({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                });

                // Try to get address from coordinates (reverse geocoding)
                const geocoder: google.maps.Geocoder = new google.maps.Geocoder();
                geocoder.geocode(
                    { location: event.latLng },
                    (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
                        if (status === "OK" && results && results[0]) {
                            setSearchAddress(results[0].formatted_address);

                            // Update address field if user hasn't entered anything
                            if (!formData.homeAddress) {
                                setFormData(prev => ({
                                    ...prev,
                                    homeAddress: results[0].formatted_address
                                }));
                            }
                        }
                    }
                );
            });
        };

        if (!window.google) {
            loadGoogleMapsScript();
        } else {
            initializeMap();
        }
    }, [formData.companyName]);




    // Update marker title when company name changes
    useEffect(() => {
        if (markerRef.current && formData.companyName) {
            markerRef.current.setTitle(formData.companyName);
        }
    }, [formData.companyName]);

    const fetchSuggestions = (input: string) => {
        if (!input || !autocompleteServiceRef.current) return;

        // Set some bias toward Cameroon if that's your target region
        const sessionToken = new google.maps.places.AutocompleteSessionToken();

        autocompleteServiceRef.current.getPlacePredictions({
            input,
            sessionToken,
            // You can uncomment and adjust these options to bias results to a region
            // componentRestrictions: { country: 'cm' }, // Cameroon
            // location: new google.maps.LatLng(4.0511, 9.7679), // Douala
            // radius: 50000, // 50km radius
        }, (predictions, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
                setAddressSuggestions([]);
                return;
            }

            setAddressSuggestions(predictions);
        });
    };

    // Add a debounce utility to prevent too many API calls
    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    // Use the debounced value for API calls
    const debouncedSearchValue = useDebounce(searchAddress, 300);

    // Effect to fetch suggestions when search changes
    useEffect(() => {
        if (debouncedSearchValue) {
            fetchSuggestions(debouncedSearchValue);
        } else {
            setAddressSuggestions([]);
        }
    }, [debouncedSearchValue]);

    // Handle selecting a suggestion
    const handleSuggestionSelect = (_event: React.SyntheticEvent, value: any) => {
        if (!value || !placesServiceRef.current || !mapRef.current || !markerRef.current) return;

        // Get place details
        placesServiceRef.current.getDetails({
            placeId: value.place_id,
            fields: ['geometry', 'formatted_address', 'name']
        }, (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !place || !place.geometry || !place.geometry.location) {
                console.error('Error fetching place details');
                return;
            }

            // Update marker position
            markerRef.current?.setPosition(place.geometry.location);

            // Update our location state
            setLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });

            // Center map on the location
            mapRef.current?.setCenter(place.geometry.location);
            mapRef.current?.setZoom(16);

            // Update address field
            if (place.formatted_address) {
                setSearchAddress(place.formatted_address);

                // Update home address field if empty
                if (!formData.homeAddress) {
                    setFormData(prev => ({
                        ...prev,
                        homeAddress: place.formatted_address || ''
                    }));
                }
            }
        });
    };



    const services = [
        {
            name: 'General\nMaintenance',
            icon: Images.maintainanceicon,
            category: 'GENERAL_MAINTENANCE' as const
        },
        {
            name: 'Body Shop',
            icon: Images.bodyshopicon,
            category: 'BODY_SHOP' as const
        },
        {
            name: 'Deep\nCleaning',
            icon: Images.deepcleaningicon,
            category: 'DEEP_CLEANING' as const
        },
    ];

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
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



                {/* Home Address Field */}
                <TextField
                    fullWidth
                    label="Home Address"
                    name="homeAddress"
                    placeholder="Home Address"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setFormData(prev => ({ ...prev, homeAddress: '' }))}
                                    edge="end"
                                >
                                    <ImageIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Phone Number Field */}
                {/* <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <TextField
                        sx={{ width: 120 }}
                        label="Country Code"
                        name="countryCode"
                        placeholder="+237"
                        type="phoneNumber"
                        value={formData.countryCode}
                        onChange={handleChange}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        placeholder="Hint text"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Box> */}

                {/* <TextField
                    fullWidth
                    label="Percentage Commission"
                    name="percentageCommission"
                    placeholder="Percentage Commission"
                    value={formData.percentageCommission}
                    onChange={handleChange}
                    variant="outlined"
                /> */}

                {/* Services Section */}
                <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                    Services
                </Typography>
                <Grid container spacing={1} sx={{ mb: 3 }}>
                    {services.map((service, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                sx={{
                                    bgcolor: selectedCategory === service.category ? '#FB7C37' : '#FFEDE6',
                                    borderRadius: 1,
                                    p: 2,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                                onClick={() => handleCategorySelect(service.category)}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                        lineHeight: 1.2,
                                        mb: 2,
                                        color: selectedCategory === service.category ? 'white' : 'inherit'
                                    }}
                                >
                                    {service.name}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 132,
                                        height: 57,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img
                                        src={service.icon}
                                        alt={service.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Home Location Section - With Google Maps */}
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

                    {/* Autocomplete search bar for location */}
                    <Autocomplete
                        id="location-search-autocomplete"
                        options={addressSuggestions}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.description || ''}
                        inputValue={searchAddress}
                        onInputChange={(_event, newValue) => {
                            setSearchAddress(newValue);
                        }}
                        onChange={handleSuggestionSelect}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                placeholder="Search for a location"
                                variant="outlined"
                                margin="dense"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                <path d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#757575" />
                                            </svg>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body1">{option.structured_formatting?.main_text || option.description}</Typography>
                                    {option.structured_formatting?.secondary_text && (
                                        <Typography variant="caption" color="text.secondary">
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    )}
                                </Box>
                            </li>
                        )}
                        freeSolo
                        filterOptions={(x) => x}
                        sx={{
                            mb: 1,
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
                    />

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

                        {/* Instructions overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                padding: '4px 8px',
                                borderRadius: 1,
                                fontSize: '12px',
                                boxShadow: 1
                            }}
                        >
                            Click, drag marker, or search
                        </Box>
                    </Box>

                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        Selected coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </Typography>
                </Box>

                {/* Submit Button */}
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
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
                        },
                        '&.Mui-disabled': {
                            bgcolor: '#999',
                            color: '#ddd'
                        }
                    }}
                >
                    {loading ? 'Creating...' : 'Create Service Provider'}
                </Button>
            </Stack>

            {/* Success/Error Notifications */}
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccess(false)} severity="success">
                    Service center created successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewServiceProviderForm;