import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Images from '../../../assets/Images/Images';
import AppointmentIcon from '../../Icones/AppointmentIcon';
import LocationIcon from '../../Icones/LocationIcon';

interface AppointmentDetailsProps {
    onExpand: () => void;
    onMarkCompleted: () => void;
}

const AppointmentDetails = ({ onExpand, onMarkCompleted }: AppointmentDetailsProps) => {
    return (
        <Box>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2
            }}>
                <Box>

                </Box>
                <IconButton onClick={onExpand} size="small">
                    <OpenInFullIcon />
                </IconButton>
            </Box>

            {/* Car Details */}
            <Typography
                variant="h5"
                sx={{
                    color: '#FF6B00',
                    fontWeight: 600,
                    mb: 1
                }}
            >
                Porsche Taycan Turbo S
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                2024, RWD
            </Typography>

            {/* Car Image */}
            <Box
                component="img"
                src="src\assets\porche-car.svg" // Replace with actual image path
                alt="Porsche Taycan"
                sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    mb: 2
                }}
            />

            {/* Client Info */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2
            }}>
                <Avatar sx={{
                    width: 48,
                    height: 48,
                    bgcolor: '#1A1D1F',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#FF7A00',
                    border: '2px solid #FF7A00',
                }}>SM</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Sarah Maye
                </Typography>
                <Chip
                    label="In Progress"
                    size="small"
                    sx={{
                        bgcolor: 'rgba(255, 107, 0, 0.1)',
                        color: '#FF6B00',
                        ml: 'auto'
                    }}
                />
            </Box>

            {/* Appointment Type */}
            <Typography
                variant="body1"
                sx={{
                    color: '#FF6B00',
                    fontWeight: 500,
                    mb: 2
                }}
            >
                Body shop appointment
            </Typography>

            {/* Date and Location */}
            <Box sx={{ mb: 2 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1
                }}>
                    <AppointmentIcon stroke="#797676" fill='' />
                    <Typography variant="body2">
                        Oct. 20, 2024
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        10am
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 'auto' }}
                    >
                        Revenue
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1
                }}>
                    <LocationIcon stroke="#797676" fill='#797676' />
                    <Typography variant="body2">
                        At Home
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            ml: 'auto',
                            color: '#FF6B00',
                            fontWeight: 500
                        }}
                    >
                        5,000 Fr
                    </Typography>
                </Box>
            </Box>

            {/* Description */}
            <Typography variant="body2" sx={{ mb: 3 }}>
                There is a noticeable dent on the rear bumper of my Porsche Taycan, specifically located between the lower edge of the rear headlight and the rear wheel arch. It is closer to the wheel arch, situated near the car's side profile. The dent is below the horizontal line of the rear headlight and sits closer to the lower third of the rear bumper.
            </Typography>

            {/* Images */}
            <Typography variant="h6" sx={{ mb: 2 }}>
                Images
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                mb: 3
            }}>
                {[Images.car1, Images.car1, Images.car2, Images.car2].map((img) => (
                    <Box
                        key={img}
                        component="img"
                        src={img} // Replace with actual image paths
                        alt={`Damage view ${img}`}
                        sx={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: 1
                        }}
                    />
                ))}
            </Box>

            {/* Action Button */}
            <Button
                fullWidth
                variant="contained"
                onClick={onMarkCompleted}
                sx={{
                    bgcolor: '#000',
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                        bgcolor: '#333'
                    }
                }}
            >
                Mark as completed
            </Button>
        </Box>
    );
};

export default AppointmentDetails;