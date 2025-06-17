import {
    Box,
    Typography,
    Avatar,
    Grid,
    Rating,
    Button,
    Card,
    Stack,
    Chip
} from '@mui/material';
import Images from '../../assets/Images/Images';
import { useEffect } from 'react';
import CalendarIcon from '../../components/Icones/calendarIcon';
import LocationIcon from '../../components/Icones/LocationIcon';



/// <reference types="@types/google.maps" />
declare global {
    interface Window {
        google: typeof google;
    }
}

const Profile = () => {
    const services = [
        { name: 'Vehicle Inspection', icon: Images.maintainanceicon },
        { name: 'General Maintenance', icon: Images.maintainanceicon },
        { name: 'Air Conditioning', icon: Images.bodyshopicon },
        { name: 'Paint Job', icon: Images.deepcleaningicon },
        { name: 'Electrical Repairs', icon: Images.deepcleaningicon },
        { name: 'Engine Diagnosis', icon: Images.maintainanceicon }
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

    const historyItems = [
        { id: 1, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'James Mann' },
        { id: 2, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'Odilon Simo' },
        { id: 3, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'Sinet Akih' },
        { id: 4, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'Michael Schofield' },
        { id: 5, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'Akob Tah ' },
        { id: 6, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'Peter Parker' },
        { id: 7, status: 'In Progress', date: 'Oct. 20, 2024', car: 'Porsche Taycan Turbo S', user: 'Tony Stark' }
    ];
    return (
        <Box>

            {/* Main Content */}
            <Grid container>
                {/* Left Column */}
                <Grid item xs={12} md={8} sx={{ p: 3 }}>
                    <Box sx={{ position: 'relative', height: '240px', mb: 4 }}>
                        <Box
                            component="img"
                            src={Images.garageimage} // Replace with your header image
                            alt="Garage header"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderTopLeftRadius: '12px',
                                borderTopRightRadius: '12px'
                            }}
                        />

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    width: 64,
                                    height: 64,
                                    bgcolor: '#FF7A00',
                                    fontSize: '22px',
                                    fontWeight: 600,
                                    border: '2px solid #FF7A00',
                                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',

                                }}
                            >
                                DG
                            </Avatar>
                            <Box>
                                <Typography sx={{
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    color: '#1A1D1F'
                                }}>
                                    Dave's Garage
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LocationIcon fill='#FF7A00' stroke='#FF7A00' />
                                    <Typography sx={{
                                        fontSize: '15px',
                                        color: '#6F767E'
                                    }}>
                                        Trades District
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Rating value={4.5} readOnly precision={0.5} sx={{ color: '#FF7A00' }} />
                                    <Typography sx={{ color: '#FF7A00', fontSize: '15px' }}>
                                        4.5/5
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Button
                            variant="outlined"
                            sx={{
                                // bgcolor: '#fff',
                                border: '1px solid #6F767E',
                                color: '#111111',
                                height: 40,
                                width: 112,
                                padding: '20px 16px',
                                '&:hover': {
                                    bgcolor: '#f5f5f5'
                                }
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Box>

                    <Typography sx={{
                        fontSize: '15px',
                        color: '#6F767E',
                        mb: 4,
                        lineHeight: '24px'
                    }}>
                        Experience a top-notch service at a talented Auto shop, where we offer a wide range of basic car services to keep your vehicle working smoothly.
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#1A1D1F',
                            mb: 2
                        }}>
                            Gallery
                        </Typography>
                        <Grid container spacing={2}>
                            {[Images.car1, Images.car2, Images.Porsche, Images.test].map((img, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`Gallery ${index + 1}`}
                                        sx={{
                                            width: '100%',
                                            height: '160px',
                                            objectFit: 'cover',
                                            borderRadius: '12px'
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box>
                        <Typography sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#1A1D1F',
                            mb: 2
                        }}>
                            Specialized Services
                        </Typography>
                        <Grid container spacing={2}>
                            {services.map((service) => (
                                <Grid item xs={6} md={4} key={service.name}>
                                    <Card sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        borderRadius: '12px',
                                        border: '1px solid #E6E8EC',
                                        boxShadow: 'none'
                                    }}>
                                        <Box sx={{
                                            width: '48px',
                                            height: '48px',
                                            margin: '0 auto 8px'
                                        }}>
                                            {/* Replace with your service icons */}
                                            <Box
                                                component="img"
                                                src={service.icon}
                                                alt={service.name}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            />
                                        </Box>
                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#1A1D1F'
                                        }}>
                                            {service.name}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                        {/* Home Location Section - Prepared for API integration */}
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
                                    height: 300,
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
                    </Box>
                </Grid>

                {/* Right Column - Map */}
                <Grid item xs={12} md={4} sx={{
                    borderLeft: '1px solid #E6E8EC',
                    p: 3
                }}>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#1A1D1F',
                        mb: 3
                    }}>
                        History
                    </Typography>

                    {/* Status Filter Chips */}
                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                        <Chip
                            label="In Progress"
                            sx={{
                                bgcolor: '#FB7C37',
                                color: '#fff',
                                borderRadius: '28px',
                                cursor: 'pointer',
                                '& .MuiChip-label': {
                                    px: 2,
                                    py: 0.5
                                }
                            }}
                        />
                        <Chip
                            label="Not Started"
                            sx={{
                                bgcolor: '#FFEDE6',
                                border: '1px solid #E6E8EC',
                                borderRadius: '28px',
                                cursor: 'pointer',
                                '& .MuiChip-label': {
                                    px: 2,
                                    py: 0.5
                                }
                            }}
                        />
                        <Chip
                            label="Completed"
                            sx={{
                                bgcolor: '#FFEDE6',
                                border: '1px solid #E6E8EC',
                                borderRadius: '28px',
                                cursor: 'pointer',
                                '& .MuiChip-label': {
                                    px: 2,
                                    py: 0.5
                                }
                            }}
                        />
                    </Stack>

                    {/* History List */}
                    <Stack spacing={2}>
                        {historyItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    p: 2,
                                    borderRadius: '16px',
                                    border: '1px solid #E6E8EC'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '15px', color: '#1A1D1F', fontWeight: 500 }}>
                                        Body shop appointment
                                    </Typography>
                                    <Chip
                                        label={item.status}
                                        size="small"
                                        sx={{
                                            bgcolor: '#F6EFF3',
                                            color: '#797676',
                                            // border: '1px solid #6E7FF6',
                                            borderRadius: '12px',
                                            height: '24px',
                                            '& .MuiChip-label': {
                                                px: 1.5,
                                                fontSize: '13px'
                                            }
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            fontSize: '10px',
                                            bgcolor: '#FF7A00',
                                            border: '2px solid #FF7A00',
                                            boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                                        }}
                                    >
                                        {item.user.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                    <Typography sx={{ fontSize: '13px', color: '#6F767E' }}>
                                        {item.user}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: "space-between" }}>
                                    <Stack direction={'row'} gap={1}>
                                        <CalendarIcon fill='' stroke='#6F767E' />
                                        <Typography sx={{ fontSize: '13px', color: '#6F767E' }}>
                                            {item.date}
                                        </Typography>
                                    </Stack >

                                    <Typography sx={{ fontSize: '13px', color: '#1A1D1F', fontWeight: '600' }}>
                                        {item.car}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;