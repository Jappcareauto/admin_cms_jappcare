import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Tooltip } from '@mui/material';
import ExpandIcon from '../../Icones/ExpandIcon';
import { ImageViewer } from '../../ImageViewer/ImageViewer';
import AppointmentIcon from '../../Icones/AppointmentIcon';
import LocationIcon from '../../Icones/LocationIcon';
import { format, parseISO } from 'date-fns';
import { AppointmentInterface } from '../../../interfaces/Interfaces';

interface AppointmentDetailsProps {
    appointment: AppointmentInterface;
    onExpand: () => void;
    onMarkCompleted: () => void;
}

const AppointmentDetails = ({
    appointment,
    onExpand,
    onMarkCompleted
}: AppointmentDetailsProps) => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined);
    console.log("appointment", appointment);

    // Placeholder images array - replace with actual vehicle media if available
    const images = appointment.vehicle.media?.items?.length
        ? appointment.vehicle.media.items.map((item) => item.sourceUrl)
        : ['/api/placeholder/400/320', '/api/placeholder/400/320'];

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setViewerOpen(true);
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Tooltip title="View More" sx={{ mr: 1 }}>
                    <IconButton onClick={onExpand} size="small">
                        <ExpandIcon />
                    </IconButton>
                </Tooltip>
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
                {`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {`${appointment.vehicle.detail.year}, ${appointment.vehicle.detail.trim}`}
            </Typography>

            {/* Car Image */}
            <Box
                component="img"
                src={appointment.vehicle.media?.mainItemUrl || '/api/placeholder/400/320'}
                alt={`${appointment.vehicle.detail.make} ${appointment.vehicle.detail.model}`}
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
                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                }}>
                    {appointment.vehicle.name.substring(0, 2).toUpperCase()}
                </Avatar>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {appointment.vehicle.name}
                </Typography>
                <Chip
                    label={appointment.status.replace('_', ' ')}
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
                {appointment.service.title}
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
                        {format(parseISO(appointment.date), 'MMM dd, yyyy')}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {format(parseISO(appointment.date), 'hh:mm a')}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 'auto' }}
                    >
                        {appointment.timeOfDay}
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
                        {appointment.locationType === 'HOME' ? 'At Home' : appointment.locationType}
                    </Typography>
                    {/* 
                    Note: If you want to add revenue or pricing, you'll need to modify 
                    the AppointmentInterface to include this information 
                    */}
                </Box>
            </Box>

            {/* Description */}
            {appointment.note && (
                <Typography variant="body2" sx={{ mb: 3 }}>
                    {appointment.note}
                </Typography>
            )}

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
                {images.slice(0, 4).map((img, index) => (
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