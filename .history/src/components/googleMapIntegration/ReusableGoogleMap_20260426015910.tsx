import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Autocomplete, Box, InputAdornment, TextField, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { formatValue } from '../../tools/formatValue';

interface LocationData {
    lat: number;
    lng: number;
    address?: string;
}

interface AddressSuggestion {
    place_id: string;
    description: string;
    lat: number;
    lng: number;
    structured_formatting?: {
        main_text: string;
        secondary_text: string;
    };
}

interface ReusableGoogleMapProps {
    // Kept for backwards compatibility; unused with OpenStreetMap.
    apiKey?: string;
    containerId?: string;

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
    mapStyles?: unknown;
    containerSx?: any;

    // Address handling
    onAddressChange?: (address: string) => void;
    initialSearchAddress?: string;
}

const ReusableGoogleMap: React.FC<ReusableGoogleMapProps> = ({
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
    containerSx,
    onAddressChange,
    initialSearchAddress = ''
}) => {
    const [location, setLocation] = useState<LocationData>(initialLocation);
    const [searchAddress, setSearchAddress] = useState(initialSearchAddress);
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const searchAbortRef = useRef<AbortController | null>(null);

    const mapInstanceId = useMemo(() => containerId || `osm-map-${Math.random().toString(36).slice(2, 10)}`, [containerId]);

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

    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
            );

            if (!response.ok) {
                return '';
            }

            const data = await response.json();
            return data?.display_name || '';
        } catch (error) {
            console.error('Reverse geocoding failed', error);
            return '';
        }
    };

    const updateLocation = async (lat: number, lng: number, resolveAddress = true) => {
        const nextLocation: LocationData = { lat, lng };

        if (resolveAddress) {
            const address = await reverseGeocode(lat, lng);
            if (address) {
                nextLocation.address = address;
                setSearchAddress(address);
                onAddressChange?.(address);
            }
        }

        setLocation(nextLocation);
        onLocationChange?.(nextLocation);
    };

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        // Fix default marker assets in Vite builds.
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });

        const map = L.map(mapContainerRef.current, {
            center: [location.lat, location.lng],
            zoom,
            zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        const marker = L.marker([location.lat, location.lng], {
            draggable: markerDraggable,
            title: markerTitle,
        }).addTo(map);

        marker.on('dragend', async () => {
            const position = marker.getLatLng();
            await updateLocation(position.lat, position.lng, true);
        });

        map.on('click', async (event: L.LeafletMouseEvent) => {
            marker.setLatLng(event.latlng);
            await updateLocation(event.latlng.lat, event.latlng.lng, true);
        });

        mapRef.current = map;
        markerRef.current = marker;
        setIsMapLoaded(true);

        return () => {
            searchAbortRef.current?.abort();
            markerRef.current?.remove();
            mapRef.current?.remove();
            markerRef.current = null;
            mapRef.current = null;
            setIsMapLoaded(false);
        };
    }, [mapInstanceId, markerDraggable, markerTitle, zoom]);

    // Update marker title when prop changes
    useEffect(() => {
        if (markerRef.current && markerTitle) {
            markerRef.current.bindTooltip(markerTitle, { permanent: false });
        }
    }, [markerTitle]);

    // Update location when initialLocation prop changes
    useEffect(() => {
        if (mapRef.current && markerRef.current) {
            setLocation(initialLocation);
            markerRef.current.setLatLng([initialLocation.lat, initialLocation.lng]);
            mapRef.current.setView([initialLocation.lat, initialLocation.lng], mapRef.current.getZoom());
        }
    }, [initialLocation]);

    // Fetch address suggestions
    const fetchSuggestions = async (input: string) => {
        if (!input) {
            setAddressSuggestions([]);
            return;
        }

        searchAbortRef.current?.abort();
        const controller = new AbortController();
        searchAbortRef.current = controller;
        setIsSearching(true);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&q=${encodeURIComponent(input)}`,
                { signal: controller.signal }
            );

            if (!response.ok) {
                setAddressSuggestions([]);
                return;
            }

            const results = await response.json();
            const mappedSuggestions: AddressSuggestion[] = (Array.isArray(results) ? results : []).map((item: any) => ({
                place_id: String(item.place_id),
                description: item.display_name,
                lat: Number(item.lat),
                lng: Number(item.lon),
                structured_formatting: {
                    main_text: item.name || item.display_name,
                    secondary_text: item.display_name,
                },
            }));

            setAddressSuggestions(mappedSuggestions);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Address suggestion search failed', error);
                setAddressSuggestions([]);
            }
        } finally {
            setIsSearching(false);
        }
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
    const handleSuggestionSelect = async (_event: React.SyntheticEvent, value: string | AddressSuggestion | null) => {
        if (!value || !mapRef.current || !markerRef.current) {
            return;
        }

        if (typeof value === 'string') {
            await fetchSuggestions(value);
            return;
        }

        const nextLatLng = [value.lat, value.lng] as [number, number];
        markerRef.current.setLatLng(nextLatLng);
        mapRef.current.setView(nextLatLng, Math.max(mapRef.current.getZoom(), 16));

        setSearchAddress(value.description);
        onAddressChange?.(value.description);
        await updateLocation(value.lat, value.lng, false);
        onLocationChange?.({ lat: value.lat, lng: value.lng, address: value.description });
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
                            helperText={isSearching ? 'Searching locations...' : ''}
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
                    id={mapInstanceId}
                    ref={mapContainerRef}
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