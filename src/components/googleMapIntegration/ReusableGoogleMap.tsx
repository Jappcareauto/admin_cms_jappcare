import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Autocomplete, InputAdornment, Typography } from '@mui/material';
import { formatValue } from '../../tools/formatValue';

interface LocationData {
    lat: number;
    lng: number;
    address?: string;
}

interface AddressSuggestion {
    place_id: string;
    description: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
}

interface ReusableGoogleMapProps {
    // Required props
    apiKey: string;
    containerId: string;

    // Location props
    initialLocation?: LocationData;
    onLocationChange?: (location: LocationData) => void;

    // Map configuration
    zoom?: number;
    height?: number | string;
    width?: number | string;

    // Marker configuration
    markerTitle?: string;
    markerDraggable?: boolean;

    // Search configuration
    showSearch?: boolean;
    searchPlaceholder?: string;

    // Style customization
    mapStyles?: google.maps.MapTypeStyle[];
    containerSx?: any;

    // Address handling
    onAddressChange?: (address: string) => void;
    initialSearchAddress?: string;
}

const ReusableGoogleMap: React.FC<ReusableGoogleMapProps> = ({
    apiKey,
    containerId,
    initialLocation = { lat: 4.0511, lng: 9.7679 }, // Default to Cameroon
    onLocationChange,
    zoom = 14,
    height = 100,
    width = '100%',
    markerTitle = "Selected Location",
    markerDraggable = true,
    showSearch = true,
    searchPlaceholder = "Search for a location",
    mapStyles,
    containerSx,
    onAddressChange,
    initialSearchAddress = ''
}) => {
    const [location, setLocation] = useState<LocationData>(initialLocation);
    const [searchAddress, setSearchAddress] = useState(initialSearchAddress);
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

    // Debounce hook
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

    const debouncedSearchValue = useDebounce(searchAddress, 300);

    // Load Google Maps script
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            // Check if script already exists
            if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
                if (window.google) {
                    initializeMap();
                }
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        };

        const initializeMap = () => {
            const mapElement = document.getElementById(containerId) as HTMLElement;
            if (!mapElement) return;

            const map = new google.maps.Map(mapElement, {
                center: location,
                zoom: zoom,
                styles: mapStyles
            });

            mapRef.current = map;

            // Initialize services
            autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
            placesServiceRef.current = new google.maps.places.PlacesService(map);

            // Create marker
            const marker = new google.maps.Marker({
                position: location,
                map,
                title: markerTitle,
                draggable: markerDraggable
            });

            markerRef.current = marker;

            // Add marker drag event
            if (markerDraggable) {
                google.maps.event.addListener(marker, 'dragend', function () {
                    const position = marker.getPosition();
                    if (position) {
                        const newLocation = {
                            lat: position.lat(),
                            lng: position.lng()
                        };

                        setLocation(newLocation);

                        // Reverse geocode to get address
                        const geocoder = new google.maps.Geocoder();
                        geocoder.geocode({ location: position }, (results, status) => {
                            if (status === "OK" && results && results[0]) {
                                const address = results[0].formatted_address;
                                setSearchAddress(address);

                                const locationWithAddress = {
                                    ...newLocation,
                                    address
                                };

                                onLocationChange?.(locationWithAddress);
                                onAddressChange?.(address);
                            } else {
                                onLocationChange?.(newLocation);
                            }
                        });
                    }
                });
            }

            // Add map click event
            google.maps.event.addListener(map, 'click', function (event: google.maps.MapMouseEvent) {
                if (event.latLng) {
                    marker.setPosition(event.latLng);

                    const newLocation = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    };

                    setLocation(newLocation);

                    // Reverse geocode
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: event.latLng }, (results, status) => {
                        if (status === "OK" && results && results[0]) {
                            const address = results[0].formatted_address;
                            setSearchAddress(address);

                            const locationWithAddress = {
                                ...newLocation,
                                address
                            };

                            onLocationChange?.(locationWithAddress);
                            onAddressChange?.(address);
                        } else {
                            onLocationChange?.(newLocation);
                        }
                    });
                }
            });

            setIsMapLoaded(true);
        };

        if (!window.google) {
            loadGoogleMapsScript();
        } else {
            initializeMap();
        }
    }, [apiKey, containerId, zoom, markerTitle, markerDraggable]);

    // Update marker title when prop changes
    useEffect(() => {
        if (markerRef.current && markerTitle) {
            markerRef.current.setTitle(markerTitle);
        }
    }, [markerTitle]);

    // Update location when initialLocation prop changes
    useEffect(() => {
        if (mapRef.current && markerRef.current) {
            setLocation(initialLocation);
            markerRef.current.setPosition(initialLocation);
            mapRef.current.setCenter(initialLocation);
        }
    }, [initialLocation]);

    // Fetch address suggestions
    const fetchSuggestions = (input: string) => {
        if (!input || !autocompleteServiceRef.current) return;

        const sessionToken = new google.maps.places.AutocompleteSessionToken();

        autocompleteServiceRef.current.getPlacePredictions({
            input,
            sessionToken,
        }, (predictions, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
                setAddressSuggestions([]);
                return;
            }

            setAddressSuggestions(predictions);
        });
    };

    // Handle debounced search
    useEffect(() => {
        if (debouncedSearchValue && showSearch) {
            fetchSuggestions(debouncedSearchValue);
        } else {
            setAddressSuggestions([]);
        }
    }, [debouncedSearchValue, showSearch]);

    // Handle suggestion selection
    const handleSuggestionSelect = (_event: React.SyntheticEvent, value: string | AddressSuggestion | null, _reason?: string) => {
        if (!value || typeof value === 'string' || !placesServiceRef.current || !mapRef.current || !markerRef.current) return;

        placesServiceRef.current.getDetails({
            placeId: value.place_id,
            fields: ['geometry', 'formatted_address', 'name']
        }, (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !place || !place.geometry || !place.geometry.location) {
                console.error('Error fetching place details');
                return;
            }

            const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address || ''
            };

            markerRef.current?.setPosition(place.geometry.location);
            setLocation(newLocation);
            mapRef.current?.setCenter(place.geometry.location);
            mapRef.current?.setZoom(16);

            if (place.formatted_address) {
                setSearchAddress(place.formatted_address);
                onAddressChange?.(place.formatted_address);
            }

            onLocationChange?.(newLocation);
        });
    };

    return (
        <Box sx={containerSx}>
            {showSearch && (
                <Autocomplete
                    options={addressSuggestions}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.description) || ''}
                    inputValue={searchAddress}
                    onInputChange={(_event, newValue) => {
                        setSearchAddress(newValue);
                    }}
                    onChange={handleSuggestionSelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            placeholder={searchPlaceholder}
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
                                <Typography variant="body1">
                                    {option.structured_formatting?.main_text || option.description}
                                </Typography>
                                {option.structured_formatting?.secondary_text && (
                                    <Typography variant="caption" color="text.secondary">
                                        {formatValue(option.structured_formatting.secondary_text)}
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
            )}

            <Box
                sx={{
                    width: width,
                    height: height,
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#f5f5f5',
                    border: '1px solid rgba(0, 0, 0, 0.12)'
                }}
            >
                <div
                    id={containerId}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#f5f5f5'
                    }}
                />

                {!isMapLoaded && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Loading map...
                        </Typography>
                    </Box>
                )}

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
    );
};

export default ReusableGoogleMap;