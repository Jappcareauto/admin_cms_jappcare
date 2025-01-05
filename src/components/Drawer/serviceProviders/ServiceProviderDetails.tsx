import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import Images from '../../../assets/Images/Images';
import { useState, useEffect } from 'react';
import { ImageViewer } from '../../ImageViewer/ImageViewer';
import LocationIcon from '../../Icones/LocationIcon';

/// <reference types="@types/google.maps" />
declare global {
    interface Window {
        google: typeof google;
    }
}

interface ServiceProviderDetailsProps {
    onEditProfile?: () => void;
    onSeeStatistics?: () => void;
}

const ServiceProviderDetails = ({ onSeeStatistics }: ServiceProviderDetailsProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined);
    const images = [Images.car1, Images.car1, Images.car2, Images.car2, Images.Porsche, Images.test];
    const [viewerOpen, setViewerOpen] = useState(false);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setViewerOpen(true);
    };
    const services = [
        {
            name: 'General\nMaintenance',
            icon: Images.maintainanceicon,
        },
        {
            name: 'Body Shop',
            icon: Images.bodyshopicon,
        },
        {
            name: 'Deep\nCleaning',
            icon: Images.deepcleaningicon,
        },
    ];

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        };

        const initializeMap = () => {
            const map = new google.maps.Map(document.getElementById('provider-map-container') as HTMLElement, {
                center: { lat: 4.0511, lng: 9.7679 }, // Coordinates for Douala, Cameroon
                zoom: 14,
            });

            new google.maps.Marker({
                position: { lat: 4.0511, lng: 9.7679 },
                map,
                title: "Dave's Garage",
            });
        };

        if (!window.google) {
            loadGoogleMapsScript();
        } else {
            initializeMap();
        }
    }, []);

    return (
        <Box >


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
                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color
                    }}
                >
                    DG
                </Avatar>
                <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500 }}>
                        Dave's Garage
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1 }}>
                        <LocationIcon fill='#FF7A00' stroke='#FF7A00' />
                        <Typography sx={{ fontSize: '14px', color: 'text.secondary', mr: 1 }}>
                            Deido, Douala
                        </Typography>
                        <StarIcon sx={{ fontSize: 16, color: '#FF7A00', mr: 0.5 }} />
                        <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                            4.75
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 20,
                            borderColor: '#ddd',
                            color: 'text.primary',
                            px: 2
                        }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>

            {/* Description */}
            <Typography sx={{ fontSize: '14px', color: 'text.secondary', mb: 3 }}>
                Experience top-notch service at Japtech Auto shop, where we offer a wide range of basic car services to keep your vehicle running smoothly
            </Typography>

            {/* Images Section */}
            <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                Images
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                mb: 3
            }}>
                {images.map((img, index) => (
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
                        <Box
                            component="img"
                            src={img}
                            alt={`Damage view ${index + 1}`}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.2s',
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* Image Viewer Modal */}
            <ImageViewer
                open={viewerOpen}
                onClose={() => setViewerOpen(false)}
                images={images}
                initialIndex={selectedImageIndex}
            />
            {/* Services Section */}
            <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                Services
            </Typography>
            <Grid container spacing={1} sx={{ mb: 3 }}>
                {services.map((service, index) => (
                    <Grid item xs={4} key={index}>
                        <Box
                            sx={{
                                bgcolor: '#FFEDE6',
                                borderRadius: 1,
                                p: 2,
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    whiteSpace: 'pre-line',
                                    lineHeight: 1.2,
                                    mb: 2
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

            {/* Map Section */}
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
                    {/* Map container - Ready for API implementation */}
                    <div id="provider-map-container" style={{ width: '100%', height: '100%', background: '#f5f5f5' }} />
                </Box>
            </Box>

            {/* Statistics Button */}
            <Button
                fullWidth
                variant="contained"
                onClick={onSeeStatistics}
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    py: 1.5,
                    textTransform: 'none',
                    borderRadius: 1,
                    '&:hover': {
                        bgcolor: '#333'
                    }
                }}
            >
                See Statistics
            </Button>
        </Box>
    );
};

export default ServiceProviderDetails;